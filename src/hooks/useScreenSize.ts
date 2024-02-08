import { useCallback, useContext } from "react";
import { ResponsiveContext } from "grommet";

export type ScreenSize = "small" | "medium" | "large" | "xlarge" | "xxlarge";

const screenStrToNum = (size: string) => {
  switch (size) {
    case "small":
      return 1;
    case "medium":
      return 2;
    case "large":
      return 3;
    case "xlarge":
      return 4;
    case "xxlarge":
      return 5;
    default:
      console.error("invalid screen size found: ", size);
      return 0;
  }
};

const screenSizeToNum = (size: ScreenSize): number => screenStrToNum(size) || 0;

export const useScreenSize = () => {
  const currentScreenSize = useContext(ResponsiveContext);
  const currentScreenSizeNum = screenStrToNum(currentScreenSize) || 0;

  const screenSizeGt = useCallback(
    (comparisonSize: ScreenSize) =>
      currentScreenSizeNum > screenSizeToNum(comparisonSize),
    [currentScreenSizeNum]
  );

  const screenSizeLt = useCallback(
    (comparisonSize: ScreenSize) =>
      currentScreenSizeNum < screenSizeToNum(comparisonSize),
    [currentScreenSizeNum]
  );

  const screenSizeEq = useCallback(
    (comparisonSize: ScreenSize) =>
      currentScreenSizeNum === screenSizeToNum(comparisonSize),
    [currentScreenSizeNum]
  );

  const screenSizeNe = useCallback(
    (comparisonSize: ScreenSize) =>
      currentScreenSizeNum !== screenSizeToNum(comparisonSize),
    [currentScreenSizeNum]
  );

  const screenSizeGte = useCallback(
    (comparisonSize: ScreenSize) =>
      currentScreenSizeNum >= screenSizeToNum(comparisonSize),
    [currentScreenSizeNum]
  );

  const screenSizeLte = useCallback(
    (comparisonSize: ScreenSize) =>
      currentScreenSizeNum <= screenSizeToNum(comparisonSize),
    [currentScreenSizeNum]
  );

  const pageGutterWidth = screenSizeLte("small")
    ? "10px"
    : screenSizeLte("medium")
    ? "40px"
    : screenSizeEq("large")
    ? "70px"
    : screenSizeEq("xlarge")
    ? "5vw"
    : "15vw";

  return {
    size: currentScreenSize,
    screenSizeEq,
    screenSizeGt,
    screenSizeGte,
    screenSizeLt,
    screenSizeLte,
    screenSizeNe,
    pageGutterWidth,
  };
};
