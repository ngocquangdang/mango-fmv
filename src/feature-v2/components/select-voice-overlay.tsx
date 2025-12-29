import React, { useState, useRef, useEffect } from "react";
import Button from "./ui/button";
import { useVideoPlayerContext } from "../../contexts";
import CreateVoiceView from "./create-voice-view";
import { useUserContext } from "../../features/user/context";
import { VoiceService } from "../services/voice-service";

interface SelectVoiceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectVoiceOverlay = ({ isOpen, onClose }: SelectVoiceOverlayProps) => {
  const { voiceType, setVoiceType, clips, currentSceneId } = useVideoPlayerContext();
  const { chapter } = useUserContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCreatingVoice, setIsCreatingVoice] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // State for recordings and processing
  const [recordings, setRecordings] = useState<any[]>([]);
  const [isProcessingAi, setIsProcessingAi] = useState(false);
  const [aiProcessedAudioUrl, setAiProcessedAudioUrl] = useState<string | null>(null); // Store processed AI audio URL
  const hasProcessedRef = useRef(false); // Track if we've already processed AI voice

  // Get first scene audio URL from context or chapter data
  const sceneId = currentSceneId || chapter?.startSceneId;
  const activeScene = sceneId ? (clips?.[sceneId] || chapter?.scenes?.[sceneId]) : null;

  // Fallback: If no active scene, try to get the first available scene from clips
  const fallbackScene = !activeScene && clips ? Object.values(clips)[0] : null;

  const targetScene = activeScene || fallbackScene;

  // FIXME: Fallback dummy audio for testing because API data is blocked by CORS
  // const DUMMY_AUDIO = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";
  const firstSceneAudioUrl = targetScene?.originalAudio || null;

  // Debug logging
  React.useEffect(() => {
    console.log('🎵 Voice Overlay Debug V2:', {
      currentSceneId,
      startSceneId: chapter?.startSceneId,
      hasClips: !!clips && Object.keys(clips).length > 0,
      hasChapterScenes: !!chapter?.scenes,
      firstSceneAudioUrl,
      targetSceneId: targetScene?.id,
      voiceType
    });
  }, [chapter, clips, currentSceneId, firstSceneAudioUrl, targetScene, voiceType]);

  // Fetch recordings on mount
  useEffect(() => {
    VoiceService.getAudioRecordings(50, 0)
      .then((res) => {
        if (res.data?.recordings) {
          setRecordings(res.data.recordings);
          console.log('📼 Fetched recordings:', res.data.recordings);
        }
      })
      .catch((err) => console.error("Failed to fetch recordings:", err));
  }, []);

  // Auto-process AI voice when AI option is selected and recordings are available
  useEffect(() => {
    const processAiVoice = async () => {
      // Only process if:
      // 1. AI voice type is selected
      // 2. Have recordings available
      // 3. Not already processing
      // 4. Have necessary scene data
      // 5. Haven't already processed (NEW CHECK)
      if (voiceType !== 'ai' || recordings.length === 0 || isProcessingAi || hasProcessedRef.current) {
        return;
      }

      // Get first recording (most recent)
      const firstRecording = recordings[0];
      const cdnUrl = firstRecording.cdnUrl || firstRecording.cdn_url || firstRecording.publicUrl;

      if (!cdnUrl) {
        console.warn('First recording does not have CDN URL:', firstRecording);
        return;
      }

      // Get scene info
      const sceneId = currentSceneId || chapter?.startSceneId || chapter?.id;
      if (!sceneId) {
        console.warn('No scene ID available for processing');
        return;
      }

      const currentScene = sceneId ? (clips?.[sceneId] || chapter?.scenes?.[sceneId]) : null;
      const originalAudio = currentScene?.originalAudio;

      console.log('🎯 Auto-processing AI voice:', {
        sceneId,
        cdnUrl,
        originalAudio,
        recording: firstRecording
      });

      try {
        setIsProcessingAi(true);

        // Call the API to process voice
        const resultUrl = await VoiceService.pollVoiceProcessing(sceneId, cdnUrl, originalAudio);

        console.log('✅ AI voice processing completed:', resultUrl);
        setAiProcessedAudioUrl(resultUrl); // Store the AI processed audio URL
        hasProcessedRef.current = true; // Mark as processed
        setIsProcessingAi(false);
      } catch (error) {
        console.error('❌ Failed to process AI voice:', error);
        setIsProcessingAi(false);
      }
    };

    processAiVoice();
  }, [voiceType, recordings, currentSceneId, chapter, clips, isProcessingAi]);

  // Determine which audio to play based on voice type
  const currentAudioUrl = voiceType === 'ai' ? aiProcessedAudioUrl : firstSceneAudioUrl;
  const isAudioAvailable = voiceType === 'ai' ? !!aiProcessedAudioUrl : !!firstSceneAudioUrl;

  // Play/Pause toggle handler
  const togglePlayPause = () => {
    if (!audioRef.current || !currentAudioUrl || !isAudioAvailable) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Sync isPlaying state with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      console.log('Time update:', audio.currentTime, '/', audio.duration);
      setCurrentTime(audio.currentTime);
    };
    const handleLoadedMetadata = () => {
      // Ensure duration is finite
      const d = audio.duration;
      setDuration(Number.isFinite(d) ? d : 0);
      console.log("Audio metadata loaded, duration:", d);
    };

    // Initialize state if value available
    if (audio.duration && Number.isFinite(audio.duration)) {
      setDuration(audio.duration);
    }

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [voiceType, currentAudioUrl, isCreatingVoice]); // Added isCreatingVoice to re-attach listeners when back from CreateVoiceView

  // Stop audio when switching to mute or closing overlay
  useEffect(() => {
    if (voiceType === 'mute' || !isOpen) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentTime(0); // Reset UI
    }
  }, [voiceType, isOpen]);

  // Sync local selection with global on open/change? 
  // Actually, we should probably just use the global state directly or sync on confirm. 
  // Actually, we should probably just use the global state directly or sync on confirm.
  // The UI suggests "Continue" confirms it.
  // Let's us local state for selection and commit on "Continue" or just use global state directly for "instant" feel?
  // User asked for "global state managing type of voice". Usually settings like this apply immediately or on confirm.
  // Given "Continue" button, let's update global state on click (or directly if instant feedback needed).
  // Let's assume instant update for now or local + commit. 
  // "Nữ chính sẽ dùng voice ..." message updates dynamically.
  // Let's use global state directly for simplicity and instant effect, unless "Continue" is "Save".
  // If "Continue" is just "Close", then instant update is better.

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">

      {/* Background (Optional, if we want specific styling) */}

      {/* Back Button */}
      <div
        onClick={() => {
          if (isCreatingVoice) {
            setIsCreatingVoice(false);
          } else {
            onClose();
          }
        }}
        className="absolute top-4 left-4 lg:top-8 lg:left-8 cursor-pointer z-50 hover:scale-105 transition-transform"
      >
        <img src="/images/back-icon.png" alt="back" className="w-10 h-10 lg:w-14 lg:h-14 object-contain" />
      </div>

      {isCreatingVoice ? (
        <CreateVoiceView onBack={() => {
          setIsCreatingVoice(false);
          // Reset AI processing state to allow processing with new recording
          hasProcessedRef.current = false;
          setIsProcessingAi(false);
          // Reset audio player states to force re-initialization
          setCurrentTime(0);
          setDuration(0);
          setIsPlaying(false);
          // Refresh recordings
          VoiceService.getAudioRecordings(50, 0)
            .then((res) => {
              if (res.data?.recordings) {
                setRecordings(res.data.recordings);
              }
            })
            .catch((err) => console.error("Failed to refresh recordings:", err));
        }} />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 relative animate-in fade-in duration-300">

          {/* Title */}
          <div className="relative mb-8 lg:mb-12">
            {/* Brush stroke background mock */}
            <div className="relative z-10 bg-[#8CC63F] px-4 py-2 lg:px-8 lg:py-3 transform -rotate-1 skew-x-[-10deg] shadow-lg border-2 border-dashed border-white/30">
              <h2 className="text-xl lg:text-3xl font-hand font-bold text-[#1A4027] uppercase text-center transform skew-x-[10deg]">
                Chọn voice cho nhân vật tương tác
              </h2>
            </div>
            {/* Decorative elements could be added here */}
          </div>

          {/* Options */}
          <div className="flex gap-4 lg:gap-8 mb-8 lg:mb-12">

            {/* Option: Default */}
            <div
              onClick={() => setVoiceType("default")}
              className={`cursor-pointer group relative w-[100px] h-[130px] lg:w-[150px] lg:h-[200px] bg-[#FFF8E7] border-2 ${voiceType === "default" ? "border-[#E85D04] ring-2 ring-[#E85D04]/50" : "border-[#E5E0D5]"} rounded-lg shadow-md flex flex-col items-center justify-center p-2 transition-all hover:-translate-y-1`}
            >
              {/* Icon */}
              <div className="w-12 h-12 lg:w-20 lg:h-20 rounded-full border-2 border-orange-400 overflow-hidden mb-2 bg-white flex items-center justify-center">
                <img src="/images/home/charactor.png" alt="default" className="w-full h-full object-cover object-top" />
              </div>
              <div className="text-center font-hand font-bold text-[#1A4027] text-xs lg:text-base leading-tight">
                Voice mặc định
              </div>
              {/* Scribble border effect could be SVG or CSS */}
            </div>

            {/* Option: AI */}
            <div
              onClick={() => setVoiceType("ai")}
              className={`cursor-pointer group relative w-[100px] h-[130px] lg:w-[150px] lg:h-[200px] bg-[#FFF8E7] border-2 ${voiceType === "ai" ? "border-[#E85D04] ring-2 ring-[#E85D04]/50" : "border-[#E5E0D5]"} rounded-lg shadow-md flex flex-col items-center justify-center p-2 transition-all hover:-translate-y-1`}
            >
              <div className="w-12 h-12 lg:w-20 lg:h-20 rounded-full border-2 border-orange-400 mb-2 bg-white flex items-center justify-center">
                <span className="font-hand font-bold text-orange-500 text-xl lg:text-3xl">AI</span>
              </div>
              <div className="text-center font-hand font-bold text-[#1A4027] text-xs lg:text-base leading-tight">
                Voice của bạn
              </div>
            </div>

            {/* Option: Mute */}
            <div
              onClick={() => setVoiceType("mute")}
              className={`cursor-pointer group relative w-[100px] h-[130px] lg:w-[150px] lg:h-[200px] bg-[#FFF8E7] border-2 ${voiceType === "mute" ? "border-[#E85D04] ring-2 ring-[#E85D04]/50" : "border-[#E5E0D5]"} rounded-lg shadow-md flex flex-col items-center justify-center p-2 transition-all hover:-translate-y-1`}
            >
              <div className="w-12 h-12 lg:w-20 lg:h-20 rounded-full border-2 border-orange-400 mb-2 bg-white flex items-center justify-center">
                <span className="text-2xl lg:text-4xl text-orange-500">🔇</span>
              </div>
              <div className="text-center font-hand font-bold text-[#1A4027] text-xs lg:text-base leading-tight">
                Tắt tiếng
              </div>
            </div>
          </div>

          {voiceType === "ai" && (
            <div className="flex flex-col items-center gap-2 mb-6 animate-in slide-in-from-top-2 fade-in">
              <Button
                label="Tạo Voice ngay"
                className="bg-[#E85D04] text-white px-6 py-2 shadow-lg border-2 border-white/20 text-sm lg:text-base"
                onClick={() => setIsCreatingVoice(true)}
              />
              <span className="text-white text-xs lg:text-sm font-hand">
                Dùng giọng nói của riêng bạn
              </span>
              {isProcessingAi && (
                <div className="flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full border border-orange-300 animate-pulse">
                  <span className="text-orange-200 text-xs">⏳ Đang xử lý voice AI...</span>
                </div>
              )}
            </div>
          )}

          {/* Audio Player - Always show for default/ai, hide for mute */}
          {voiceType !== "mute" && (
            <div className="w-[90%] max-w-[500px] mb-2 relative">
              {/* Hidden audio element */}
              <audio ref={audioRef} src={currentAudioUrl || undefined} />

              {/* Visible player UI */}
              <div className={`bg-white rounded-full p-2 lg:p-3 shadow-lg border-2 border-blue-200 flex items-center gap-3 ${!isAudioAvailable ? 'opacity-50' : ''}`}>
                <button
                  onClick={togglePlayPause}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isAudioAvailable}
                >
                  {isPlaying ? "||" : "▶"}
                </button>

                {/* Progress Bar (real-time) */}
                <div className="flex-1 h-2 bg-orange-100 rounded-full relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-orange-500 rounded-full transition-all duration-100"
                    style={{ width: `${(duration > 0 && Number.isFinite(duration)) ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>

                <span className="text-xs text-gray-500 font-bold">
                  {voiceType === 'ai' && !aiProcessedAudioUrl ? 'Chưa có' : 'Preview'}
                </span>
              </div>

              {/* Info message when AI voice not available */}
              {voiceType === 'ai' && !aiProcessedAudioUrl && !isProcessingAi && (
                <div className="text-center text-yellow-300 text-xs mt-2 font-hand">
                  ⚠️ Bạn cần tạo voice trước khi nghe thử
                </div>
              )}
            </div>
          )}

          <div className="text-white font-hand text-sm lg:text-base mb-8 shadow-black/50 text-shadow-sm">
            Nữ chính sẽ dùng voice <span className="text-orange-300">{voiceType === "default" ? "mặc định" : voiceType === "ai" ? "của bạn" : "tắt tiếng"}</span>
          </div>

          {/* Continue Button */}
          <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10">
            <Button
              label="Tiếp tục"
              className="bg-[#E85D04] text-white px-8 lg:px-10 shadow-lg border-2 border-white/20"
              onClick={onClose}
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default SelectVoiceOverlay;
