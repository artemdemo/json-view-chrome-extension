import { useEffect, useState, type ChangeEvent } from 'react';
import {
  DEFAULT_JSON_VIEWER_OPTIONS,
  getJsonViewerOptions,
  setWordWrapOption,
} from '@/src/options';
import './App.css';

function App() {
  const [wordWrap, setWordWrap] = useState(
    DEFAULT_JSON_VIEWER_OPTIONS.wordWrap,
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    void getJsonViewerOptions().then((options) => {
      if (!isMounted) {
        return;
      }

      setWordWrap(options.wordWrap);
      setIsLoaded(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleWordWrapChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextWordWrap = event.target.checked;

    setWordWrap(nextWordWrap);
    void setWordWrapOption(nextWordWrap);
  };

  return (
    <main className="popup">
      <h1>JSON View</h1>
      <p>Active on browser documents served as application/json.</p>
      <label className="popup-option">
        <span>Word Wrap</span>
        <input
          checked={wordWrap}
          disabled={!isLoaded}
          onChange={handleWordWrapChange}
          type="checkbox"
        />
      </label>
    </main>
  );
}

export default App;
