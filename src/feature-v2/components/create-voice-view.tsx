import { useState, useRef, useEffect, useMemo } from "react";
import { useUserContext } from "../../features/user/context";
import { useVideoPlayerContext } from "../../contexts";
import { VoiceService } from "../services/voice-service";
import { useToast } from "../../components/ui/toast-v2/use-toast";
import { getOrderedScenes } from "../utils/scene-ordering";


interface CreateVoiceViewProps {
  onBack: () => void;
  onSuccess: () => void;
}

const CreateVoiceView = ({ onBack, onSuccess }: CreateVoiceViewProps) => {
  const { chapter } = useUserContext();
  const { setAiAudioList } = useVideoPlayerContext();
  const { showToast } = useToast();

  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiVoiceUrl, setAiVoiceUrl] = useState<string | null>(null);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordings, setRecordings] = useState<any[]>([]);
  // Fetch recordings on mount
  useEffect(() => {
    VoiceService.getAudioRecordings()
      .then((res) => {
        if (res.data?.recordings) {
          setRecordings(res.data.recordings);
        }
      })
      .catch((err) => console.error("Failed to fetch recordings:", err));
  }, []);

  const sortedRecordings = useMemo(() => {
    return [...recordings].sort((a, b) => {
      // Sort by updatedAt descending
      const dateA = new Date(a.updatedAt || 0).getTime();
      const dateB = new Date(b.updatedAt || 0).getTime();
      return dateB - dateA;
    });
  }, [recordings]);

  useEffect(() => {
    if (sortedRecordings && sortedRecordings.length > 0) {
      console.log("Sorted Recordings:", sortedRecordings);
    }
  }, [sortedRecordings])

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const aiAudioRef = useRef<HTMLAudioElement | null>(null); // Separate ref for AI voice

  useEffect(() => {
    return () => {
      // Cleanup URL object
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (aiAudioRef.current) {
        aiAudioRef.current.pause();
        aiAudioRef.current = null;
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mpeg' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setHasRecorded(true);

        // Create audio element for playback
        if (!audioRef.current) {
          audioRef.current = new Audio(url);
          audioRef.current.onended = () => setIsPlaying(false);
        } else {
          audioRef.current.src = url;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setHasRecorded(false);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Không thể truy cập micro. Vui lòng cấp quyền và thử lại.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks to release microphone
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };


  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handlePlayToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReRecord = () => {
    setHasRecorded(false);
    setAudioUrl(null);
    setAiVoiceUrl(null); // Reset AI voice
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
  }

  const handleUseVoice = async () => {
    // Need chapter ID or Scene ID. The user's prompt says `sceneOrChapterId` is required for polling?
    // "GET /api/v1/voice/scenes/:sceneId/result"
    // We'll use `chapter.id` as the sceneId for now, or fallback to a default.
    const sceneId = chapter?.id || "scene_123";

    if (!audioUrl) return;

    try {
      setIsProcessing(true);
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mpeg' });

      // 1. Get Upload URL
      const uploadRes = await VoiceService.getUploadUrl({
        fileName: `recording-${Date.now()}.webm`,
        fileSize: audioBlob.size,
        sceneId: sceneId
      });

      if (!uploadRes.data?.uploadUrl || !uploadRes.data?.recordingId) {
        throw new Error("Failed to get upload URL");
      }

      const { uploadUrl, recordingId } = uploadRes.data;

      // 2. Upload File to GCS
      await VoiceService.uploadFileToUrl(uploadUrl, audioBlob, "audio/mpeg");

      // 3. Confirm Upload
      await VoiceService.confirmUpload(recordingId);

      // Close modal immediately after success confirm
      onSuccess();

      // 4. Poll for Result
      // Note: The guide mentions using the GCS URL for polling? 
      // `audio_file_url` param. Check multiple possible keys
      const cdnUrl = uploadRes.data.cdnUrl || uploadRes.data.cdn_url || uploadRes.data.publicUrl;

      if (!cdnUrl) {
        throw new Error("Backend did not return CDN URL or Public URL");
      }

      const currentScene = chapter?.scenes?.[sceneId];
      const originalAudio = currentScene?.originalAudio;

      const resultUrl = await VoiceService.pollVoiceProcessing(sceneId, cdnUrl, originalAudio);

      // setAiVoiceUrl(resultUrl); // Skip local state update as component will unmount
      setIsProcessing(false);

      // --- Trigger polling for first 10 scenes ---
      try {
        if (chapter && chapter.scenes && chapter.startSceneId) {
          const orderedIds = getOrderedScenes(chapter.scenes, chapter.startSceneId);
          // Take first 10
          const targets = orderedIds.slice(0, 10);
          console.log("Triggering background polling for:", targets);

          // We can let this run in background (fire and forget, or track)
          // Since we want to update the list as they come in:
          const results: { sceneId: string; aiAudio: string }[] = [];

          // If the current scene was already processed (resultUrl), add it
          if (sceneId && resultUrl) {
            results.push({ sceneId, aiAudio: resultUrl });
            setAiAudioList([...results]);
          }

          targets.forEach(tid => {
            // Skip the one we just did if we want to avoid double calling, 
            // OR just let it cache check (service handles cache?)
            // The service polling just calls getProcessingResult. 
            // If it's already done (by the main wait above), it returns instantly.
            if (tid === sceneId && resultUrl) return;

            const tScene = chapter.scenes[tid];
            if (tScene && tScene.originalAudio) {
              VoiceService.pollVoiceProcessing(tid, cdnUrl, tScene.originalAudio)
                .then(res => {
                  console.log(`Polled success for ${tid}:`, res);
                  results.push({ sceneId: tid, aiAudio: res });
                  setAiAudioList([...results]);
                })
                .catch(err => console.warn(`Bg poll failed for ${tid}`, err));
            }
          });
        }
      } catch (err) {
        console.warn("Error in background polling sequence:", err);
      }
      // -------------------------------------------

      showToast({
        description: "Thành công: Đã tạo voice AI xong!",
      });

    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      showToast({
        description: "Lỗi: Không thể tạo voice. Vui lòng thử lại.",
      });
    }
  };

  const handlePlayAiVoice = () => {
    if (!aiVoiceUrl) return;

    if (!aiAudioRef.current) {
      aiAudioRef.current = new Audio(aiVoiceUrl);
      aiAudioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      aiAudioRef.current.pause();
    } else {
      aiAudioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* Back Button */}
      <div
        onClick={onBack}
        className="absolute top-4 left-4 md:top-8 md:left-8 cursor-pointer z-50 hover:scale-105 transition-transform"
      >
        <img src="/images/back-icon.png" alt="back" className="w-10 h-10 md:w-14 md:h-14 object-contain" />
      </div>

      {/* Title */}
      <div className="relative mb-2 md:mb-3 w-full flex justify-center">
        <div className="relative z-10 bg-[#8CC63F] px-3 py-1 md:px-5 md:py-1.5 transform -rotate-1 skew-x-[-10deg] shadow-lg border-2 border-dashed border-white/30 min-w-[120px] md:min-w-[200px] flex justify-center">
          <h2 className="text-sm md:text-lg font-hand font-bold text-[#1A4027] uppercase text-center transform skew-x-[10deg]">
            TẠO VOICE CỦA RIÊNG BẠN
          </h2>
        </div>
      </div>

      {/* Subtitle */}
      <div className="relative mb-1 md:mb-2">
        <div className="bg-[#FFAB91] px-3 py-1 rounded-full border-2 border-orange-200 transform rotate-2 shadow-md">
          <span className="font-hand font-bold text-[#E85D04] text-[9px] md:text-[11px]">
            Đọc đoạn ngắn dưới đây
          </span>
        </div>
      </div>

      <div className="flex w-full max-w-[480px] gap-2 md:gap-4 items-stretch justify-center">

        {/* Reading Card */}
        <div className="flex-1 bg-[#FFFDF5] border-2 border-orange-300 rounded-lg p-3 md:p-4 shadow-inner relative min-h-[110px] flex items-center justify-center">
          {/* Decor corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-orange-300"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-orange-300"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-orange-300"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-orange-300"></div>

          <p className="font-hand text-xs md:text-sm text-gray-700 leading-relaxed text-center">
            Hoá ra mình đang ở cùng các thành viên của nhóm Tân binh toàn năng <br />
            Hoá ra mình đang ở cùng các thành viên của nhóm Tân binh toàn năng <br />
            Hoá ra mình đang ở cùng các thành viên của nhóm Tân binh toàn năng <br />
            Hãy đọc đoạn n gắn này
          </p>
        </div>

        <div className="hidden md:flex w-[100px] md:w-[130px] bg-[#FFF8E7] border border-orange-200 rounded-lg p-2 flex-col gap-1.5 shadow-sm">
          <h3 className="font-bold text-[#E85D04] text-[9px] md:text-[11px] border-b border-orange-200 pb-1">
            Để Tạo Giọng Nói Chính Xác, Hãy Đảm Bảo:
          </h3>
          <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-700">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              🔊
            </div>
            <span>Ghi Âm Ở Nơi Yên Tĩnh</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-700">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              🎙️
            </div>
            <span>Cho Phép Truy Cập Micro</span>
          </div>
        </div>
      </div>

      {/* Mobile Tips (Horizontal) - Hidden on md+ */}
      <div className="md:hidden flex gap-4 mt-4 w-full justify-center">
        <div className="flex items-center gap-2 bg-[#FFF8E7] px-3 py-1 rounded-full border border-orange-200 text-[10px] text-gray-700">
          <span>🔊</span> Yên tĩnh
        </div>
        <div className="flex items-center gap-2 bg-[#FFF8E7] px-3 py-1 rounded-full border border-orange-200 text-[10px] text-gray-700">
          <span>🎙️</span> Micro
        </div>
      </div>

      {/* Record/Playback Control */}
      <div className="mt-2 md:mt-4 flex flex-col items-center gap-2 w-full">
        {isProcessing ? (
          <div className="flex flex-col items-center gap-3 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center">
              <span className="text-2xl animate-spin">⏳</span>
            </div>
            <div className="text-white font-hand font-bold text-center">
              Đang xử lý voice AI...<br />Vui lòng đợi
            </div>
          </div>
        ) : aiVoiceUrl ? (
          /* AI Voice Result */
          <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300 w-full max-w-[400px]">
            <div className="text-white font-hand font-bold text-xs md:text-sm mb-1.5">Voice AI của bạn</div>

            {/* AI Audio Player */}
            <div className="bg-[#FFF8E7] rounded-full p-3 shadow-lg border-2 border-orange-400 flex items-center gap-4 w-full">
              <button
                onClick={handlePlayAiVoice}
                className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#E85D04] flex items-center justify-center text-white hover:bg-orange-600 transition-colors shrink-0 shadow-sm"
              >
                {isPlaying ? "||" : "▶"}
              </button>

              <div className="flex-1 h-3 bg-orange-200 rounded-full relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[#E85D04] w-[60%] rounded-full"></div>
              </div>
              <span className="text-[10px] md:text-xs text-[#E85D04] font-bold shrink-0">AI Voice</span>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleReRecord}
                className="bg-white text-[#E85D04] font-hand font-bold px-6 py-2 rounded-full shadow-md border-2 border-orange-200 hover:bg-orange-50"
              >
                Thử lại
              </button>
              <button
                onClick={() => {
                  showToast({ description: "Đã chọn voice AI" });
                  // onClose(); // In real app
                }} className="bg-[#E85D04] text-white font-hand font-bold px-6 py-2 rounded-full shadow-md hover:bg-orange-600 border-2 border-white/20"
              >
                Dùng voice này
              </button>
            </div>
          </div>
        ) : hasRecorded ? (
          <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300 w-full max-w-[400px]">
            {/* Audio Player Bar */}
            <div className="bg-white/90 backdrop-blur rounded-full p-3 shadow-lg border-2 border-orange-200 flex items-center gap-4 w-full">
              <button
                onClick={handlePlayToggle}
                className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#E85D04] flex items-center justify-center text-white hover:bg-orange-600 transition-colors shrink-0"
              >
                {isPlaying ? "||" : "▶"}
              </button>

              {/* Progress Bar Mock */}
              <div className="flex-1 h-3 bg-gray-200 rounded-full relative overflow-hidden cursor-pointer">
                <div className="absolute top-0 left-0 h-full bg-[#E85D04] w-[40%] rounded-full transition-all duration-300"></div>
              </div>

              <span className="text-[10px] md:text-xs text-gray-600 font-bold shrink-0 w-10 text-right">00:04</span>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-2">
              <button
                onClick={handleReRecord}
                className="text-[#E85D04] font-hand font-bold text-[10px] md:text-xs underline hover:text-orange-700"
              >
                Ghi âm lại
              </button>
              <button
                onClick={handleUseVoice}
                className="bg-[#E85D04] text-white font-hand font-bold px-4 py-1.5 rounded-full shadow-md text-[10px] md:text-xs hover:bg-orange-600"
              >
                Sử dụng Voice này
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={handleRecordToggle}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110 active:scale-95 ${isRecording ? "bg-red-500 animate-pulse" : "bg-gray-500 hover:bg-gray-600"}`}
            >
              <span className="text-lg md:text-xl text-white">
                {isRecording ? "⬛" : "🎙️"}
              </span>
            </button>
            <div className="text-white font-hand font-bold text-[10px] md:text-xs text-shadow-sm">
              {isRecording ? "Đang ghi âm..." : "Nhấn Nút Để Bắt Đầu Ghi Âm"}
            </div>
          </>
        )}
      </div>

      {/* Continue/Close (for demo) */}
      {/* <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10">
           <Button
              label="Xong" 
              className="bg-[#E85D04] text-white px-8 lg:px-10 shadow-lg border-2 border-white/20"
              onClick={onBack} // Go back for now
           />
        </div> */}

    </div>
  );
};

export default CreateVoiceView;
