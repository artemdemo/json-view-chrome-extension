import { renderJsonViewer } from './render';

const JSON_MIME_TYPE = 'application/json';

export const prettifyJsonDocument = () => {
  if (normalizeMimeType(document.contentType) !== JSON_MIME_TYPE) {
    return;
  }

  const source = getDocumentText(document);
  if (source.trim() === '') {
    return;
  }

  try {
    const json = JSON.parse(source) as unknown;
    const prettyJson = JSON.stringify(json, null, 2);

    renderJsonViewer(prettyJson, json, source);
  } catch (e) {
    console.error(`Can't parse provided JSON`);
    console.error(e);
  }
}

const normalizeMimeType = (contentType: string): string => {
  return contentType.split(';', 1)[0].trim().toLowerCase();
}

const getDocumentText = (doc: Document): string => {
  const { body } = doc;
  if (!body) {
    return '';
  }

  const onlyChild = body.children.length === 1 ? body.firstElementChild : null;
  if (onlyChild?.tagName === 'PRE') {
    return onlyChild.textContent ?? '';
  }

  return body.textContent ?? '';
}
