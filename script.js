document.getElementById('convert-button').addEventListener('click', function() {
    const decimalNumber = parseFloat(document.getElementById('decimal-number').value);
    const exponent = parseInt(document.getElementById('exponent').value);
    const decimalString = decimalNumber.toString();
    const exponentString = exponent.toString();
    // let integerPart = Math.floor(decimalNumber); 
    // let stringNumber = integerPart.toString();

    const normalizedDecimal = document.getElementById('normalized-decimal');
    const finalExponent = document.getElementById('final-exponent');
    const ePrime = document.getElementById('e-prime');
    
    const signBit = document.getElementById('sign-bit');

    const combinationBits = document.getElementById('combination-bits');
    const exponentBits = document.getElementById('exponent-bits');
    const dpd = document.getElementById('dpd');
    const finalAnswerBinary = document.getElementById('final-answer-binary');
    const finalAnswerHex = document.getElementById('final-answer-hex');
   
    const decimalError = document.getElementById('decimal-error');
    const exponentError = document.getElementById('exponent-error');


    decimalError.textContent = '';
    exponentError.textContent = '';
    normalizedDecimal.textContent = '--';
    finalExponent.textContent = '--';
    ePrime.textContent = '--';
    signBit.textContent = '--';
    combinationBits.textContent = '--';
    exponentBits.textContent = '--';
    dpd.textContent = '--';
    finalAnswerBinary.textContent = '--';
    finalAnswerHex.textContent = '--';

    // const checkDecimalNumberError = decimalString.length == 0 || (decimalString.length == 1)

    const selectElement = document.getElementById('input-type');

    var selectedValue = selectElement.value;

    finalAnswerHex.textContent = selectedValue

    selectElement.disabled = true;


   
    if(isNaN(decimalNumber) && isNaN(exponent)) {
        decimalError.textContent = 'Error! Please enter a decimal value.';
        exponentError.textContent = 'Error! Please enter a decimal value.';
    } if (isNaN(decimalNumber)) {
        decimalError.textContent = 'Error! Please enter a decimal value.';
    } else if (isNaN(exponent)) {
        exponentError.textContent = 'Error! Please enter a decimal value.';
    } else {
  
        if (decimalNumber >= 0) {
            signBit.textContent = '0';
        } else {
            signBit.textContent = '1';
        }

        if(decimalString.length < 8 && !decimalString.includes('.')) {
            let result = normalizeWithMode(decimalNumber, 'truncate');
            normalizedDecimal.textContent = result;
            finalExponent.textContent = exponent;
            combinationBits.textContent = decimalString;
            exponentBits.textContent = decimalString.length;
            ePrime.textContent = exponent + 101;
        } else if(decimalString.length > 7 && !decimalString.includes('.')) {
            selectElement.disabled = false;
            let result2 = normalizeTo7WholeDigits(decimalNumber)
            var value1 = normalizeWithMode(result2.normalizedValue, selectedValue);
            normalizedDecimal.textContent = value1;
            finalExponent.textContent = exponent - result2.decimalPlacesMoved;
            combinationBits.textContent = decimalString;
            exponentBits.textContent = decimalString.length;
            ePrime.textContent = exponent - result2.decimalPlacesMoved + 101;
        } else if (decimalString.length > 8 && decimalString.includes('.')) {
            selectElement.disabled = false;
            let result3 = normalizeTo7WholeDigits(decimalNumber);
            finalAnswerBinary.textContent = result3.normalizedValue;
            var value2 = result3.normalizedValue;
            var value3 = normalizeWithMode(value2, selectedValue);
       
            normalizedDecimal.textContent = value3;
            finalExponent.textContent = exponent - result3.decimalPlacesMoved;
            ePrime.textContent = exponent - result3.decimalPlacesMoved + 101;
        } else {
            selectElement.disabled = true;
            let result3 = normalizeTo7WholeDigits(decimalNumber);
            if (hasTrailingZeros(normalizeWithMode(result3.normalizedValue, 'truncate'))) {
                let result4 = shiftToLeft(normalizeWithMode(result3.normalizedValue, 'truncate'));
                normalizedDecimal.textContent = result4.shiftedValue;
                finalExponent.textContent = exponent - result3.decimalPlacesMoved + result4.trailingZeros
                ePrime.textContent = exponent - result3.decimalPlacesMoved + result4.trailingZeros + 101;
            } else {
                normalizedDecimal.textContent = normalizeWithMode(result3.normalizedValue, 'truncate');
                finalExponent.textContent = exponent - result3.decimalPlacesMoved;
                ePrime.textContent = exponent - result3.decimalPlacesMoved + 101;
            }
        }
    }
});

function normalizeTo7WholeDigits(value) {
    if (value === 0) {
        return {
            normalizedValue: 0,
            decimalPlacesMoved: 0
        };
    }
    
    let absoluteValue = Math.abs(value);
    let wholeDigits = Math.floor(Math.log10(absoluteValue)) + 1;

    let decimalPlacesMoved = wholeDigits <= 0 ? 7 : 7 - wholeDigits;
    let multiplier = Math.pow(10, decimalPlacesMoved);

    let normalizedValue = value * multiplier;

    normalizedValue = Math.round(normalizedValue * 1000000) / 1000000;

    return {
        normalizedValue: normalizedValue,
        decimalPlacesMoved: decimalPlacesMoved
    };
}

function normalizeToWholeDigits(value) {
    
    let wholeDigits = Math.floor(Math.log10(Math.abs(value))) + 1;
  

    let decimalPlacesMoved = 7 - wholeDigits;
    let multiplier = Math.pow(10, decimalPlacesMoved);
  
  
    let normalizedValue = value * multiplier;
  
    return {
      normalizedValue: normalizedValue,
      decimalPlacesMoved: decimalPlacesMoved
    };
  }

  function normalizeWithMode(value, mode) {
    let isNegative = value < 0;
    let strValue = Math.abs(value).toString();
    
    if (strValue.length > 7) {
        if (mode === 'truncate') {
            strValue = strValue.slice(0, 7);
        } else if (mode === 'roundup') {
            let base = Number(strValue.slice(0, 7));
            if(!isNegative) {
                base += 1;
                strValue = base.toString().padStart(7, '0').slice(0, 7);
            } else {
                strValue = strValue.slice(0, 7);
            }
        } else if (mode === 'round-down') {
            let base = Number(strValue.slice(0, 7));
            if(isNegative) {
                base += 1;
                strValue = base.toString().padStart(7, '0').slice(0, 7);
                console.log(strValue)
            } else {
                strValue = strValue.slice(0, 7);
            }

        } else if (mode === 'round-even') {
            let base = Number(strValue.slice(0, 7));
            let extraDigits = strValue.slice(7);
            if (extraDigits.length > 0) {
                let lastDigit = base % 10;
                let roundingFactor = Number(extraDigits[0]) >= 5 ? 1 : 0;
                base += roundingFactor;
                if (lastDigit === 9 && roundingFactor === 1) {
                    base += 1;
                }
            }
            strValue = base.toString().padStart(7, '0').slice(0, 7);
        }

        if (isNegative) {
            strValue = '-' + strValue;
        }
    } else {
        strValue = strValue.padStart(7, '0');
        if (isNegative) {
            strValue = '-' + strValue;
        }
    }
    
    return strValue;
}

function shiftToLeft(value) {

    let strValue = value.toString();

    strValue = strValue.replace(/0+$/, '');

    let trailingZeros = value.toString().length - strValue.length;

    strValue = strValue.padStart(7, '0');

    return {
        shiftedValue: strValue,
        trailingZeros: trailingZeros
    };
}

function hasTrailingZeros(value) {
    let strValue = value.toString();

    if (strValue.length === 7 && strValue.endsWith('0')) {
        return true;
    } else {
        return false;
    }
}
