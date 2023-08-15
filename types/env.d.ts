/// <reference types="vite/client" />

interface ImportMetaEnv {
  // common
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_ID: string;
  // not common
  readonly VITE_PUBLIC_PATH: string;
  readonly VITE_DEV_SERVER_PROXY: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
