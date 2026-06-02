import {
  FC,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { formatBytes, getByteLength, getJsonKind } from '../services/summary';
import { getJsonStringUrl } from '../services/url';
import { useUserSettings } from '../user-settings';

import './JsonViewer.css';

type JsonViewerProps = {
  json: unknown;
  jsonStr: string;
  source: string;
};

export const JsonViewer: FC<JsonViewerProps> = ({
  json,
  jsonStr,
  source,
}) => {
  const { wordWrap } = useUserSettings();
  const copyResetTimeout = useRef<number | undefined>(undefined);
  const highlightedJson = useMemo(
    () => renderHighlightedJson(jsonStr),
    [jsonStr],
  );

  useEffect(() => {
    return () => {
      if (copyResetTimeout.current !== undefined) {
        window.clearTimeout(copyResetTimeout.current);
      }
    };
  }, []);

  return (
    <main className="json-viewer-root" data-json-viewer="true">
      <header className="json-viewer-toolbar">
        <div className="json-viewer-summary">
          <p>
            {getJsonKind(json)} - {formatBytes(getByteLength(source))}
          </p>
        </div>
      </header>

      <pre
        className={
          wordWrap
            ? 'json-viewer-pre json-viewer-pre--wrap'
            : 'json-viewer-pre'
        }
      >
        <code>{highlightedJson}</code>
      </pre>
    </main>
  );
}

function renderHighlightedJson(json: string): ReactNode[] {
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
}

function renderJsonToken(token: string, key: number): ReactNode {
  let tokenType = 'number';

  if (token.startsWith('"')) {
    tokenType = token.endsWith(':') ? 'key' : 'string';
  } else if (token === 'true' || token === 'false') {
    tokenType = 'boolean';
  } else if (token === 'null') {
    tokenType = 'null';
  }

  if (tokenType === 'string') {
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
}
