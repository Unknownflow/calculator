// all basic math operators (+ - * /)
const add = (num1, num2) => {
	return num1 + num2;
};

const subtract = (num1, num2) => {
	return num1 - num2;
};

const multiply = (num1, num2) => {
	return num1 * num2;
};

const divide = (num1, num2) => {
	return num1 / num2;
};

const percentage = (num1) => {
	return num1 / 100;
};

const plusMinus = (num1) => {
	return -num1;
};

const operate = (operator, num1, num2) => {
	num1 = Number(num1);
	num2 = Number(num2);
	console.log(operator);
	if (operator == "+") {
		return add(num1, num2);
	} else if (operator == "-") {
		return subtract(num1, num2);
	} else if (operator == "x") {
		return multiply(num1, num2);
	} else if (operator == "/") {
		// denominator cannot be 0
		if (num2 == 0) {
			return "You cannot divide a number by 0!";
		}
		return divide(num1, num2);
	} else if (operator == "%") {
		console.log(num1, num2);
		if (num2 != "") {
			return percentage(num2);
		} else {
			return percentage(num1);
		}
	} else if (operator == "plus-minus") {
		if (num2 != "") {
			return plusMinus(num2);
		} else {
			return plusMinus(num1);
		}
	}
};

const isNumber = (string) => {
	return !isNaN(string);
};

const isOperator = (string) => {
	if (
		string == "+" ||
		string == "-" ||
		string == "x" ||
		string == "/" ||
		string == "%" ||
		string == "plus-minus"
	) {
		return true;
	} else {
		return false;
	}
};

let num1 = 0;
let operator = "";
let num2 = "";

const display = (newText) => {
	let displayExpression = document.getElementById("display");
	displayExpression.innerText = num1;
	if (newText == "clear") {
		// if clear button was pressed, clear the display
		num1 = 0;
		operator = "";
		num2 = "";
		displayExpression.innerText = "";
		displayExpression.innerText = num1;
	} else if (newText == "=") {
		// if "=" button was pressed, update display with solution
		if (operator == "") {
			return;
		}
		displayExpression.innerText = operate(operator, num1, num2);
	} else if (isOperator(newText)) {
		// % operator or + / -
		if (newText == "%" || newText == "plus-minus") {
			if (num2 != "") {
				num2 = operate(newText, num1, num2);
				displayExpression.innerText = num2;
			} else {
				num1 = operate(newText, num1, num2);
				displayExpression.innerText = num1;
			}
			return;
		}

		// other operators
		if (num2 != "") {
			num1 = operate(operator, num1, num2);
			displayExpression.innerText = num1;
			num2 = "";
		}

		// update operator symbol entered
		operator = newText;
	} else {
		if (num1 == 0) {
			// no text entered yet
			num1 = newText;
			displayExpression.innerText = num1;
		} else if (operator == "" && num2 == "") {
			// only num1 entered
			num1 += newText;
			displayExpression.innerText = num1;
		} else {
			num2 += newText;
			displayExpression.innerText = num2;
		}
	}
	console.log(num1, num2, operator);
};

// display default number on calculator to be 0
display(0);

let calculatorButtons = document.querySelectorAll(".calculator-button");
for (let i = 0; i < calculatorButtons.length; i++) {
	// create an eventlistener for each button and display corresponding id
	let id = calculatorButtons[i].getAttribute("id");
	calculatorButtons[i].addEventListener("click", function () {
		display(id);
	});
}
