import { useEffect } from 'react';

function useBrowserTabText(text) {
  useEffect(() => {
    document.title = text;
  }, [text]);
}

export default useBrowserTabText;
