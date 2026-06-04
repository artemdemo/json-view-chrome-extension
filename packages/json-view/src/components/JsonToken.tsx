import { FC } from "react";
import { getJsonStringUrl } from "../services/url";
import "./JsonToken.css";

type JsonTokenProps = {
  token: string;
};

export const JsonToken: FC<JsonTokenProps> = ({ token }) => {
  const tokenType = getTokenType(token);

  if (tokenType === "string") {
    const href = getJsonStringUrl(token);

    if (href !== undefined) {
      return (
        <span className="json-token json-token-string">
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

  return <span className={`json-token json-token-${tokenType}`}>{token}</span>;
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
