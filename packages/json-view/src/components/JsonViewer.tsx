import { useStorage } from "@jview/storage";
import clsx from "clsx";
import type { ComponentChild } from "preact";
import { useMemo } from "preact/hooks";
import { JsonToken } from "./JsonToken";
import { Header } from "./Header";
import "./JsonViewer.css";

type JsonViewerProps = {
  jsonStr: string;
  source: string;
};

export const JsonViewer = ({ jsonStr, source }: JsonViewerProps) => {
  const {
    settings: { wordWrap },
  } = useStorage();

  return (
    <main className="json-viewer-root">
      <Header size={useMemo(() => new Blob([source]).size, [source])} />

      <pre
        className={clsx({
          "json-viewer-pre": true,
          "json-viewer-pre--wrap": wordWrap,
        })}
      >
        <code>{useMemo(() => renderHighlightedJson(jsonStr), [jsonStr])}</code>
      </pre>
    </main>
  );
};

const renderHighlightedJson = (json: string): ComponentChild[] => {
  const tokenPattern =
    /("(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;
  const nodes: ComponentChild[] = [];
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
