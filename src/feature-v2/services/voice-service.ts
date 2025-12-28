import { apiClientVideoProgress } from "../../lib/api/api-client";
import type { ApiResponse } from "../../lib/api/api-client";

import { getLocalParam } from '../../lib/api/storage';




export interface UploadUrlRequest {
    fileName: string;
    fileSize: number;
    sceneId?: string;
}

export interface UploadUrlResponse {
    recordingId: string;
    fileName: string;
    uploadUrl: string;
    cdnUrl?: string; // Original camelCase
    cdn_url?: string; // Possible snake_case
    publicUrl?: string; // Possible fallback
    fileUrl?: string; // Allow fileUrl fallback
    expiresAt: string;
}

export interface VoiceProcessingResponse {
    status: "processing" | "completed" | "failed";
    request_id: string;
    message: string;
    output_path?: string;
    audio_url?: string;
    scene_id?: string;
    cached?: boolean;
}

export interface VoiceResultItem {
  scene_id: string;
  request_id: string;
  output_path: string;
  audio_url: string;
  created_at: string;
  updated_at: string;
}

export const VoiceService = {
    // API 1: Generate Upload URL
    getUploadUrl: async (data: UploadUrlRequest): Promise<ApiResponse<UploadUrlResponse>> => {
        return apiClientVideoProgress.post<ApiResponse<UploadUrlResponse>>("/audio-recordings/upload-url", data, {
            "X-Ticket": getLocalParam("ticket") || "",
        });
    },

    // Put file to GCS
    uploadFileToUrl: async (url: string, file: Blob, mimeType: string): Promise<void> => {
        const response = await fetch(url, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": mimeType,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to upload file: ${response.statusText}`);
        }
    },

    // API 2: Confirm Upload
    confirmUpload: async (recordingId: string): Promise<ApiResponse<any>> => {
        return apiClientVideoProgress.put<ApiResponse<any>>(`/audio-recordings/${recordingId}/confirm`, {}, {
            "X-Ticket": getLocalParam("ticket") || "",
        });
    },

    // API 3: Get/Poll Processing Result
    getProcessingResult: async (sceneId: string, audioFileUrl?: string, actorAudioPath?: string, encodedPath?: string): Promise<VoiceProcessingResponse> => {

        const params: Record<string, string> = {};
        if (audioFileUrl) params.audio_file_url = audioFileUrl;
        
        if (actorAudioPath) {
            params.actor_audio_path = actorAudioPath;
        }

        if (encodedPath) params.encoded_path = encodedPath;
        
        const queryParams = new URLSearchParams(params);
        
        const response = await apiClientVideoProgress.get<VoiceProcessingResponse>(`/voice/scenes/${sceneId}/result?${queryParams.toString()}`, {
            "X-Ticket": getLocalParam("ticket") || "",
        });
        
        return response;
    },

    // Helper: Poll until complete
    pollVoiceProcessing: async (sceneId: string, audioUrl: string, actorAudioPath?: string): Promise<string> => {
        const maxAttempts = 30;
        const interval = 2000; // 2 seconds

        for (let i = 0; i < maxAttempts; i++) {
            try {
                const result = await VoiceService.getProcessingResult(sceneId, audioUrl, actorAudioPath);

                if (result.status === 'completed' && result.audio_url) {
                    return result.audio_url;
                }

                if (result.status === 'failed') {
                    throw new Error(result.message || 'Processing failed');
                }
            } catch (e) {
                console.warn("Polling error:", e);
                // Continue polling if it's a temp network error? Or abort? 
                // For 'failed' status we threw, so we catch here. Re-throw if it's a real failure.
                if (e instanceof Error && e.message === 'Processing failed') throw e;
            }

            // Wait before next attempt
            await new Promise(resolve => setTimeout(resolve, interval));
        }

        throw new Error('Timeout: Voice processing took too long.');
    },

    getAllVoiceResults: async (): Promise<{ items: VoiceResultItem[] }> => {
        const response = await apiClientVideoProgress.get<{ items: VoiceResultItem[] }>('/voice/results', {
            "X-Ticket": getLocalParam("ticket") || "",
        });
        
        return response;
    },

    // API 4: Get Audio Recordings
    getAudioRecordings: async (limit: number = 20, offset: number = 0): Promise<ApiResponse<any>> => {
        const queryParams = new URLSearchParams({
            uploadStatus: 'completed',
            limit: limit.toString(),
            offset: offset.toString()
        });

        // Using apiClientVideoProgress which likely points to /api/v1 base
        return apiClientVideoProgress.get<ApiResponse<any>>(`/audio-recordings?${queryParams.toString()}`, {
            "X-Ticket": getLocalParam("ticket") || "",
        });
    }
};
