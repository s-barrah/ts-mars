// Utils
import { getNextOrientation, isWithinBoundaries } from "../utils/functions";

// Enums
import { Orientations, Commands, ErrorMessages } from "../enums/mars.enum";

// Interfaces
import {
  IRobotState,
  IPosition,
  IDimensions,
} from "../interfaces/mars.interface";

export default class Robot {
  private state: IRobotState;

  constructor(state: IRobotState) {
    this.state = state;
  }

  getPosition = (): IPosition => {
    return this.state.position;
  };

  getInstructions = (): string[] => {
    return this.state.instructions;
  };

  getBoundary = (): IDimensions => {
    return this.state.boundary;
  };

  move = (): void => {
    const { boundary, instructions } = this.state;
    if (!instructions?.length)
      throw new Error(ErrorMessages.INVALID_INSTRUCTIONS);

    instructions.forEach((command) => {
      const isInBounds = isWithinBoundaries(this.state.position, boundary);

      if (command === Commands.R || command === Commands.L) {
        const nextOrientation = getNextOrientation(
          command.toUpperCase(),
          this.state.position.orientation
        );
        if (nextOrientation) {
          this.state.position.orientation = nextOrientation;
        }
      } else if (command === Commands.M && isInBounds) {
        this.moveForward(this.state.position.orientation);
      } else {
        throw new Error(ErrorMessages.INVALID_MOVE);
      }
    });
  };

  moveForward = (orientation: string): void => {
    switch (orientation.toUpperCase()) {
      case Orientations.N:
        this.state.position.y += 1;
        break;
      case Orientations.S:
        this.state.position.y -= 1;
        break;
      case Orientations.E:
        this.state.position.x += 1;
        break;
      case Orientations.W:
        this.state.position.x -= 1;
        break;
      default:
    }
  };
}
