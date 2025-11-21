// API Client with authentication
import { getAccessToken, removeCookieToken } from "./session";

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
}

export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

const API_BASE_URL = "https://elearning-api-stg.onidservice.cloud/api/v1";

const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return getAccessToken() ?? null;
  }
  return null;
};

const handleAuthError = (): void => {
  if (typeof window !== "undefined") {
    removeCookieToken();
    window.location.href = "/auth";
  }
};

const createHeaders = (customHeaders?: Record<string, string>): Headers => {
  const headers = new Headers({
    "Content-Type": "application/json",
    ...customHeaders,
  });

  const token = getAuthToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
};

const handleResponse = async (response: Response): Promise<any> => {
  if (response.status === 401) {
    handleAuthError();
    throw new ApiError("Unauthorized", 401);
  }

  if (response.status === 403) {
    throw new ApiError("Access denied", 403);
  }

  if (response.status === 404) {
    throw new ApiError("Resource not found", 404);
  }

  if (response.status >= 500) {
    throw new ApiError("Server error", response.status);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || `HTTP ${response.status}`,
      response.status
    );
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new ApiError("Invalid JSON response");
  }
};

class FetchApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string = API_BASE_URL, timeout: number = 30000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private async makeRequest<T>(
    endpoint: string,
    method: string,
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = createHeaders(customHeaders);

    const requestConfig: RequestInit = {
      method,
      headers,
    };

    if (data && method !== "GET") {
      requestConfig.body = JSON.stringify(data);
    }

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new ApiError("Request timeout")), this.timeout);
    });

    const fetchPromise = fetch(url, requestConfig).then(handleResponse);

    return Promise.race([fetchPromise, timeoutPromise]);
  }

  async get<T = any>(
    url: string,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    return this.makeRequest<T>(url, "GET", undefined, customHeaders);
  }

  async post<T = any>(
    url: string,
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    return this.makeRequest<T>(url, "POST", data, customHeaders);
  }

  async put<T = any>(
    url: string,
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    return this.makeRequest<T>(url, "PUT", data, customHeaders);
  }

  async patch<T = any>(
    url: string,
    data?: any,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    return this.makeRequest<T>(url, "PATCH", data, customHeaders);
  }

  async delete<T = any>(
    url: string,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    return this.makeRequest<T>(url, "DELETE", undefined, customHeaders);
  }
}

export const apiClient = new FetchApiClient();
export const apiClientInteractiveLicense = new FetchApiClient(
  "https://interactive-license-stg.onidservice.cloud/api/v1"
);
export const apiClientVideoProgress = new FetchApiClient(
  "https://interactive-video-mango.onidservice.cloud/api/v1"
);

export const apiClienProject = new FetchApiClient(
  "https://onlala-cms-api-stg.onidservice.cloud/api/v1"
);

export type { ApiResponse as ApiResponseType };
