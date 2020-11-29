// Utils
import { getNextOrientation } from "../utils/functions";

// Enums
import { Orientations, Commands, ErrorMessages } from "../enums/mars.enum";

// Interfaces
import { IRobotState } from "../interfaces/mars.interface";

export default class Robot {
  private state: IRobotState;

  constructor(state: IRobotState) {
    this.state = state;
  }

  getPosition = () => {
    return this.state.position;
  };

  getInstructions = () => {
    return this.state.instructions;
  };

  getBoundary = () => {
    return this.state.boundary;
  };

  move = () => {
    const { position, instructions } = this.state;
    if (!instructions?.length)
      throw new Error(ErrorMessages.INVALID_INSTRUCTIONS);

    instructions.forEach((command) => {
      if (command === Commands.R || command === Commands.L) {
        const nextOrientation = getNextOrientation(
          command.toUpperCase(),
          position.orientation
        );
        if (nextOrientation) {
          this.state.position.orientation = nextOrientation;
        }
      } else if (command === Commands.M) {
        this.moveForward(position.orientation);
      } else {
        throw new Error(ErrorMessages.INVALID_MOVE);
      }
    });
    return this;
  };

  /*getNextOrientation = (direction: string, orientation: string) => {
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
  };*/

  moveForward = (orientation: string) => {
    switch (orientation.toUpperCase()) {
      case Orientations.N:
        this.state.position.y += 1;
        return;
      case Orientations.S:
        this.state.position.y -= 1;
        return;
      case Orientations.E:
        this.state.position.x += 1;
        return;
      case Orientations.W:
        this.state.position.x -= 1;
        return;
      default:
        return;
    }
  };

}
