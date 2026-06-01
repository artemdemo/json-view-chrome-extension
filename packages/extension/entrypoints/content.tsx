import '../styles/content.css';
import {renderJsonViewer} from '../src/jview';

const JSON_MIME_TYPE = 'application/json';

export default defineContentScript({
  matches: ['http://*/*', 'https://*/*'],
  runAt: 'document_idle',
  main() {
    prettifyJsonDocument();
  },
});

function prettifyJsonDocument() {
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
  } catch {
    // The server advertised JSON, but the body is not parseable. Leave it alone.
  }
}

function normalizeMimeType(contentType: string): string {
  return contentType.split(';', 1)[0].trim().toLowerCase();
}

function getDocumentText(doc: Document): string {
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



