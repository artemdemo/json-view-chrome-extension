import { prettifyJsonDocument } from '@/src/prettify';

export default defineContentScript({
  matches: ['http://*/*', 'https://*/*'],
  runAt: 'document_idle',
  main() {
    prettifyJsonDocument();
  },
});





