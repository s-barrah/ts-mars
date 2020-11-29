import chai from 'chai';

import MissionControl from '../../src/main/mission-control';
import { ErrorMessages } from "../../src/enums/mars.enum";

const expect = chai.expect;

describe('Mission Control Class', () => {

    describe('Ensure initial state', () => {
        const missionControl = new MissionControl();

        const defaultPosition = {
            x: 0,
            y: 0,
            orientation: 'N',
        }
        it('should return a class instance ', () => {
            expect(missionControl).to.be.an.instanceof(MissionControl);
        });

        it('should have the default plateau dimensions', () => {
            expect(missionControl.getDimensions()).to.be.eql({x: 0, y: 0});
        });

        it('should have default robot position', () => {
            expect(missionControl.getRobotPosition()).to.be.eql(defaultPosition);
        });

        it('should have an empty array of instructions', () => {
            expect(missionControl.getInstructions().length === 0).to.be.eql(true);
        });


        it('should have an empty array of final positions', () => {
            expect(missionControl.getFinalPositions().length === 0).to.be.eql(true);
        });
    });

    describe('Ensure Getting and Setting state', () => {

        const missionControl = new MissionControl();

        it('should set and get the plateau coordinates', () => {
            missionControl.setDimensions('5 5');
            expect(missionControl.getDimensions()).to.be.eql({x: 5, y: 5});
        });

        it('should set and get the position', () => {
            missionControl.setRobotPosition('3 3 E');
            expect(missionControl.getRobotPosition()).to.be.eql({
                x: 3,
                y: 3,
                orientation: 'E'
            });
        });

        it('should set and get the formatted instructions', () => {
            const instructions = 'LMLMLMLMM';
            missionControl.setInstructions(instructions);
            expect(missionControl.getInstructions().length).to.be.eql(instructions.length);
        });

        it('should set and get the final positions', () => {
            const position = {
                x: 1,
                y: 3,
                orientation: 'N',
            }
            missionControl.setFinalPositions(position);
            expect(missionControl.getFinalPositions().length).to.be.eql(1);
        });

    });

    describe('Ensure validation of inputs', () => {
        const missionControl = new MissionControl();

        it('should return an error message if dimensions are invalid', () => {
            expect(() => new MissionControl().setDimensions('test')).to.throw(ErrorMessages.INVALID_INPUT);
        });

        it('should return an error message if instructions are invalid', () => {
            expect(() => new MissionControl().setInstructions('test')).to.throw(ErrorMessages.INVALID_INSTRUCTIONS);
        });

        it('should return an error message if robot position is invalid', () => {
            expect(() => new MissionControl().setRobotPosition('test')).to.throw(ErrorMessages.INVALID_POSITION);
        });

    })

})
