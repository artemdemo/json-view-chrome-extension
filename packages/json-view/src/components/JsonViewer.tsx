import { FC, useMemo, type ReactNode } from "react";
import { formatBytes, getByteLength} from "../services/summary";
import { getJsonStringUrl } from "../services/url";
import { useStorage } from "@jview/storage";
import "./JsonViewer.css";

type JsonViewerProps = {
  jsonStr: string;
  source: string;
};

export const JsonViewer: FC<JsonViewerProps> = ({ jsonStr, source }) => {
  const {
    settings: { wordWrap },
  } = useStorage();
  const highlightedJson = useMemo(
    () => renderHighlightedJson(jsonStr),
    [jsonStr],
  );

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
        <code>{highlightedJson}</code>
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

    nodes.push(renderJsonToken(match[0], tokenIndex));
    lastIndex = match.index + match[0].length;
    tokenIndex += 1;
  }

  if (lastIndex < json.length) {
    nodes.push(json.slice(lastIndex));
  }

  return nodes;
};

const renderJsonToken = (token: string, key: number): ReactNode => {
  const tokenType = getTokenType(token);

  if (tokenType === "string") {
    const href = getJsonStringUrl(token);

    if (href !== undefined) {
      return (
        <span className="json-token json-token-string" key={key}>
          "
          <a
            className="json-token-link"
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {token.slice(1, -1)}
          </a>
          "
        </span>
      );
    }
  }

  return (
    <span className={`json-token json-token-${tokenType}`} key={key}>
      {token}
    </span>
  );
};

type TokenType = "number" | "key" | "string" | "boolean" | "null";

const getTokenType = (token: string): TokenType => {
  if (token.startsWith('"')) {
    return token.endsWith(":") ? "key" : "string";
  } else if (token === "true" || token === "false") {
    return "boolean";
  } else if (token === "null") {
    return "null";
  }

  return "number";
};
