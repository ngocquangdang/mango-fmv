import * as React from "react";
import { UserContext } from ".";
import { useNavigate } from "react-router-dom";
import {
  mapChapter,
  useChapter,
  useUpdateStatus,
  useUserProgress,
  useVideos,
  useCollectedRewards,
  useInitQrSession,
  useConfirmQrSession,
  useAudioRecordings,
  useUserInfo,
} from "../hooks";
import { useMgSdk } from "../../../hooks/useMgSdk";
import type { ChapterMapped } from "../../../types/chapter";
import type { AudioRecording } from "../apis";
import { saveLocalParams, getLocalParam } from "../../../lib/api/storage";
import type { CollectedRewardCharacter } from "../apis";
import { logInfo } from "../../../lib/utils/logger";
import { QrLoginOverlay } from "../../../feature-v2/components/QrLoginOverlay";
import { useToast } from "../../../components/ui/toast-v2/use-toast";

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
  refetchUserInfo: () => void;
  isQrLoginVisible: boolean;
  audioRecordings: AudioRecording[];
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { mgApi } = useMgSdk();
  const { mutate: updateStatus } = useUpdateStatus();
  const { mutate: initQrSession } = useInitQrSession();
  const { mutate: confirmQrLogin } = useConfirmQrSession();
  const { data: audioRecordings = [] } = useAudioRecordings();
  const { data: userApiData, refetch: refetchUserInfo } = useUserInfo();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userInfo, setUserInfo] = React.useState<Record<string, any>>({});
  const [qrSessionId, setQrSessionId] = React.useState<string | null>(null);
  const [qrUrl, setQrUrl] = React.useState<string>("");
  const [isQrLoginVisible, setIsQrLoginVisible] = React.useState(false);

  const {
    chapterId: chapterIdFromUrl,
    projectId: projectIdFromUrl,
    isPreview,
    sessionId: sessionIdFromUrl,
  } = React.useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const isPreviewParam = params.get("isPreview");
    const sessionIdParam = params.get("sessionId");

    return {
      chapterId: import.meta.env.VITE_CHAPTER_ID || "",
      projectId: import.meta.env.VITE_PROJECT_ID || "",
      isPreview: isPreviewParam === "true",
      sessionId: sessionIdParam || "",
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

  const { data: videos, isLoading: isVideosLoading, refetch: refetchVideos } = useVideos(sceneIds);

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
    if (!sessionIdFromUrl) {
      return;
    }
    confirmQrLogin({
      ticket: mgUserInfoObject?.ticket,
      sessionId: sessionIdFromUrl,
    }, {
      onSuccess: () => {
        refetchChapter();
        refetchCollectedRewards();
        refetchVideos()
        // Defer UI updates to avoid race conditions
        setTimeout(() => {
          refetchProgress();
          showToast({ description: "Xác nhận đăng nhập thành công!" });
          setIsQrLoginVisible(false);
        }, 100);
      },
      onError: () => {
        logInfo(
          "UserProvider - confirmQrLogin failed",
          {},
          "UserProvider"
        );
      },
    });
    setLoading(true);
  }, [sessionIdFromUrl]);

  // QR Login Flow for Web Browsers
  React.useEffect(() => {
    const isIOS =
      typeof navigator !== "undefined" &&
      /iP(ad|hone|od)/i.test(navigator.userAgent);
    const isAndroid =
      typeof navigator !== "undefined" &&
      /android/i.test(navigator.userAgent);
    const isMobileLike = isIOS || isAndroid;

    const hasLocalTicket = !!getLocalParam("ticket");
    // If we are in dev or mobile-like env and NO ticket, redirect to login page
    if ((import.meta.env.DEV || !isMobileLike) && !hasLocalTicket) {
      logInfo(
        "UserProvider - Mobile/Dev detected without ticket, redirecting to QR Login",
        {},
        "UserProvider"
      );
      navigate("/login-qr");
    }
  }, [mgApi, isPreview, navigate]);

  const handleQrSuccess = React.useCallback((ticket: string) => {
    logInfo(
      "UserProvider - QR login successful",
      { ticket },
      "UserProvider"
    );
    // Defer UI updates to avoid race conditions
    setTimeout(() => {
      // logInfo inside timeout to capture the context of execution if needed, or keep outside.
      // Keeping logging outside for immediate feedback is fine, but state updates must be deferred.
      saveLocalParams({ ticket });
      setIsQrLoginVisible(false);
      showToast({ description: "Đăng nhập QR thành công!" });
      setLoading(true);

      // Reload to ensure fresh state
      window.location.reload();
    }, 0);
  }, [refetchProgress, refetchUserInfo, refetchChapter, refetchCollectedRewards, refetchVideos, showToast]);

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
        const generatedQrUrl = `${import.meta.env.VITE_DOMAIN}?sessionId=${sessionId}`;

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
      userInfo: { ...userInfo, ...userApiData?.data },
      refetchUserInfo,
      isQrLoginVisible,
      audioRecordings,
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
      audioRecordings,
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
