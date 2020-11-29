import chai from 'chai';

import {
    isWithinBoundaries,
    convertInputToArray,
    convertPositionToObject,
    getNextOrientation
} from '../../src/utils/functions';

import { ErrorMessages } from "../../src/enums/mars.enum";


const expect = chai.expect;

describe('Utility Functions', () => {

    describe('convertInputToArray function', () => {
        it('should return an array when input is a valid string', () => {
            expect(convertInputToArray('thisisatest').length).to.be.eql(11);
        });

        it('should throw an error message if input is not a alphanumeric', () => {
            expect(() => convertInputToArray('@-+=£33')).to.throw(ErrorMessages.INVALID_INPUT);
        });
    });

    describe('convertPositionToObject function', () => {
        it('should return an object when input is an array', () => {
            expect(convertPositionToObject(['1', '3', 'N'])).to.be.eql({x: 1, y: 3, orientation: 'N'});
        });
    });


    describe('isWithinBoundaries function', () => {
        it('should return true if position is valid', () => {
            expect(isWithinBoundaries({ x: 0, y: 0, orientation: 'N'}, { x: 0, y: 0} )).to.be.eql(true);
        });

        it('should throw an error if position is invalid', () => {
            expect(() => isWithinBoundaries({ x: 2, y: 2, orientation: 'N'}, { x: 0, y: 0} )).to.throw(ErrorMessages.INVALID_POSITION);
        });
    });

    describe('getNextOrientation function', () => {
        it('should get Robots next orientation when facing North and turns right', () => {
            expect(getNextOrientation('R', 'N')).to.be.eql('E');
        });

        it('should get Robots next orientation when facing North and turning left', () => {
            expect(getNextOrientation('L', 'N')).to.be.eql('W');
        });

        it('should get Robots next orientation when facing North and moves forward', () => {
            expect(getNextOrientation('M', 'N')).to.be.eql('N');
        });

        it('should get Robots next orientation when facing East and turns right', () => {
            expect(getNextOrientation('R', 'E')).to.be.eql('S');
        });

        it('should get Robots next orientation when facing East and turning left', () => {
            expect(getNextOrientation('L', 'E')).to.be.eql('N');
        });

        it('should get Robots next orientation when facing East and moves forward', () => {
            expect(getNextOrientation('M', 'E')).to.be.eql('E');
        });

        it('should get Robots next orientation when facing South and turns right', () => {
            expect(getNextOrientation('R', 'S')).to.be.eql('W');
        });

        it('should get Robots next orientation when facing South and turning left', () => {
            expect(getNextOrientation('L', 'S')).to.be.eql('E');
        });

        it('should get Robots next orientation when facing South and moves forward', () => {
            expect(getNextOrientation('M', 'S')).to.be.eql('S');
        });

        it('should get Robots next orientation when facing West and turns right', () => {
            expect(getNextOrientation('R', 'W')).to.be.eql('N');
        });

        it('should get Robots next orientation when facing West and turning left', () => {
            expect(getNextOrientation('L', 'W')).to.be.eql('S');
        });

        it('should get Robots next orientation when facing West and moves forward', () => {
            expect(getNextOrientation('M', 'W')).to.be.eql('W');
        });

    });
});



