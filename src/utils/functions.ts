// Enums
import { Commands, ErrorMessages } from "../enums/mars.enum";

// Interfaces
import { IPosition, IDimensions } from "../interfaces/mars.interface";

import { orientations, defaultPosition } from "./constants";

export function convertInputToArray(
  input: string,
  separator: string = ""
): string[] {
  const regex = /^[\w\s]+$/g;
  if (regex.test(input)) {
    return input
      .trim()
      .replace(/^\s+|\s+$/g, "")
      .split(separator);
  }
  throw new Error(ErrorMessages.INVALID_INPUT);
}

export function convertPositionToObject(value: string[] = []): IPosition {
  return {
    x: value?.[0] ? parseInt(value[0], 10) : defaultPosition.x,
    y: value?.[1] ? parseInt(value[1], 10) : defaultPosition.y,
    orientation: value?.[2] ? value[2] : defaultPosition.orientation,
  };
}

export function isWithinBoundaries(
  position: IPosition,
  dimensions: IDimensions
): boolean {
  const currentIndex: number = orientations.indexOf(position.orientation);
  if (
    position.x <= dimensions.x &&
    position.y <= dimensions.y &&
    position.x >= 0 &&
    position.y >= 0 &&
    (currentIndex >= 0 || currentIndex <= 3)
  ) {
    return true;
  }
  throw new Error(ErrorMessages.INVALID_POSITION);
}

export function getNextOrientation(direction: string, orientation: string) {
  if (direction.toUpperCase() !== Commands.M) {
    const currentIndex = orientations.indexOf(orientation);
    const index =
      direction.toUpperCase() === Commands.R
        ? currentIndex + 1
        : currentIndex - 1;
    if (index < 0 || index > 3) {
      return index < 0 ? orientations[3] : orientations[0];
    }
    return orientations[index];
  }
  return orientation;
}
