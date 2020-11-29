// @ts-ignore
import prompt from 'prompt';

import MissionControl from '../main/mission-control';
import Robot from '../main/robot';

import {
  dimensionsSchema,
  robotPositionSchema,
  robotInstructionsSchema,
  deployAnotherRobotSchema,
} from './schemas';

const colors = require('colors/safe');

const mission = new MissionControl();

prompt.start();
prompt.message = colors.yellow('Welcome to Mars Mission Control');
prompt.delimiter = colors.yellow('|> ');

type Result = { [index: string]: string };

function start() {
  getGridDimensions();
}

function getGridDimensions() {
  prompt.get(dimensionsSchema, (error = null, result: Result) => {
    if (result) {
      mission.setDimensions(result.dimensions);
    }
    getRobotPosition();
  });
}

function getRobotPosition() {
  prompt.get(robotPositionSchema, (error = null, result: Result) => {
    if (result) {
      mission.setRobotPosition(result.robotPosition);
    }
    getRobotInstructions();
  });
}

function getRobotInstructions() {
  prompt.get(robotInstructionsSchema, (error = null, result: Result) => {
    if (result) {
      mission.setInstructions(result.robotInstructions);
      const robot = new Robot(mission.getRobotInput());
      robot.move();
      mission.setFinalPositions(robot.getPosition());
    }
    getAnotherRobot();
  });
}

function getAnotherRobot() {
  prompt.get(deployAnotherRobotSchema, (error = null, result: Result) => {
    if (result) {
      if (result.anotherRobot.toLowerCase() === 'y') {
        getRobotPosition();
      } else {
        exit();
      }
    }
  });
}

function exit() {
  const positions = mission.getFinalPositions();
  console.log(colors.green.underline('Final Positions|> '));

  positions.forEach((position, index) => {
    const robotNumber = index + 1;
    console.log(
      colors.green(`Robot ${robotNumber} --- `) +
        colors.yellow.underline(`${position}`)
    );
  });
  console.log(
    colors.green('Mission Control|> ') + colors.yellow.underline('Over and Out')
  );
}

start();
