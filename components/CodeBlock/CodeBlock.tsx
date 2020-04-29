import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeBlockProps = {
  language: string;
  value: string;
};

export const CodeBlock: React.SFC<CodeBlockProps> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={okaidia}>
      {value}
    </SyntaxHighlighter>
  );
};
