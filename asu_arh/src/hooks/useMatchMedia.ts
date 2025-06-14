import { useLayoutEffect, useState } from "react";

interface IMedia {
  isSmallMobile: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isSmallDisplay: boolean;
  isNotFullHd: boolean;
  isFullHd: boolean;
  isTwoK: boolean;
}

const resolutions: string[] = [
  "(min-width: 325px) and (max-width: 390px)",
  "(min-width: 391px) and (max-width: 480px)",
  "(min-width: 481px) and (max-width: 768px)",
  "(min-width: 769px) and (max-width: 1024px)",
  "(min-width: 1025px) and (max-width: 1200px)",
  "(min-width: 1201px) and (max-width: 1924px)",
  "(min-width: 1925px)",
];

const medias = () => resolutions.map((item) => matchMedia(item));

function useMatchMedia(): IMedia {
  const [values, setValues] = useState<boolean[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const getValues = () => medias().map((item) => item.matches);

  const handle = () => setValues(getValues());

  useLayoutEffect(() => {
    if (document.readyState === "complete" && !isLoad) {
      handle();
      setIsLoad(true);
    }
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("load", handle);
    window.addEventListener("resize", handle);

    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("load", handle);
    };
  });

  return [
    "isSmallMobile",
    "isMobile",
    "isTablet",
    "isSmallDisplay",
    "isNotFullHd",
    "isFullHd",
    "isTwoK",
  ].reduce(
    (acc, screen, index) => ({
      ...acc,
      [screen]: values[index],
    }),
    {} as IMedia,
  );
}

export default useMatchMedia;
