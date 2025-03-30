let display = document.getElementById("box");
let lastOperation = document.getElementById("last_operation_history");
let currentInput = "";
let history = "";

function button_number(value) {
    if (value === "=") {
        if (currentInput === "" || isNaN(currentInput[currentInput.length - 1])) return;
        try {
            history = currentInput;
            currentInput = eval(currentInput).toString();
            lastOperation.innerText = history;
        } catch (error) {
            currentInput = "Error";
        }
    } else {
        if (currentInput === "Error") currentInput = ""; // Reset on error

        // Prevent multiple consecutive operators
        let lastChar = currentInput[currentInput.length - 1];
        if (["+", "-", "*", "/", "%"].includes(value) && ["+", "-", "*", "/", "%"].includes(lastChar)) {
            return; // Ignore second operator press
        }

        // Ensure first input is valid
        if (currentInput === "" && ["+", "*", "/", "%"].includes(value)) {
            currentInput = "0"; // Prepend 0 to avoid starting with an operator
        }

        currentInput += value;
    }
    display.innerText = currentInput;
}

function allClear() {
    currentInput = "";
    history = "";
    display.innerText = "0";
    lastOperation.innerText = "";
}

function backspace_remove() {
    currentInput = currentInput.slice(0, -1);
    display.innerText = currentInput || "0"; // Ensure display never goes blank
}

function powerOf() {
    try {
        currentInput = (eval(currentInput) ** 2).toString();
        display.innerText = currentInput;
    } catch (error) {
        currentInput = "Error";
        display.innerText = "Error";
    }
}
