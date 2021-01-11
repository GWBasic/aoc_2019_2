// Obfuscated solution for https://adventofcode.com/2019/day/2
// (C)opyright 2021 Andrew Rondeau

var instructionPointer = -1;

function operate(operation) {

    const a = heap[heap[++instructionPointer]];
    const b = heap[heap[++instructionPointer]];

    heap[heap[++instructionPointer]] = operation(a, b);

    next();
}

let parse = JSON.parse;
let stringify = JSON.stringify;
let replace = (string, searchValue, replaceValue) => string.replace(searchValue, replaceValue);

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
    () => console.log(replace(replace(stringify(heap), '[', ''), ']', '')),
]

function next() {
    var opCode = heap[++instructionPointer];
    opCodes[opCode]();
}

const heap = parse(`[${process.argv[2]}]`);
next();
