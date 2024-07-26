document.getElementById('convert-button').addEventListener('click', function() {
    const decimalNumber = parseFloat(document.getElementById('decimal-number').value);
    let integerPart = Math.floor(decimalNumber); 
    let stringNumber = integerPart.toString();

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
    if(isNaN(decimalNumber)) {
        combinationBits.textContent = 'true';
        exponentBits.textContent = 'NaN';
        decimalError.textContent = 'Error! Please enter a decimal value.';
        exponentError.textContent = 'Error! Please enter a decimal value.';
    } else {
  
        if (decimalNumber >= 0) {
            signBit.textContent = '0';
        } else {
            signBit.textContent = '1';
        }

    // let values = [0.1234567, -12345.5678, 0.000012345, 123.456];

        let result = normalizeTo7WholeDigits(decimalNumber);
        // Normalize integer part to 7 digits
        normalizedDecimal.textContent = normalizeWithMode(result.normalizedValue, 'round-down');
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

function normalizeWithMode(value, mode) {
    let isNegative = value < 0;
    
    let strValue = Math.abs(value).toString();
    
    if (strValue.length > 7) {
        if (mode === 'truncate') {
            strValue = strValue.slice(0, 7);
        } else if (mode === 'round') {
            let base = Number(strValue.slice(0, 7)); 
            let extraDigits = strValue.slice(7); 
            if (extraDigits.length > 0) {
                base += 1;
            }
            
            strValue = base.toString().padStart(7, '0').slice(0, 7);
        } else if (mode === 'round-down') {

            strValue = strValue.slice(0, 7);
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
          
            if (mode === 'round') {
                strValue = (Number(strValue) - 1).toString().padStart(7, '0');
            } else if (mode === 'round-down') {
                strValue = (Number(strValue) + 1).toString().padStart(7, '0');
            } else if (mode === 'round-even') {
                
            }
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
