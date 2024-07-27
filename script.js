document.getElementById('convert-button').addEventListener('click', function() {
    const decimalNumber = parseFloat(document.getElementById('decimal-number').value);
    const exponent = parseInt(document.getElementById('exponent').value);
    const decimalString = decimalNumber.toString();
    const exponentString = exponent.toString();
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

    const selectElement = document.getElementById('input-type');
    var selectedValue = selectElement.value;
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
            normalizedDecimal.textContent = result; //HERE
            finalExponent.textContent = exponent;
            exponentBits.textContent = decimalString.length;
            var eP = exponent + 101;
            var ePString = eP.toString() + " (" +  decimalTo8BitBinary(eP) + ")" ;
            ePrime.textContent = ePString;
            let bits = extractBits(decimalTo8BitBinary(eP), getFirstDigitBinary(result));
            combinationBits.textContent = bits.combinationFieldBits;
            exponentBits.textContent = bits.exponentBits;

            let dpdDigits = extractDigits(result);
            let dpd1 = convertToBinaryAndDPD(dpdDigits.firstSet);
            let dpd2 = convertToBinaryAndDPD(dpdDigits.secondSet);
            dpd.textContent = dpd1.dpdNumber + dpd2.dpdNumber;
           
            
        } else if(decimalString.length > 7 && !decimalString.includes('.')) {
            selectElement.disabled = false;
            let result2 = normalizeTo7WholeDigits(decimalNumber)
            var value1 = normalizeWithMode(result2.normalizedValue, selectedValue);
            normalizedDecimal.textContent = value1; //HERE
            finalExponent.textContent = exponent - result2.decimalPlacesMoved;
            var eP = exponent - result2.decimalPlacesMoved + 101;
            var ePString = eP.toString() + " (" +  decimalTo8BitBinary(eP) + ")" ;
            ePrime.textContent = ePString;

            let bits = extractBits(decimalTo8BitBinary(eP), getFirstDigitBinary(value1));
            combinationBits.textContent = bits.combinationFieldBits;
            exponentBits.textContent = bits.exponentBits;

            let dpdDigits = extractDigits(value1);
            let dpd1 = convertToBinaryAndDPD(dpdDigits.firstSet);
            let dpd2 = convertToBinaryAndDPD(dpdDigits.secondSet);
            dpd.textContent = dpd1.dpdNumber + dpd2.dpdNumber;
           
        } else if (decimalString.length > 8 && decimalString.includes('.')) {
            selectElement.disabled = false;

            if (decimalString.length == 9 && decimalString.includes('-')) {
                selectElement.disabled = true;
            }
            let result3 = normalizeTo7WholeDigits(decimalNumber);
            var value2 = result3.normalizedValue;
            var value3 = normalizeWithMode(value2, selectedValue);
            normalizedDecimal.textContent = value3; //HERE
            finalExponent.textContent = exponent - result3.decimalPlacesMoved;

            var eP = exponent - result3.decimalPlacesMoved + 101;
            var ePString = eP.toString() + " (" +  decimalTo8BitBinary(eP) + ")" ;
            ePrime.textContent = ePString;

            let bits = extractBits(decimalTo8BitBinary(eP), getFirstDigitBinary(value3));
            combinationBits.textContent = bits.combinationFieldBits;
            exponentBits.textContent = bits.exponentBits;

            let dpdDigits = extractDigits(value3);
            let dpd1 = convertToBinaryAndDPD(dpdDigits.firstSet);
            let dpd2 = convertToBinaryAndDPD(dpdDigits.secondSet);
            dpd.textContent = dpd1.dpdNumber + dpd2.dpdNumber;
        } else {
            selectElement.disabled = true;
            let result3 = normalizeTo7WholeDigits(decimalNumber);
            if (hasTrailingZeros(normalizeWithMode(result3.normalizedValue, 'truncate'))) {
                let result4 = shiftToLeft(normalizeWithMode(result3.normalizedValue, 'truncate'));
                normalizedDecimal.textContent = result4.shiftedValue; //HERE
                finalExponent.textContent = exponent - result3.decimalPlacesMoved + result4.trailingZeros
               
                var eP = exponent - result3.decimalPlacesMoved + result4.trailingZeros + 101;
                var ePString = eP.toString() + " (" +  decimalTo8BitBinary(eP) + ")" ;
                ePrime.textContent = ePString;

                let bits = extractBits(decimalTo8BitBinary(eP), getFirstDigitBinary(result4.shiftedValue));
                combinationBits.textContent = bits.combinationFieldBits;
                exponentBits.textContent = bits.exponentBits;

                let dpdDigits = extractDigits(result4.shiftedValue);
                let dpd1 = convertToBinaryAndDPD(dpdDigits.firstSet);
                let dpd2 = convertToBinaryAndDPD(dpdDigits.secondSet);
                dpd.textContent = dpd1.dpdNumber + dpd2.dpdNumber;
            } else {
                normalizedDecimal.textContent = normalizeWithMode(result3.normalizedValue, 'truncate'); //HERE
                finalExponent.textContent = exponent - result3.decimalPlacesMoved;
                var eP = exponent - result3.decimalPlacesMoved + 101;
                var ePString = eP.toString() + " (" +  decimalTo8BitBinary(eP) + ")" ;
                ePrime.textContent = ePString;
                let bits = extractBits(decimalTo8BitBinary(eP), getFirstDigitBinary(normalizeWithMode(result3.normalizedValue, 'truncate')));
                combinationBits.textContent = bits.combinationFieldBits;
                exponentBits.textContent = bits.exponentBits;

                let dpdDigits = extractDigits(normalizeWithMode(result3.normalizedValue, 'truncate'));
                let dpd1 = convertToBinaryAndDPD(dpdDigits.firstSet);
                let dpd2 = convertToBinaryAndDPD(dpdDigits.secondSet);
                dpd.textContent = dpd1.dpdNumber + dpd2.dpdNumber;
            }
        }
    }
});

function extractDigits(normalizedDecimal) {

    normalizedDecimal = normalizedDecimal.replace('-', '');

    let lastSixDigits = normalizedDecimal.slice(-6);
    let firstSet = parseInt(lastSixDigits.slice(0, 3), 10);
    let secondSet = parseInt(lastSixDigits.slice(3), 10);

    return {
        firstSet,
        secondSet
    };
}

function extractBits(binaryString1, binaryString2) {
    if(binaryString2.charAt(0) == '1') {
        var lastBit = binaryString2.charAt(3);
        var firstTwoBits = binaryString1.substring(0, 2);
        var lastSixBits = binaryString1.substring(binaryString1.length - 6);
        var combinationField = "11" + firstTwoBits + lastBit;
    } else {
        var lastThreeBits = binaryString2.substring(binaryString2.length - 3);
        var firstTwoBits = binaryString1.substring(0, 2);
        var lastSixBits = binaryString1.substring(binaryString1.length - 6);
        var combinationField =  firstTwoBits + lastThreeBits;
    }
    
    return {
        combinationFieldBits: combinationField,
        exponentBits: lastSixBits
    };
}

function getFirstDigitBinary(decimalString) {
    if(decimalString.includes('-')){
        var digit = decimalString.charAt(1);
    } else {
        var digit = decimalString.charAt(0)
    }
    return decimalTo4BitBinary(digit);
}

function decimalTo4BitBinary(decimalNumber) {

    var number = parseInt(decimalNumber);

    if (number < 0 || number > 9) {
        throw new Error("Number must be between 0 and 9");
    }
    return number.toString(2).padStart(4, '0');
}

function decimalTo8BitBinary(decimalNumber) {
    if (decimalNumber < 0 || decimalNumber > 255) {
        throw new Error("Number must be between 0 and 255");
    }
    return decimalNumber.toString(2).padStart(8, '0');
}

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
    let isNegative = strValue.startsWith('-');

    if (isNegative) {
        strValue = strValue.substring(1);
    }

    strValue = strValue.replace(/0+$/, '');

    let trailingZeros = value.toString().length - strValue.length;

    strValue = strValue.padStart(7, '0');

    if (isNegative) {
        strValue = '-' + strValue;
        trailingZeros -= 1;
    }

    return {
        shiftedValue: strValue,
        trailingZeros: trailingZeros
    };
}

function hasTrailingZeros(value) {
    let strValue = value.toString();

    if (strValue.length >= 7 && strValue.endsWith('0')) {
        return true;
    } else {
        return false;
    }
}

function convertToBinaryAndDPD(decimalInput) {
    if(decimalInput == 0) {
        return {
            packedBinary: "000000000000",
            dpdNumber: "0000000000"
        };
    } else {
    const decimal = decimalInput;
    const packedBinary = convertToPackedBinary(decimal);
    const dpdNumber = convertPackedBinaryToDPD(packedBinary);
    
    return {
        packedBinary: packedBinary,
        dpdNumber: dpdNumber
    };
    }
}

function convertToPackedBinary(decimal) {
    decimal = parseInt(decimal, 10);
    let binaryString = '';
    while (decimal > 0) {
        let binaryDigit = (decimal % 10).toString(2).padStart(4, '0');
        binaryString = binaryDigit + binaryString;
        decimal = Math.floor(decimal / 10);
    }
    return binaryString;
}

function convertPackedBinaryToDPD(binary) {
    let dpd = '';
    while (binary.length % 12 !== 0) {
        binary = '0' + binary;
    }
    for (let i = 0; i < binary.length; i += 12) {
        let chunk = binary.slice(i, i + 12);
        let dpdChunk = convertChunkToDPD(chunk);
        dpd += dpdChunk;
    }
    return dpd;
}

function convertChunkToDPD(chunk) {
    const a = chunk[0];
    const b = chunk[1];
    const c = chunk[2];
    const d = chunk[3];
    const e = chunk[4];
    const f = chunk[5];
    const g = chunk[6];
    const h = chunk[7];
    const i = chunk[8];
    const j = chunk[9];
    const k = chunk[10];
    const m = chunk[11];

    let pqr, stu, v, wxy;

    if (a === '0' && e === '0' && i === '0') {
        pqr = `${b}${c}${d}`;
        stu = `${f}${g}${h}`;
        v = '0';
        wxy = `${j}${k}${m}`;
    } else if (a === '0' && e === '0' && i === '1') {
        pqr = `${b}${c}${d}`;
        stu = `${f}${g}${h}`;
        v = '1';
        wxy =`00${m}`;
    } else if (a === '0' && e === '1' && i === '0') {
        pqr = `${b}${c}${d}`;
        stu = `${j}${k}${h}`;
        v = '1';
        wxy = `01${m}`;
    } else if (a === '0' && e === '1' && i === '1') {
        pqr = `${b}${c}${d}`;
        stu = `10${h}`;
        v = '1';
        wxy = `11${m}`;
    } else if (a === '1' && e === '0' && i === '0') {
        pqr = `${j}${k}${d}`;
        stu = `${f}${g}${h}`;
        v = '1';
        wxy = `10${m}`;
    } else if (a === '1' && e === '0' && i === '1') {
        pqr = `${f}${g}${d}`;
        stu = `01${h}`;
        v = '1';
        wxy = `11${m}`;
    } else if (a === '1' && e === '1' && i === '0') {
        pqr = `${j}${k}${d}`;
        stu = `00${h}`;
        v = '1';
        wxy = `11${m}`;
    } else if (a === '1' && e === '1' && i === '1') {
        pqr = `00${d}`;
        stu = `11${h}`;
        v = '1';
        wxy = `11${m}`;
    }

    return pqr + stu + v + wxy;
}
