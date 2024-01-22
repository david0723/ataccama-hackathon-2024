import { useEffect, useState, useRef } from "react";

/**
 * The usePromise hook is designed to fulfill a promise only once when the component using the hook is first rendered.
 * This is achieved by passing an empty dependency array [] to the useEffect hook,
 * which means the effect (and thus the promise fulfillment) will not be re-run when the component updates.
 **/
export function usePromise<T>(promise: () => Promise<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();

  const promiseRef = useRef(promise);

  useEffect(() => {
    const fulfillPromise = async () => {
      setIsLoading(true);

      const promiseContent = await promiseRef.current();

      setData(promiseContent);
      setIsLoading(false);
    };

    fulfillPromise();
  }, []);

  const reload = () => {
    const fulfillPromise = async () => {
      setIsLoading(true);

      const promiseContent = await promiseRef.current();

      setData(promiseContent);
      setIsLoading(false);
    };

    fulfillPromise();
  };

  return { data, isLoading, reload };
}
