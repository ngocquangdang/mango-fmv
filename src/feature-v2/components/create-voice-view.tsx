import { useState, useRef, useEffect, useMemo } from "react";
import { useUserContext } from "../../features/user/context";
import { VoiceService } from "../services/voice-service";
import { useToast } from "../../components/ui/toast-v2/use-toast";


interface CreateVoiceViewProps {
  onBack: () => void;
  onSuccess: () => void;
}

const CreateVoiceView = ({ onBack, onSuccess }: CreateVoiceViewProps) => {
  const { chapter } = useUserContext();
  const { showToast } = useToast();

  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiVoiceUrl, setAiVoiceUrl] = useState<string | null>(null);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordings, setRecordings] = useState<any[]>([]);

  // Recording duration tracking
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordedAudioDuration, setRecordedAudioDuration] = useState(0);
  const recordingTimerRef = useRef<number | null>(null);
  const recordingStartTimeRef = useRef<number>(0);

  // Processing stage tracking
  const [processingStage, setProcessingStage] = useState<'uploading' | 'getting-cdn' | 'processing' | 'complete' | null>(null);

  // Track current recording ID for deletion
  const [currentRecordingId, setCurrentRecordingId] = useState<string | null>(null);

  // Confirmation dialog state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // AI audio playback tracking
  const [aiCurrentTime, setAiCurrentTime] = useState(0);
  const [aiDuration, setAiDuration] = useState(0);

  // Duration constraints
  const MIN_DURATION = 10; // seconds
  const MAX_DURATION = 60; // seconds

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

        // Create audio element for playback and get actual duration
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
          const duration = audio.duration;
          if (Number.isFinite(duration)) {
            setRecordedAudioDuration(duration);
            console.log('Recorded audio duration:', duration);

            // Validate duration
            if (duration < MIN_DURATION) {
              showToast({
                description: `Audio quá ngắn! Cần ít nhất ${MIN_DURATION} giây.`,
              });
            } else if (duration > MAX_DURATION) {
              showToast({
                description: `Audio quá dài! Tối đa ${MAX_DURATION} giây.`,
              });
            }
          }
        });

        audio.onended = () => setIsPlaying(false);
        audioRef.current = audio;

        // Clear recording timer
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current);
          recordingTimerRef.current = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setHasRecorded(false);
      setRecordingDuration(0);
      recordingStartTimeRef.current = Date.now();

      // Start duration timer
      recordingTimerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recordingStartTimeRef.current) / 1000);
        setRecordingDuration(elapsed);

        // Auto-stop at MAX_DURATION
        if (elapsed >= MAX_DURATION) {
          stopRecording();
          showToast({
            description: `Đã đạt thời gian tối đa ${MAX_DURATION} giây!`,
          });
        }
      }, 1000); // Update every 1 second

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

      // Clear recording timer
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
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
    // If there's a current recording, show confirmation dialog
    if (currentRecordingId) {
      setShowDeleteConfirm(true);
    } else {
      // No recording to delete, just reset
      resetRecordingState();
    }
  };

  const resetRecordingState = () => {
    setHasRecorded(false);
    setAudioUrl(null);
    setAiVoiceUrl(null);
    setRecordedAudioDuration(0);
    setRecordingDuration(0);
    setCurrentRecordingId(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleConfirmDelete = async () => {
    if (!currentRecordingId) return;

    setShowDeleteConfirm(false);

    try {
      // Delete the current recording
      console.log('Deleting recording:', currentRecordingId);
      await VoiceService.deleteRecording(currentRecordingId);
      console.log('Recording deleted successfully');

      showToast({
        description: "Đã xóa recording cũ",
      });

      // Reset all states after successful deletion
      resetRecordingState();
    } catch (error) {
      console.error('Failed to delete recording:', error);
      showToast({
        description: "Không thể xóa recording. Vui lòng thử lại.",
      });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleUseVoice = async () => {
    // Validate duration before upload
    if (recordedAudioDuration < MIN_DURATION) {
      showToast({
        description: `Audio quá ngắn! Cần ít nhất ${MIN_DURATION} giây. Hiện tại: ${Math.floor(recordedAudioDuration)}s`,
      });
      return;
    }

    if (recordedAudioDuration > MAX_DURATION) {
      showToast({
        description: `Audio quá dài! Tối đa ${MAX_DURATION} giây. Hiện tại: ${Math.floor(recordedAudioDuration)}s`,
      });
      return;
    }

    const sceneId = chapter?.id || "scene_123";
    if (!audioUrl) return;

    try {
      setIsProcessing(true);
      setProcessingStage('uploading');

      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mpeg' });

      // 1. Get Upload URL
      console.log('Step 1: Getting upload URL...');
      const uploadRes = await VoiceService.getUploadUrl({
        fileName: `recording-${Date.now()}.webm`,
        fileSize: audioBlob.size,
        sceneId: sceneId
      });

      if (!uploadRes.data?.uploadUrl || !uploadRes.data?.recordingId) {
        throw new Error("Không thể lấy URL upload. Vui lòng thử lại.");
      }

      const { uploadUrl, recordingId } = uploadRes.data;

      // Store recording ID for potential deletion later
      setCurrentRecordingId(recordingId);

      // 2. Upload File to GCS
      console.log('Step 2: Uploading file to GCS...');
      await VoiceService.uploadFileToUrl(uploadUrl, audioBlob, "audio/mpeg");

      // 3. Confirm Upload
      console.log('Step 3: Confirming upload...');
      await VoiceService.confirmUpload(recordingId);

      // 4. Get CDN URL - fetch the recording to get the CDN URL
      setProcessingStage('getting-cdn');
      console.log('Step 4: Fetching audio recordings to get CDN URL for recordingId:', recordingId);

      // Wait a bit for backend to process the upload
      await new Promise(resolve => setTimeout(resolve, 1000));

      const recordingsRes = await VoiceService.getAudioRecordings(50, 0);

      // Find the recording we just uploaded
      const recording = recordingsRes.data?.recordings?.find((r: any) => r.id === recordingId || r.recordingId === recordingId);

      if (!recording) {
        console.error('Available recordings:', recordingsRes.data?.recordings);
        throw new Error(`Không tìm thấy recording vừa upload (ID: ${recordingId}). Vui lòng thử lại.`);
      }

      const cdnUrl = recording.cdnUrl || recording.cdn_url || recording.publicUrl;

      if (!cdnUrl) {
        console.error('Recording found but missing CDN URL:', recording);
        throw new Error("Recording không có CDN URL. Vui lòng liên hệ support.");
      }

      console.log('Successfully retrieved recording CDN URL:', cdnUrl);

      // 5. Get Actor Audio Path (default voice)
      const currentScene = chapter?.scenes?.[sceneId];
      let actorAudioPath = currentScene?.originalAudio;

      // Fallback: try to get from first scene if current scene doesn't have it
      if (!actorAudioPath && chapter?.startSceneId) {
        const firstScene = chapter.scenes?.[chapter.startSceneId];
        actorAudioPath = firstScene?.originalAudio;
        console.log('Using actor audio from first scene:', actorAudioPath);
      }

      if (!actorAudioPath) {
        console.warn('No actor audio path found in chapter.scenes');
        throw new Error("Không tìm thấy audio gốc của nhân vật. Vui lòng liên hệ support.");
      }

      console.log('Using actor audio path:', actorAudioPath);

      // 6. Poll for Voice Processing Result
      setProcessingStage('processing');
      console.log('Step 5: Starting voice processing polling...');
      console.log('Parameters:', {
        sceneId,
        recordingCDN: cdnUrl,
        actorAudio: actorAudioPath
      });

      const resultUrl = await VoiceService.pollVoiceProcessing(sceneId, cdnUrl, actorAudioPath);

      console.log('Voice processing completed! Result URL:', resultUrl);

      setProcessingStage('complete');
      setAiVoiceUrl(resultUrl);
      setIsProcessing(false);

      showToast({
        description: "Thành công: Đã tạo voice AI xong!",
      });

    } catch (error) {
      console.error('Voice processing error:', error);
      setIsProcessing(false);
      setProcessingStage(null);

      const errorMessage = error instanceof Error ? error.message : "Lỗi: Không thể tạo voice. Vui lòng thử lại.";
      showToast({
        description: errorMessage,
      });
    }
  };

  const handlePlayAiVoice = () => {
    if (!aiVoiceUrl) return;

    if (!aiAudioRef.current) {
      aiAudioRef.current = new Audio(aiVoiceUrl);

      // Attach event listeners
      aiAudioRef.current.addEventListener('timeupdate', () => {
        if (aiAudioRef.current) {
          setAiCurrentTime(aiAudioRef.current.currentTime);
        }
      });

      aiAudioRef.current.addEventListener('loadedmetadata', () => {
        if (aiAudioRef.current && Number.isFinite(aiAudioRef.current.duration)) {
          setAiDuration(aiAudioRef.current.duration);
        }
      });

      aiAudioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setAiCurrentTime(0);
      });
    }

    if (isPlaying) {
      aiAudioRef.current.pause();
      setIsPlaying(false);
    } else {
      aiAudioRef.current.play();
      setIsPlaying(true);
    }
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
              {processingStage === 'uploading' && "Đang upload recording..."}
              {processingStage === 'getting-cdn' && "Đang lấy thông tin file..."}
              {processingStage === 'processing' && (
                <>
                  Đang xử lý voice AI...<br />Vui lòng đợi (có thể mất ~30s)
                </>
              )}
              {processingStage === 'complete' && "Hoàn thành!"}
            </div>
          </div>
        ) : aiVoiceUrl ? (
          /* AI Voice Result */
          <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300 w-full max-w-[400px]">
            <div className="text-white font-hand font-bold text-xs md:text-sm mb-1.5">Voice AI của bạn</div>

            {/* Instruction text */}
            <div className="text-white/80 font-hand text-[10px] md:text-xs text-center -mt-2">
              👇 Click nút Play để nghe thử voice vừa tạo
            </div>

            {/* AI Audio Player */}
            <div className="bg-[#FFF8E7] rounded-full p-3 shadow-lg border-2 border-orange-400 flex items-center gap-4 w-full">
              <button
                onClick={handlePlayAiVoice}
                className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#E85D04] flex items-center justify-center text-white hover:bg-orange-600 transition-colors shrink-0 shadow-sm"
              >
                {isPlaying ? "||" : "▶"}
              </button>

              <div className="flex-1 h-3 bg-orange-200 rounded-full relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#E85D04] rounded-full transition-all duration-100"
                  style={{ width: `${(aiDuration > 0 && Number.isFinite(aiDuration)) ? (aiCurrentTime / aiDuration) * 100 : 0}%` }}
                ></div>
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
              {isRecording ? (
                <div className="flex flex-col items-center gap-1">
                  <span>Đang ghi âm... {recordingDuration}s / {MAX_DURATION}s</span>
                  {recordingDuration < MIN_DURATION && (
                    <span className="text-yellow-300 text-[9px] md:text-[10px]">
                      Tối thiểu {MIN_DURATION} giây
                    </span>
                  )}
                </div>
              ) : (
                "Nhấn Nút Để Bắt Đầu Ghi Âm"
              )}
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

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFF8E7] rounded-2xl p-6 shadow-2xl border-4 border-orange-300 max-w-sm mx-4 animate-in zoom-in-95 duration-200">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-4xl">⚠️</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-hand font-bold text-[#E85D04] text-center mb-3">
              Xác nhận ghi âm lại?
            </h3>

            {/* Message */}
            <p className="text-gray-700 text-center mb-6 font-hand text-sm leading-relaxed">
              Hành động này sẽ <span className="font-bold text-red-600">xóa recording hiện tại</span>.
              <br />
              Bạn sẽ cần tạo voice AI mới sau khi ghi âm lại.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 bg-gray-200 text-gray-700 font-hand font-bold px-4 py-3 rounded-full hover:bg-gray-300 transition-colors border-2 border-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-[#E85D04] text-white font-hand font-bold px-4 py-3 rounded-full hover:bg-orange-600 transition-colors border-2 border-white/20 shadow-lg"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CreateVoiceView;
