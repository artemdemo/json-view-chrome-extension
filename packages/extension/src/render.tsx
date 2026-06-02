import { JsonViewer } from '@jview/view';
import { createRoot } from 'react-dom/client';
import { type JsonViewerOptions } from './options';
import { UserSettings } from './UserSettings';

export function renderJsonViewer(
  jsonStr: string,
  json: unknown,
  source: string,
  initialOptions: JsonViewerOptions,
) {
  document.documentElement.classList.add('json-view-extension-document');

  const root = document.createElement('div');
  root.id = 'json-viewer-react-root';

  document.body.replaceChildren(root);
  createRoot(root).render(
    <UserSettings initialSettings={initialOptions}>
      <JsonViewer json={json} jsonStr={jsonStr} source={source} />
    </UserSettings>,
  );
}
