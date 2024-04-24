import { useRef, useEffect } from 'react';

export default function useDocumentTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const cleanupFunction = () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    };

    return cleanupFunction;
  }, [prevailOnUnmount]);

}
