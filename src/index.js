// Obfuscated solution for https://adventofcode.com/2019/day/2
// (C)opyright 2021 Andrew Rondeau

const heap = JSON.parse(`[${process.argv[2]}]`);

var instructionPointer = -1;

// Performs an operand on the heap
function operate(operation) {

    const a = heap[heap[++instructionPointer]];
    const b = heap[heap[++instructionPointer]];

    heap[heap[++instructionPointer]] = operation(a, b);

    next();
}

const _ = null;
const opCodes = [
    _,
    () => operate((a, b) => a + b),
    () => operate((a, b) => a * b),
    _,_,_,_,_,_,_,
    _,_,_,_,_,_,_,_,_,_,
    _,_,_,_,_,_,_,_,_,_,
    _,_,_,_,_,_,_,_,_,_,
    _,_,_,_,_,_,_,_,_,_,
    _,_,_,_,_,_,_,_,_,_,
    _,_,_,_,_,_,_,_,_,_,
    _,_,_,_,_,_,_,_,_,_,
    _,_,_,_,_,_,_,_,_,_,
    _,_,_,_,_,_,_,_,_,
    () => console.log(JSON.stringify(heap).replace('[', '').replace(']', '')),
]

function next() {
    var opCode = heap[++instructionPointer];
    opCodes[opCode]();
}

next();
