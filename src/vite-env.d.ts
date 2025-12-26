/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_INTERACTIVE_LICENSE_API_URL: string
  readonly VITE_VIDEO_PROGRESS_API_URL: string
  readonly VITE_PROJECT_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
