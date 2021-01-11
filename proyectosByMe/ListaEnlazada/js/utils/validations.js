export function isOnlyPositiveNumbers(value) {
  return new Promise((resolve, reject) => {
    let onlyNumbersExpression = /^\d+$/;
    if (onlyNumbersExpression.test(value)) resolve(value);
    else reject("Invalid input");
  });
}

export function isNumber(value) {
    return new Promise((resolve, reject) => {
      let onlyNumbersExpression = /^\-*\d+$/;
      if (onlyNumbersExpression.test(value)) resolve(value);
      else reject("Invalid input");
    });
  }
  