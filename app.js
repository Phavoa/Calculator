const allButtons = document.querySelectorAll(".btn");
const display = document.querySelector(".displaycalc");
const equal = document.querySelector(".equal");
const clearNum = document.querySelector('.clear');
const deleteValue = document.querySelector(".delete");

let stringValues = '';

function deleteNumber(array) {
  let len = array.length - 1;
  if (len >= 0) {
    array[len] = array[len].slice(0, -1);
  }
  if (array[len] === "") {
    array.pop();
  }

  return array;
}

function createArray(inputString) {
  let newArray = [];
  let currentChar = "";

  for (let i = 0; i < inputString.length; i++) {
    if (/\d|\./.test(inputString[i])) {
      currentChar += inputString[i];
    } else {
      if (currentChar !== "") {
        newArray.push(currentChar);
        currentChar = "";
      }
      newArray.push(inputString[i]);
    }
  }

  if (currentChar !== "") {
    newArray.push(currentChar);
  }

  return newArray;
}

function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function mul(num1, num2) {
  return num1 * num2;
}

function div(num1, num2) {
  if (num2 !== 0) {
    return num1 / num2;
  } else {
    console.error('Division by zero');
    return NaN;
  }
}

function calculateArray() {
  const expressionArray = createArray(stringValues);
  let currentNum = parseFloat(expressionArray[0]);

  for (let i = 1; i < expressionArray.length; i++) {
    const token = expressionArray[i];

    if (typeof token === 'string' && token.match(/[+\-*/]/)) {
      const nextNum = parseFloat(expressionArray[i + 1]);

      if (!isNaN(nextNum)) {
        switch (token) {
          case '+':
            currentNum = add(currentNum, nextNum);
            break;
          case '-':
            currentNum = sub(currentNum, nextNum);
            break;
          case '*':
            currentNum = mul(currentNum, nextNum);
            break;
          case '/':
            currentNum = div(currentNum, nextNum);
            break;
          default:
            console.error('Invalid operator');
            return "Invalid Expression";
        }

        i++;
      } else {
        console.error('Invalid token in the expressionArray');
        return "Invalid Expression";
      }
    } else {
      console.error('Invalid token in the expressionArray');
      
      return "invalid";
      expressionArray = [];
     
    }
  }

  return currentNum;
}

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", () => {
    display.value += allButtons[i].textContent;
    stringValues = display.value;
  });
}

deleteValue.addEventListener("click", () => {
  deleteNumber(newArray);
  display.value = display.value.slice(0, -1);
});

clearNum.addEventListener("click", () => {
  newArray = [];
  display.value = "";
});

equal.addEventListener('click', () => {
  display.value = calculateArray();
});
