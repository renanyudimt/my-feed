import { useEffect, useRef } from 'react';

type InfiniteScrollCallback = () => void;

const useInfiniteScroll = (callback: InfiniteScrollCallback) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!loaderRef.current) return;

    if (observerRef.current) observerRef.current.disconnect();

    const options = {
      root: null,
      rootMargin: `0px`,
      threshold: 0.25,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callback();
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, options);
    observerRef.current.observe(loaderRef.current);

    // eslint-disable-next-line consistent-return
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [callback]);

  return loaderRef;
};

export default useInfiniteScroll;
