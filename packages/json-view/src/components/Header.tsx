import { useMemo, type FC } from "react";
import "./Header.css";

type HeaderProps = {
  size: number;
};

export const Header: FC<HeaderProps> = ({ size }) => {
  return (
    <header className="json-viewer-toolbar">
      <div className="json-viewer-summary">
        <p>{useMemo(() => formatBytes(size), [size])}</p>
      </div>
    </header>
  );
};

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(size >= 10 ? 1 : 2)} ${units[unitIndex]}`;
};
