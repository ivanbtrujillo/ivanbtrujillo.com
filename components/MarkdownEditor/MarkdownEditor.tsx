import dynamic from "next/dynamic";

export const MarkdownEditor = dynamic(
  () => import("react-markdown-editor-lite"),
  {
    ssr: false,
  }
);
