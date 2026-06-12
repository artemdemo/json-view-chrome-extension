import type { UserSettings } from '@jview/definitions';

export type EventTestEnv = {
  settings: UserSettings;
};

export type SendEvent = (event: EventTestEnv) => void;

const EVENT_TEST_ENV = 'event-test-env';

export const sendEvent: SendEvent = (event) => {
  window.dispatchEvent(
    new CustomEvent(EVENT_TEST_ENV, {
      detail: event,
    }),
  );
};

export const listenToTestEvent = (cb: (event: EventTestEnv) => void) => {
  // biome-ignore lint/suspicious/noExplicitAny: `any` is good enough
  const eventHandler = (event: any) => {
    cb(event.detail as EventTestEnv);
  };

  window.addEventListener(EVENT_TEST_ENV, eventHandler);

  return () => {
    window.removeEventListener(EVENT_TEST_ENV, eventHandler);
  };
};
