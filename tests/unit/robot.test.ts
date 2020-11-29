import chai from 'chai';

import MissionControl from '../../src/main/mission-control';
import Robot from '../../src/main/robot';

import { ErrorMessages } from "../../src/enums/mars.enum";

const expect = chai.expect;

describe('Robots Class', () => {

    describe('Ensure initial state', () => {
        const defaultPosition = {
            x: 0,
            y: 0,
            orientation: 'N',
        }
        const defaultBoundary = { x: 0, y: 0 };
        const defaultInput = {
            boundary: defaultBoundary,
            instructions: [],
            position: defaultPosition,
        };
        const robot = new Robot(defaultInput);
        it('should return a class instance ', () => {
            expect(robot).to.be.an.instanceof(Robot);
        });
        it('should return the default boundaries', () => {
            expect(robot.getBoundary()).to.be.eql(defaultBoundary);
        });

        it('should return the default instructions', () => {
            expect(robot.getInstructions().length === 0).to.be.eql(true);
        });

        it('should return the default current position', () => {
            expect(robot.getPosition()).to.be.eql(defaultPosition);
        });
    });

    describe('Ensure valid setting and getting', () => {
        const missionControl = new MissionControl();
        missionControl.setDimensions('5 5');
        missionControl.setRobotPosition('3 3 E');
        missionControl.setInstructions('LMLMLMLMM');

        const input = missionControl.getRobotInput();
        const robot = new Robot(input);

        it('should get the Robot\'s boundary', () => {
            expect(robot.getBoundary()).to.be.eql(input.boundary);
        });

        it('should get the Robot\'s instructions', () => {
            expect(robot.getInstructions()).to.be.eql(input.instructions);
        });

        it('should get the Robot\'s current position', () => {
            expect(robot.getPosition()).to.be.eql(input.position);
        });

    });


    describe('Ensure Robot can move', () => {
        const missionControl = new MissionControl();
        missionControl.setDimensions('5 5');

        it('should move First Robot with given inputs', () => {
            const initialPosition = '1 2 N';
            const instructions = 'LMLMLMLMM';
            const expectedPosition = '1 3 N';
            missionControl.setRobotPosition(initialPosition);
            missionControl.setInstructions(instructions);

            const input = missionControl.getRobotInput();
            const robotOne = new Robot(input);

            robotOne.move();
            missionControl.setFinalPositions(robotOne.getPosition());

            const finalPositions = missionControl.getFinalPositions();
            expect(finalPositions[0]).to.be.eql(expectedPosition);
        });

        it('should move Second Robot with given inputs', () => {
            const initialPosition = '3 3 E';
            const instructions = 'MMRMMRMRRM';
            const expectedPosition = '5 1 E';

            missionControl.setRobotPosition(initialPosition);
            missionControl.setInstructions(instructions);

            const input = missionControl.getRobotInput();
            const robotTwo = new Robot(input);

            robotTwo.move();
            missionControl.setFinalPositions(robotTwo.getPosition());

            const finalPositions = missionControl.getFinalPositions();

            expect(finalPositions.length === 2).to.be.eql(true);
            expect(finalPositions[1]).to.be.eql(expectedPosition);
        });
    })

    describe('Ensure validation of inputs', () => {
        const missionControl = new MissionControl();
        missionControl.setDimensions('5 5');

        it('should throw an error if no instructions are set', () => {
            const initialPosition = '3 3 E';
            missionControl.setRobotPosition(initialPosition);
            const input = missionControl.getRobotInput();

            expect(() => new Robot(input).move()).to.throw(ErrorMessages.INVALID_INSTRUCTIONS);
        });

        it('should throw an error if move is not possible', () => {
            const initialPosition = '1 4 S';
            missionControl.setRobotPosition(initialPosition);
            missionControl.setInstructions('RRMRRMRMMR');
            const input = missionControl.getRobotInput();

            expect(() => new Robot(input).move()).to.throw(ErrorMessages.INVALID_POSITION);
        });

    })

})
