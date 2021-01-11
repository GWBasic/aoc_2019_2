// Solution for https://adventofcode.com/2019/day/2
// (C)opyright 2021 Andrew Rondeau

// Opcodes:
const ADD = 1;
const MULTIPLY = 2;
const END = 99;

const argv = process.argv;

if (argv.length != 3) {
    console.log('Please provide the input as a command-line argument. See https://adventofcode.com/2019/day/2');
    return;
}

// A comma-separated list of numbers easily converts to JSON. I'm going to do minimal input checking and rely on
// JSON errors
const inputString = argv[2];
const inputJson = `[${inputString}]`;

var heap;
try {
    heap = JSON.parse(inputJson);
} catch (error) {
    console.error(`Can not parse input: "${inputString}": ${error}`);
    console.error(`(Attempted to convert to JSON as "${inputJson}")`);
    return;
}

var instructionPointer = 0;

// Performs an operand on the heap
const operate = (operation) => {
    const aAddress = heap[instructionPointer + 1];
    const bAddress = heap[instructionPointer + 2];
    const destinationAddress = heap[instructionPointer + 3];

    // It's undefined when these values are out of the range of the heap
    // For now I'm just letting the Javascript exception bubble out
    const a = heap[aAddress];
    const b = heap[bAddress];

    // It's undefined what happens when destinationAddress is out of range
    // For now I'm just going to let the heap grow if an address is out of range
    // (or negative)

    result = operation(a, b);
    heap[destinationAddress] = result;

    instructionPointer += 4;
};

var running = true;

try {
    while (running) {
        var opCode = heap[instructionPointer];

        // Note that I'm just letting array bounds issues fall through as exceptions
        // In industrial-strength code, I'd be much more careful about bounds checking, and
        // give more detailed errors

        switch (opCode) {
            case ADD:
                operate((a, b) => a + b);
                break;

            case MULTIPLY:
                operate((a, b) => a * b);
                break;

            case END:
                running = false;
                break;

            default:
                console.error(`Unexpected opCode at ${instructionPointer}: ${opCode}`);
                running = false;

                break;
        } 
    }
} catch (error) {
    console.error(`Error running the program: ${error}`);
    return;
}

// Success, program complete
const resultJSON = JSON.stringify(heap);
// Get rid of [...]
const resultString = resultJSON.substring(1, resultJSON.length - 1);
console.log(resultString);