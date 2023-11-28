import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay = ({ code }: CodeDisplayProps) => {
  return (
    <div className="code-display">
      <div className="buttons">
        <div className="button first"></div>
        <div className="button middle"></div>
        <div className="button last"></div>
      </div>
      <div className="code-output">
        <Markdown remarkPlugins={[remarkGfm]}>{code}</Markdown>
      </div>
    </div>
  );
};

export default CodeDisplay;
