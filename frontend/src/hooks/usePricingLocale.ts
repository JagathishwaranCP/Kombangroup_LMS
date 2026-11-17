import { useEffect, useState } from "react";
import { detectIsIndia, formatCoursePrice } from "../utils/pricing";

export const usePricingLocale = () => {
  const [isIndia, setIsIndia] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    detectIsIndia()
      .then((result) => {
        if (!cancelled) {
          setIsIndia(result);
          setReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsIndia(true);
          setReady(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    isIndia,
    ready,
    formatPrice: (inr: number) => formatCoursePrice(inr, isIndia),
  };
};
