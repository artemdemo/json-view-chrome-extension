import { FC, useMemo, type ReactNode } from "react";
import { formatBytes, getByteLength } from "../services/summary";
import { useStorage } from "@jview/storage";
import { JsonToken } from "./JsonToken";
import "./JsonViewer.css";

type JsonViewerProps = {
  jsonStr: string;
  source: string;
};

export const JsonViewer: FC<JsonViewerProps> = ({ jsonStr, source }) => {
  const {
    settings: { wordWrap },
  } = useStorage();

  return (
    <main className="json-viewer-root" data-json-viewer="true">
      <header className="json-viewer-toolbar">
        <div className="json-viewer-summary">
          <p>{formatBytes(getByteLength(source))}</p>
        </div>
      </header>

      <pre
        className={
          wordWrap ? "json-viewer-pre json-viewer-pre--wrap" : "json-viewer-pre"
        }
      >
        <code>{useMemo(() => renderHighlightedJson(jsonStr), [jsonStr])}</code>
      </pre>
    </main>
  );
};

const renderHighlightedJson = (json: string): ReactNode[] => {
  const tokenPattern =
    /("(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let tokenIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(json)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(json.slice(lastIndex, match.index));
    }

    nodes.push(<JsonToken token={match[0]} key={tokenIndex} />);
    lastIndex = match.index + match[0].length;
    tokenIndex += 1;
  }

  if (lastIndex < json.length) {
    nodes.push(json.slice(lastIndex));
  }

  return nodes;
};
