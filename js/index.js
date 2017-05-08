function addCharToDisplay (event) {
  let currButton = $(event.target).text();
  let displayText = $('#screen').text();

  if (displayText === 'Error') {
    if (currButton === 'C') {
      $('#screen').text('');
    } else {
      return $('#screen').text('Error');
    }
  }

  if (checkForError(currButton, displayText)) {
    return $('#screen').text('Error');
  }

  currButton = checkForMultiplyOrDivide(currButton);
  updateDisplay(currButton, displayText);
}

function checkForError (currButton, displayText) {
  let text = displayText + currButton;
  let textArray = text.split('');
  let operatorArray = ['-', '+', '*', '/'];

  if (operatorArray.slice(1).includes(textArray[0])) {
    return true;
  }

  if (textArray[0] === '-') {
    textArray = textArray.slice(1);
  }

  let numberOfOperators = textArray.filter(char => operatorArray.includes(char));
  if (numberOfOperators.length > 1) {
    return true;
  }

  return false;
}

function checkForMultiplyOrDivide (currButton) {
  if (currButton === 'x') {
    currButton = '*';
  } else if (currButton === '÷') {
    currButton = '/';
  }

  return currButton;
}

function updateDisplay (currButton, displayText) {
  if (currButton === 'C') {
    $('#screen').text('');
  } else if (currButton === '=') {
    evaluateExpression(displayText);
  } else {
    $('#screen').text(displayText + currButton);
  }
}

function evaluateExpression (expression) {
  if (expression.includes('/0')) {
    $('#screen').text('Error')
  } else {
    let total = eval(expression);
    $('#screen').text(total);
  }
}

$(function(){
  $('.buttons').children().click(addCharToDisplay)
});
