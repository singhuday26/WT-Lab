const display = document.getElementById("result");
let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.value = currentInput;
}

function clear() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length <= 1) {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function appendNumber(number) {
  if (shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    currentInput = currentInput === "0" ? number : currentInput + number;
  }
  updateDisplay();
}

function appendDecimal() {
  if (shouldResetDisplay) {
    currentInput = "0.";
    shouldResetDisplay = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

function chooseOperation(op) {
  if (currentInput === "") return;

  if (previousInput !== "") {
    compute();
  }

  operator = op;
  previousInput = currentInput;
  shouldResetDisplay = true;
}

function compute() {
  let computation;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      computation = curr === 0 ? "Error" : prev / curr;
      break;
    default:
      return;
  }

  currentInput = computation.toString();
  operator = null;
  previousInput = "";
  shouldResetDisplay = false;
  updateDisplay();
}

// Event Listeners
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (!isNaN(value) || value === "0") {
      appendNumber(value);
    } else if (value === ".") {
      appendDecimal();
    } else if (value === "C") {
      clear();
    } else if (value === "←") {
      deleteLast();
    } else if (["+", "-", "*", "/"].includes(value)) {
      chooseOperation(value);
    } else if (value === "=") {
      compute();
    }
  });
});

// Keyboard support (optional but nice)
document.addEventListener("keydown", (e) => {
  e.preventDefault();

  if (!isNaN(e.key) || e.key === "0") {
    appendNumber(e.key);
  } else if (e.key === ".") {
    appendDecimal();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
    clear();
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    chooseOperation(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    compute();
  }
});
