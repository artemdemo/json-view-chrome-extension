import { useStorage } from "@jview/storage";
import { useEffect } from "preact/hooks";
import { listenToTestEvent, sendEvent, type SendEvent } from "./test-events";

declare global {
  interface Window {
    __sendEvent: SendEvent | undefined;
  }
}

export const TestBridge = () => {
  const { saveUserSettings } = useStorage();

  useEffect(() => {
    window.__sendEvent = window.__sendEvent || sendEvent;

    const unsubListenToEvent = listenToTestEvent((event) => {
      saveUserSettings(event.settings);
    });

    return () => {
      unsubListenToEvent();
      window.__sendEvent = undefined;
    };
  }, [saveUserSettings]);

  return null;
};
