import React from "react";
import { UserContext } from ".";
import {
  mapChapter,
  useChapter,
  useUpdateStatus,
  useUserProgress,
  useVideos,
  useCollectedRewards,
  useInitQrSession,
} from "../hooks";
import { useMgSdk } from "../../../hooks/useMgSdk";
import type { ChapterMapped } from "../../../types/chapter";
import { saveLocalParams } from "../../../lib/api/storage";
import type { CollectedRewardCharacter } from "../apis";
import { logInfo } from "../../../lib/utils/logger";
import { QrLoginOverlay } from "../../../feature-v2/components/QrLoginOverlay";

export interface UserContextType {
  chapter: ChapterMapped;
  loading: boolean;
  refetchProgress: () => void;
  updateSceneStatus: (
    data: {
      sceneId: string;
      totalDuration: number;
      watchingSecond: number;
      status: string;
      points?: number;
    },
    callback?: (params: any) => void
  ) => void;
  collectedRewards?: Record<string, CollectedRewardCharacter>;
  refetchCollectedRewards: () => void;
  refetchChapter: () => void;
  userInfo: Record<string, any>;
  isQrLoginVisible: boolean;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { mgApi } = useMgSdk();
  const { mutate: updateStatus } = useUpdateStatus();
  const { mutate: initQrSession } = useInitQrSession();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [userInfo, setUserInfo] = React.useState<Record<string, any>>({});
  const [qrSessionId, setQrSessionId] = React.useState<string | null>(null);
  const [qrUrl, setQrUrl] = React.useState<string>("");
  const [isQrLoginVisible, setIsQrLoginVisible] = React.useState(false);

  const {
    chapterId: chapterIdFromUrl,
    projectId: projectIdFromUrl,
    isPreview,
    ticket: ticketFromUrl,
  } = React.useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const isPreviewParam = params.get("isPreview");
    const ticketParam = params.get("ticket");

    return {
      chapterId: import.meta.env.VITE_CHAPTER_ID || "",
      projectId: import.meta.env.VITE_PROJECT_ID || "",
      isPreview: isPreviewParam === "true",
      ticket: ticketParam || "",
    };
  }, []);

  const { data: chapter, isLoading: isChapterLoading, refetch: refetchChapter } = useChapter(
    projectIdFromUrl,
    chapterIdFromUrl
  );

  const prevChapterIdRef = React.useRef<string | undefined>(undefined);
  React.useEffect(() => {
    const currentChapterId = chapter?.id;
    if (currentChapterId !== prevChapterIdRef.current) {
      prevChapterIdRef.current = currentChapterId;
    }
  }, [chapter]);

  const chapterId = React.useMemo(
    () => chapter?.chapterId || "",
    [chapter?.chapterId]
  );

  const progressParams = React.useMemo(
    () => ({
      chapterId: chapterId,
      projectId: projectIdFromUrl,
    }),
    [chapterId, projectIdFromUrl]
  );

  const {
    data: progress,
    isLoading: isProgressLoading,
    refetch: refetchProgress,
  } = useUserProgress(progressParams);

  const sceneIds = React.useMemo(
    () => Object.keys(chapter?.scenes || {}),
    [chapter]
  );

  const { data: videos, isLoading: isVideosLoading } = useVideos(sceneIds);

  const {
    data: collectedRewards,
    refetch: refetchCollectedRewards,
  } = useCollectedRewards(projectIdFromUrl);

  const chapterMapped = React.useMemo(() => {
    if (!chapter || !progress || !videos || loading) return null;

    return mapChapter(chapter, progress?.scenes || {}, videos || {});
  }, [chapter, progress?.scenes, videos, loading]);

  // Memoize chapter values to prevent unnecessary effect triggers
  const chapterValues = React.useMemo(
    () => ({
      chapterId: chapter?.chapterId,
      id: chapter?.projectId,
      startSceneId: chapter?.startSceneId,
      exists: !!chapter,
      sences: chapter?.scenes,
    }),
    [chapter]
  );

  React.useEffect(() => {
    if (chapterValues.exists && !progress?.currentScene) {
      updateStatus(
        {
          chapterId: chapterValues.chapterId || "",
          projectId: chapterValues.id || "",
          sceneId: chapterValues.startSceneId || "",
          watchingSecond: 0,
          totalDuration: Math.floor(
            chapterValues.sences[chapterValues.startSceneId]?.duration || 0
          ),
          status: "INPROGRESS",
        },
        {
          onSuccess: () => {
            refetchProgress();
          },
        }
      );
    }
  }, [chapterValues, updateStatus, refetchProgress, progress?.currentScene]);

  React.useEffect(() => {
    setLoading(
      isChapterLoading &&
      isProgressLoading &&
      isVideosLoading
    );
  }, [
    isChapterLoading,
    isProgressLoading,
    isVideosLoading
  ]);

  const handleGetToken = React.useCallback((mgUserInfo: string) => {
    logInfo(
      "UserProvider - handleGetToken called",
      {
        mgUserInfo,
      },
      "UserProvider"
    );
    const mgUserInfoObject = JSON.parse(mgUserInfo || "{}");
    setUserInfo(mgUserInfoObject);
    saveLocalParams({
      ticket: mgUserInfoObject?.ticket,
    });
    setLoading(true);
  }, []);

  React.useEffect(() => {
    if (!isPreview || !ticketFromUrl) {
      return;
    }

    logInfo(
      "UserProvider - isPreview is true, setting ticket from URL",
      {
        ticketFromUrl,
      },
      "UserProvider"
    );

    saveLocalParams({
      ticket: ticketFromUrl,
    });
    setLoading(true);
  }, [isPreview, ticketFromUrl]);

  // QR Login Flow for Web Browsers
  React.useEffect(() => {

    const isWebBrowser = !ticketFromUrl && !isPreview;
    console.log("UserProvider - isWebBrowser", isWebBrowser, !isPreview);

    if (isWebBrowser) {
      logInfo(
        "UserProvider - Web browser detected without ticket, initializing QR session",
        {},
        "UserProvider"
      );

      initQrSession(undefined, {
        onSuccess: (response: any) => {
          const sessionId = response.data.sessionId;
          // Generate QR URL from sessionId
          const generatedQrUrl = `http://localhost:3000/qr-login?sessionId=${sessionId}`;

          logInfo(
            "UserProvider - QR session initialized",
            { sessionId, qrUrl: generatedQrUrl },
            "UserProvider"
          );
          setQrSessionId(sessionId);
          setQrUrl(generatedQrUrl);
          setIsQrLoginVisible(true);
        },
        onError: (error: any) => {
          logInfo(
            "UserProvider - Failed to initialize QR session",
            { error },
            "UserProvider"
          );
        },
      });
    }
  }, [mgApi, isPreview, initQrSession]);

  const handleQrSuccess = React.useCallback((ticket: string) => {
    logInfo(
      "UserProvider - QR login successful",
      { ticket },
      "UserProvider"
    );
    saveLocalParams({ ticket });
    setIsQrLoginVisible(false);
    setLoading(true);
    refetchProgress();
  }, [refetchProgress]);

  const handleQrError = React.useCallback((error: Error) => {
    logInfo(
      "UserProvider - QR login error",
      { error: error.message },
      "UserProvider"
    );
  }, []);

  const handleQrExpired = React.useCallback(() => {
    logInfo(
      "UserProvider - QR session expired",
      {},
      "UserProvider"
    );
    setIsQrLoginVisible(false);
    // Reinitialize QR session
    initQrSession(undefined, {
      onSuccess: (response: any) => {
        const sessionId = response.data.sessionId;
        const generatedQrUrl = `https://gocuanhamynam.mangoplus.vn?sessionId=${sessionId}`;

        setQrSessionId(sessionId);
        setQrUrl(generatedQrUrl);
        setIsQrLoginVisible(true);
      },
    });
  }, [initQrSession]);

  const updateSceneStatus = React.useCallback(
    (
      data: {
        sceneId: string;
        totalDuration: number;
        watchingSecond: number;
        status: string;
        points?: number;
      },
      callback?: (params: any) => void
    ) => {
      const { sceneId, totalDuration, watchingSecond, status, points } = data;
      updateStatus(
        {
          projectId: chapter?.projectId || "",
          chapterId: chapter?.chapterId || "",
          watchingSecond,
          totalDuration,
          sceneId,
          status,
          points,
        },
        {
          onSuccess: (data: any) => {
            refetchProgress();
            refetchCollectedRewards();
            if (callback) callback(data.data);
          },
        }
      );
    },
    [updateStatus, refetchProgress, refetchCollectedRewards, chapter]
  );

  React.useEffect(() => {
    if (!mgApi) {
      logInfo(
        "UserProvider - mgApi is not available"
      );
      return;
    }

    mgApi.login?.(handleGetToken);
  }, [mgApi, handleGetToken]);

  // Memoize value object to prevent unnecessary re-renders
  const value: UserContextType = React.useMemo(
    () => ({
      chapter: chapterMapped
        ? ({ ...chapterMapped, progress } as ChapterMapped)
        : ({} as ChapterMapped),
      loading,
      refetchProgress,
      updateSceneStatus,
      collectedRewards,
      refetchCollectedRewards,
      refetchChapter,
      userInfo,
      isQrLoginVisible,
    }),
    [
      chapterMapped,
      progress,
      loading,
      refetchProgress,
      updateSceneStatus,
      collectedRewards,
      refetchCollectedRewards,
      refetchChapter,
      userInfo,
      isQrLoginVisible,
    ]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
      {isQrLoginVisible && qrSessionId && qrUrl && (
        <QrLoginOverlay
          sessionId={qrSessionId}
          qrUrl={qrUrl}
          onSuccess={handleQrSuccess}
          onError={handleQrError}
          onExpired={handleQrExpired}
        />
      )}
    </UserContext.Provider>
  );
};
