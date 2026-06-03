import { type ChangeEvent } from 'react';
import { useUserSettings } from '@jview/view';
import { saveUserSettings } from '@jview/storage';
import './App.css';

function App() {
  const userSettings = useUserSettings();

  const handleWordWrapChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextWordWrap = event.target.checked;

    void saveUserSettings({
      ...userSettings,
      ...{
        wordWrap: nextWordWrap,
      },
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

export default App;
