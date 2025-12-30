import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HookButton from "../components/ui/hook-button";
import HomeButton from "../components/ui/home-button";
import { useVideoPlayerContext } from "../../contexts";
import { useUserContext } from "../../features/user/context";
import { useRestartChapter } from "../../features/user/hooks";
import GameModal from "../components/ui/dialog";
import SelectVoiceOverlay from "../components/select-voice-overlay";
import BlockingUsageModal from "../components/ui/blocking-usage-modal";
import { VoiceService } from "../services/voice-service";

const IMAGE_VERSION = "1";

export default function Home() {
  const { setType, setCollectionItems, } = useVideoPlayerContext();
  const navigate = useNavigate();
  const { chapter, refetchProgress, refetchCollectedRewards, } = useUserContext();
  const { mutateAsync: restartChapter } = useRestartChapter();
  const [dialogName, setDialogName] = React.useState<string | null>(null);
  const [isVoiceOverlayOpen, setIsVoiceOverlayOpen] = React.useState(false);
  const [isUsageLimitExceeded, setIsUsageLimitExceeded] = React.useState(false);
  const [dailyUsageCount, setDailyUsageCount] = React.useState<number>(0);
  const dailyLimit = parseInt(import.meta.env.VITE_DAILY_VOICE_LIMIT || "100", 10);
  /* Removed shakeState + effects in favor of CSS animations */

  // Fetch daily usage count once when component mounts
  React.useEffect(() => {
    const fetchDailyUsage = async () => {
      try {
        const usageResponse = await VoiceService.getDailyUsage();
        if (usageResponse.data) {
          setDailyUsageCount(usageResponse.data.count || 0);
        }
      } catch (error) {
        console.error("Failed to fetch daily usage:", error);
        setDailyUsageCount(0); // Default to 0 if fetch fails
      }
    };

    fetchDailyUsage();
  }, []); // Only run once on mount

  // Determine if the game is in progress (has progress & multiple scenes)
  const isPlaying = useMemo(() => {
    return Object.values(chapter?.progress?.scenes || {}).length > 1 || chapter.progress?.currentScene?.watchingSecond;
  }, [chapter.progress?.scenes, chapter.progress?.currentScene?.watchingSecond]);

  const handleClick = async (
    actionName: "story" | "journal" | "ranking" | "playAgain" | "collection" | "cardCollection"
  ) => {
    if (actionName === "playAgain") {
      setDialogName("quitPlayer");
      return;
    }

    // Handle navigation for non-story types
    if (actionName === "journal") {
      navigate("/journal");
      return;
    }
    if (actionName === "ranking") {
      navigate("/rank");
      return;
    }
    if (actionName === "collection") {
      navigate("/collection");
      return;
    }

    setType(actionName);
    refetchCollectedRewards();
  };

  const handleStart = () => {
    // const sceneId =
    //   chapter.progress?.currentScene?.sceneId || chapter.startSceneId;
    // onPlayPlayer(sceneId);
    setType("story");
    setCollectionItems({});
  };

  const onConfirm = async () => {
    try {
      // await restartChapter(chapter.id);
      await restartChapter(undefined, {
        onSuccess: () => {
          window.location.reload();
        },
      });
      refetchProgress();
    } catch (error) {
      console.error("Failed to restart chapter", error);
    }
    setDialogName(null);
  };

  const HOME_BUTTON = React.useMemo(() => [
    {
      icon: `/images/window-icon.png?v=${IMAGE_VERSION}`,
      label: "Cốt truyện",
      onClick: () => handleClick("story"),
    },
    {
      icon: `/images/book-icon.png?v=${IMAGE_VERSION}`,
      label: "Nhật ký",
      onClick: () => handleClick("journal"),
    },
    {
      icon: `/images/rank-icon.png?v=${IMAGE_VERSION}`,
      label: "Xếp hạng",
      onClick: () => handleClick("ranking"),
    },
    {
      icon: `/images/home/collection.png?v=${IMAGE_VERSION}`,
      label: "Bộ sưu tập",
      onClick: () => handleClick("collection"),
    },
    ...(+(isPlaying || 0) > 0 ? [
      {
        icon: `/images/reload-icon.png?v=${IMAGE_VERSION}`,
        label: "Chơi lại",
        onClick: () => handleClick("playAgain"),
      },
    ] : []),
    {
      icon: `/images/ask-icon.png?v=${IMAGE_VERSION}`,
      label: "Chọn Voice",
      onClick: () => {
        // Use cached daily usage count instead of calling API
        if (dailyUsageCount >= dailyLimit) {
          // Show blocking modal if limit exceeded
          setIsUsageLimitExceeded(true);
          return;
        }
        // Open overlay if within limit
        setIsVoiceOverlayOpen(true);
      },
    },

  ], [IMAGE_VERSION, handleClick, isPlaying, dailyUsageCount, dailyLimit]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={`/images/LOGO_GCNMN.png?v=${IMAGE_VERSION}`}
        alt="home-bg"
        className="absolute top-8 left-[50%] translate-x-[-50%] w-[263px] h-[120px] lg:w-[340px] lg:h-[144px] object-cover"
      />
      <div className="flex flex-col h-full justify-center items-center gap-4 w-fit pl-2 relative z-[100]">
        {HOME_BUTTON.map((button, index) => (
          <div
            key={index}
            className="animate-shake-shiver"
            style={{
              animationDelay: `${index * 2}s`,
            }}
          >
            <HomeButton
              icon={button.icon}
              label={button.label}
              onClick={button.onClick}
            />
          </div>
        ))}
      </div>
      <div className="absolute -bottom-6 lg:-bottom-16 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-float-paper">
          <img
            src={`/images/home/charactor.png?v=${IMAGE_VERSION}`}
            alt="paper-HDQ"
            className="w-auto h-[200px] lg:h-[425px] object-contain block mx-auto"
          />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 z-40 w-full h-[116px] lg:h-[260px]"
        style={{
          backgroundImage: `url('/images/home/bottom-bg-home.png?v=${IMAGE_VERSION}')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="absolute bottom-0 right-10 w-[134px] h-[116px] lg:w-[161px] lg:h-[139px] z-50">
        <HookButton
          label={isPlaying ? "Tiếp tục" : "Bắt đầu"}
          onClick={handleStart}
        />
      </div>

      <GameModal
        isOpen={dialogName === "quitPlayer"}
        onClose={() => setDialogName(null)}
        title="Chơi lại"
        message="Bắt đầu một hành trình mới sẽ xoá tiến trình trò chơi của bạn. Bạn có chắc chắn muốn bắt đầu lại không?"
        onConfirm={onConfirm}
      />

      <SelectVoiceOverlay
        isOpen={isVoiceOverlayOpen}
        onClose={() => setIsVoiceOverlayOpen(false)}
      />

      <BlockingUsageModal
        isOpen={isUsageLimitExceeded}
        onClose={() => setIsUsageLimitExceeded(false)}
      />
    </div>
  );
}

