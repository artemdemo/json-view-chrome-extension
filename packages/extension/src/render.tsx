import type { UserSettings } from '@jview/definitions';
import { JsonViewer, UserSettingsProvider } from '@jview/view';
import { createRoot } from 'react-dom/client';

export function renderJsonViewer(
  jsonStr: string,
  json: unknown,
  source: string,
) {
  document.documentElement.classList.add('json-view-extension-document');

  const root = document.createElement('div');
  root.id = 'json-viewer-react-root';

  document.body.replaceChildren(root);
  createRoot(root).render(
    <UserSettingsProvider>
      <JsonViewer json={json} jsonStr={jsonStr} source={source} />
    </UserSettingsProvider>,
  );
}
