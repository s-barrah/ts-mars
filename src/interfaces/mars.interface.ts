export interface IDimensions {
  x: number;
  y: number;
}

export interface IPosition extends IDimensions {
  orientation: string;
}

export interface IRobotState {
  position: IPosition;
  boundary: IDimensions;
  instructions: string[];
}
export interface IControlState {
  robotPosition: IPosition;
  dimensions: IDimensions;
  instructions: string[];
  finalPositions: string[];
}
