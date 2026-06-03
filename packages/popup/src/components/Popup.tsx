import { saveUserSettings, useStorage } from '@jview/storage';
import { type ChangeEvent } from 'react';
import './Popup.css';

export function Popup() {
  const userSettings = useStorage();

  const handleWordWrapChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextWordWrap = event.target.checked;

    void saveUserSettings({
      ...userSettings,
      wordWrap: nextWordWrap,
    });
  };

  return (
    <main className="popup">
      <h1>JSON View</h1>
      <p>Active on browser documents served as application/json.</p>
      <label className="popup-option">
        <span>Word Wrap</span>
        <input
          checked={userSettings.wordWrap}
          onChange={handleWordWrapChange}
          type="checkbox"
        />
      </label>
    </main>
  );
}
