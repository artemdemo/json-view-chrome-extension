import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactNode,
} from 'react';

import { createRoot } from 'react-dom/client';

const COPY_RESET_DELAY_MS = 1_500;

type CopyState = 'idle' | 'copied' | 'failed';

function JsonViewer({ json, prettyJson, source }: JsonViewerProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const copyResetTimeout = useRef<number | undefined>(undefined);
  const highlightedJson = useMemo(
    () => renderHighlightedJson(prettyJson),
    [prettyJson],
  );

  useEffect(() => {
    return () => {
      if (copyResetTimeout.current !== undefined) {
        window.clearTimeout(copyResetTimeout.current);
      }
    };
  }, []);

  const showCopyState = (nextCopyState: CopyState) => {
    setCopyState(nextCopyState);

    if (copyResetTimeout.current !== undefined) {
      window.clearTimeout(copyResetTimeout.current);
    }

    copyResetTimeout.current = window.setTimeout(() => {
      setCopyState('idle');
    }, COPY_RESET_DELAY_MS);
  };

  const handleCopy: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      await navigator.clipboard.writeText(prettyJson);
      showCopyState('copied');
    } catch {
      showCopyState(fallbackCopy(prettyJson) ? 'copied' : 'failed');
    }
  };

  const copyLabel =
    copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Failed' : 'Copy';

  return (
    <main className="json-viewer-root" data-json-viewer="true">
      <header className="json-viewer-toolbar">
        <div className="json-viewer-summary">
          <h1>JSON</h1>
          <p>
            {getJsonKind(json)} - {formatBytes(getByteLength(source))}
          </p>
        </div>

        <button className="json-viewer-copy" type="button" onClick={handleCopy}>
          {copyLabel}
        </button>
      </header>

      <pre className="json-viewer-pre">
        <code>{highlightedJson}</code>
      </pre>
    </main>
  );
}


type JsonViewerProps = {
  json: unknown;
  prettyJson: string;
  source: string;
};



function getJsonKind(value: unknown): string {
  if (Array.isArray(value)) {
    return `array (${value.length})`;
  }

  if (value !== null && typeof value === 'object') {
    return `object (${Object.keys(value).length})`;
  }

  return value === null ? 'null' : typeof value;
}

function getByteLength(value: string): number {
  return new Blob([value]).size;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ['KB', 'MB', 'GB'];
  let size = bytes / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 ? 1 : 2)} ${units[unitIndex]}`;
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

function getJsonStringUrl(token: string): string | undefined {
  try {
    const value = JSON.parse(token) as unknown;

    if (typeof value !== 'string') {
      return undefined;
    }

    return isHttpUrl(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function fallbackCopy(value: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', 'true');
  textarea.className = 'json-viewer-copy-buffer';

  document.body.append(textarea);
  textarea.select();

  try {
    return document.execCommand('copy');
  } finally {
    textarea.remove();
  }
}

export function renderJsonViewer(prettyJson: string, json: unknown, source: string) {
  document.documentElement.classList.add('json-view-extension-document');

  const root = document.createElement('div');
  root.id = 'json-viewer-react-root';

  document.body.replaceChildren(root);
  createRoot(root).render(
    <JsonViewer json={json} prettyJson={prettyJson} source={source} />,
  );
}