/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional backend endpoint that accepts enquiry submissions as JSON. */
  readonly VITE_ENQUIRY_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
