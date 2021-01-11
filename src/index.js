// Obfuscated solution for https://adventofcode.com/2019/day/2
// (C)opyright 2021 Andrew Rondeau

const heap = JSON.parse(`[${process.argv[2]}]`);

var instructionPointer = -1;

// Performs an operand on the heap
const operate = (operation) => {

    const a = heap[heap[++instructionPointer]];
    const b = heap[heap[++instructionPointer]];

    heap[heap[++instructionPointer]] = operation(a, b);
};

while (true) {
    var opCode = heap[++instructionPointer];

    // Note that I'm just letting array bounds issues fall through as exceptions
    // In industrial-strength code, I'd be much more careful about bounds checking, and
    // give more detailed errors

    switch (opCode) {
        case 1:
            operate((a, b) => a + b);
            break;

        case 2:
            operate((a, b) => a * b);
            break;

        case 99:
            const resultJSON = JSON.stringify(heap);
            const resultString = resultJSON.substring(1, resultJSON.length - 1);
            console.log(resultString);
            
            return;

        default:
            throw `Unexpected opCode at ${instructionPointer}: ${opCode}`;
    } 
}
