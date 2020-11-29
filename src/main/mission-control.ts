// Utils
import { defaultPosition, defaultDimensions } from "../utils/constants";
import {
  convertInputToArray,
  convertPositionToObject,
  isWithinBoundaries,
} from "../utils/functions";

// Enum
import { ErrorMessages } from "../enums/mars.enum";

// Interfaces
import {
  IPosition,
  IRobotState,
  IControlState,
  IDimensions,
} from "../interfaces/mars.interface";

export default class MissionControl {
  private state: IControlState;

  constructor() {
    this.state = {
      robotPosition: defaultPosition,
      dimensions: defaultDimensions,
      instructions: [],
      finalPositions: [],
    };
  }

  setDimensions = (input: string): void => {
    const regex = /^\d{1,2}?\s\d{1,2}?$/g;
    const { dimensions: currentDimensions } = this.state;
    if (regex.test(input)) {
      const dimensions = convertInputToArray(input, " ");
      this.state.dimensions = {
        x: dimensions?.[0] ? parseInt(dimensions[0], 10) : currentDimensions.x,
        y: dimensions?.[1] ? parseInt(dimensions[1], 10) : currentDimensions.y,
      };
      return;
    }
    throw new Error(ErrorMessages.INVALID_INPUT);
  };

  getDimensions = (): IDimensions => {
    return this.state.dimensions;
  };

  setRobotPosition = (input: string): void => {
    const regex = /^\d{1,2}?\s\d{1,2}\s[NnEeSsWw]$/g;
    const { dimensions } = this.state;
    if (regex.test(input)) {
      const newPosition = convertInputToArray(input, " ");
      const formattedPosition = convertPositionToObject(newPosition);
      if (isWithinBoundaries(formattedPosition, dimensions)) {
        this.state.robotPosition = formattedPosition;
        return;
      }
      throw new Error(ErrorMessages.INVALID_POSITION);
    }
    throw new Error(ErrorMessages.INVALID_POSITION);
  };

  getRobotPosition = (): IPosition => {
    return this.state.robotPosition;
  };

  setInstructions = (instructions: string): void => {
    const regex = /^[RrLlMm]+$/g;
    if (regex.test(instructions)) {
      this.state.instructions = convertInputToArray(instructions);
      return;
    }
    throw new Error(ErrorMessages.INVALID_INSTRUCTIONS);
  };

  getInstructions = (): string[] => {
    return this.state.instructions;
  };

  getRobotInput = (): IRobotState => {
    const {
      dimensions: boundary,
      instructions,
      robotPosition: position,
    } = this.state;
    return {
      boundary,
      instructions,
      position,
    };
  };

  setFinalPositions = (position: IPosition): void => {
    const finalPosition = `${position.x} ${
      position.y
    } ${position.orientation.toUpperCase()}`;
    this.state.finalPositions.push(finalPosition);
  };

  getFinalPositions = (): string[] => {
    return this.state.finalPositions;
  };
}
