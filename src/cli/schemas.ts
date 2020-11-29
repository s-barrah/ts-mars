const colors = require('colors/safe');

type PromptSchema = {
  properties: {
    [index: string]: {
      description: string;
      pattern: RegExp;
      message: string;
      required: boolean;
    };
  };
};

export const dimensionsSchema: PromptSchema = {
  properties: {
    dimensions: {
      description: colors.yellow.underline('Please enter plateau dimensions'),
      pattern: /^\d{1,2}?\s\d{1,2}?$/g,
      message: 'Please enter a pair of integers separated by a space',
      required: true,
    },
  },
};

export const robotPositionSchema: PromptSchema = {
  properties: {
    robotPosition: {
      description: colors.yellow.underline('Please, enter robot position'),
      pattern: /^\d{1,2}?\s\d{1,2}\s[NnEeSsWw]$/g,
      message:
        'Position must be a pair of integers and an orientation (N, S, E, W) separated by a space',
      required: true,
    },
  },
};

export const robotInstructionsSchema: PromptSchema = {
  properties: {
    robotInstructions: {
      description: colors.yellow.underline('Please enter robot instructions'),
      pattern: /^[RrLlMm]+$/g,
      message: 'Instructions is a string of the letters “L”, “R”, and “M”',
      required: true,
    },
  },
};

export const deployAnotherRobotSchema: PromptSchema = {
  properties: {
    anotherRobot: {
      description: colors.yellow.underline(
        'Do you want to deploy another robot (Y)es or (N)'
      ),
      pattern: /^(?:[Yy]|[Nn])$/,
      message: 'Answer is Y or N',
      required: true,
    },
  },
};
