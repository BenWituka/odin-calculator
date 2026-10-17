console.log("Hi");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, a, b) {
    switch (op) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        default: return NaN;
    }
}

function clickDigit(e) {
    if (displayResult) {
        displayResult = false;
        input = +e.target.textContent;
        if (operator) secondaryOperand = true;
    }
    else if (operator && !secondaryOperand) {
        secondaryOperand = true;
        input = +e.target.textContent;
    }   
    else {
        console.log(Math.sign(input))
        if (input >= 0 && !Object.is(input, -0))
            input = input * 10 + +e.target.textContent;
        else
            input = input * 10 - +e.target.textContent;
    }
    updateDisplay();
}

function clickOperator(e) {
    if (operator) {
        input = operate(operator, primaryOperand, input);
        secondaryOperand = false;
        displayResult = true;
    }
    operators.forEach(op => op.classList.remove("selected"));
    e.target.classList.add("selected");
    operator = e.target.textContent;
    primaryOperand = input;
    updateDisplay();
}

function updateDisplay() {
    if (input === null) display.textContent = " ";
    else if (Object.is(input, -0))
        display.textContent = "-0";
    else {
        display.textContent = input;
        if (displayResult) display.textContent = "result: " + Number.parseFloat(input.toPrecision(7));
    }
}

let input = 0;
let primaryOperand = null;
let displayResult = false;
let secondaryOperand = false;
let operator = null;

const display = document.querySelector("#display");
const digits = document.querySelectorAll(".digit");
const sign = document.querySelector("#sign");
const clear = document.querySelector("#clear");
const operators = document.querySelectorAll(".operator");
const evaluate = document.querySelector("#evaluate");

digits.forEach(digit => {
    digit.addEventListener("click", clickDigit);
});

operators.forEach(op => {
    op.addEventListener("click", clickOperator);
})

sign.addEventListener("click", () => {
    input = -input;
    updateDisplay();
});

clear.addEventListener("click", () => {
    input = 0;
    operator = "";
    displayResult = false;
    primaryOperand = null;
    secondaryOperand = false;
    operators.forEach(op => {
        op.classList.remove("selected");
    });
    updateDisplay();
});

evaluate.addEventListener("click", () => {
    if (operator && secondaryOperand) {
        input = operate(operator, primaryOperand, input);
        displayResult = true;
        secondaryOperand = false;
        operator = "";
        operators.forEach(op => {
            op.classList.remove("selected");
        });
        updateDisplay();
    }
});




