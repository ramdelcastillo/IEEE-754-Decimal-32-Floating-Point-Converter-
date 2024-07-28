document.getElementById('convert-button').addEventListener('click', function() {
    const exponent = parseInt(document.getElementById('exponent').value);
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

    const exportBool = document.getElementById('export-button');
    const dec = document.getElementById('decimal-number')
    const expo = document.getElementById('exponent')

    if (dec.value.trim() === '' && expo.value.trim() === '') {
        decimalError.textContent = 'Error! Please enter a decimal value.';
        exponentError.textContent = 'Error! Please enter an exponent value.';
         exportBool.disabled = true;
    } else if (dec.value.trim() === '') {
        decimalError.textContent = 'Error! Please enter a decimal value.';
        exportBool.disabled = true;
    } else if (expo.value.trim() === '') {
        exponentError.textContent = 'Error! Please enter an exponent value.';
        exportBool.disabled = true;
    } else {
        const input = document.getElementById('decimal-number').value;
        var newDecimal = calculate(input);
        var newDecimalString = newDecimal.toString();
        console.log(newDecimal)
        if (newDecimal >= 0) {
            signBit.textContent = '0';
        } else {
            signBit.textContent = '1';
        }
        
        if(newDecimalString.length < 8 && !newDecimalString.includes('.')) {
            let result = normalizeWithMode(newDecimal, 'truncate');
            normalizedDecimal.textContent = result; 
            finalExponent.textContent = exponent;
 
            if(parseInt(finalExponent.textContent) > 90) {
                var exp1 = finalExponent.textContent + " (Special Case: Infinity)";
                finalExponent.textContent = exp1;
                ePrime.textContent = "Infinity (Exponent > 90)";
                combinationBits.textContent = "11110";
                exponentBits.textContent = "000000";
                dpd.textContent = "00000000000000000000";
                finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent + " "
                + "0000000000 0000000000"
                finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent 
                    + "00000000000000000000")
            } else if (parseInt(finalExponent.textContent) < -101) {
                var exp1 = finalExponent.textContent + " (Special Case: Denormalized)";
                finalExponent.textContent = exp1;
                ePrime.textContent = "101 (01100101)";
                combinationBits.textContent = "01000";
                exponentBits.textContent = "100101";
                dpd.textContent = "00000000000000000000";
                finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent + " "
                + "0000000000 0000000000"
                finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent 
                    + "00000000000000000000")
            } else {
                exponentBits.textContent = newDecimalString.length;
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
           
                finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent
                + " " + dpd1.dpdNumber + " " + dpd2.dpdNumber;
    
                finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent
                 + dpd1.dpdNumber + dpd2.dpdNumber)
            }
          
        } else if(newDecimalString.length > 7 && !newDecimalString.includes('.')) {
            selectElement.disabled = false;
            let result2 = normalizeTo7WholeDigits(newDecimal)
            var value1 = normalizeWithMode(result2.normalizedValue, selectedValue);
            normalizedDecimal.textContent = value1; 
            finalExponent.textContent = exponent - result2.decimalPlacesMoved;

            if(parseInt(finalExponent.textContent) > 90) {
                var exp1 = finalExponent.textContent + " (Special Case: Infinity)";
                finalExponent.textContent = exp1;
                ePrime.textContent = "Infinity (Exponent > 90)";
                combinationBits.textContent = "11110";
                exponentBits.textContent = "000000";
                dpd.textContent = "00000000000000000000";
                finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent + " "
                + "0000000000 0000000000"
                finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent 
                    + "00000000000000000000")
            } else if (parseInt(finalExponent.textContent) < -101) {
                var exp1 = finalExponent.textContent + " (Special Case: Denormalized)";
                finalExponent.textContent = exp1;
                ePrime.textContent = "101 (01100101)";
                combinationBits.textContent = "01000";
                exponentBits.textContent = "100101";
                dpd.textContent = "00000000000000000000";
                finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent + " "
                + "0000000000 0000000000"
                finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent 
                    + "00000000000000000000")
            } else {
            
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
    
                finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent
                + " " + dpd1.dpdNumber + " " + dpd2.dpdNumber;
    
                finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent
                 + dpd1.dpdNumber + dpd2.dpdNumber)
            }
           
        } else if (newDecimalString.length > 8 && newDecimalString.includes('.')) {
            selectElement.disabled = false;

            if (newDecimalString.length.length == 9 && newDecimalString.length.includes('-')) {
                selectElement.disabled = true;
            }
            let result3 = normalizeTo7WholeDigits(newDecimal);
            var value2 = result3.normalizedValue;
            var value3 = normalizeWithMode(value2, selectedValue);
            normalizedDecimal.textContent = value3; 
            finalExponent.textContent = exponent - result3.decimalPlacesMoved;

            if(parseInt(finalExponent.textContent) > 90) {
                var exp1 = finalExponent.textContent + " (Special Case: Infinity)";
                finalExponent.textContent = exp1;
                ePrime.textContent = "Infinity (Exponent > 90)";
                combinationBits.textContent = "11110";
                exponentBits.textContent = "000000";
                dpd.textContent = "00000000000000000000";
                finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent + " "
                + "0000000000 0000000000"
                finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent 
                    + "00000000000000000000")
            } else if (parseInt(finalExponent.textContent) < -101) {
                var exp1 = finalExponent.textContent + " (Special Case: Denormalized)";
                finalExponent.textContent = exp1;
                ePrime.textContent = "101 (01100101)";
                combinationBits.textContent = "01000";
                exponentBits.textContent = "100101";
                dpd.textContent = "00000000000000000000";
                finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent + " "
                + "0000000000 0000000000"
                finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent 
                    + "00000000000000000000")
            } else {
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
    
                finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent
                + " " + dpd1.dpdNumber + " " + dpd2.dpdNumber;
    
                finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent
                 + dpd1.dpdNumber + dpd2.dpdNumber)
            }
        } else {
            selectElement.disabled = true;
            let result3 = normalizeTo7WholeDigits(newDecimal);
            if (hasTrailingZeros(normalizeWithMode(result3.normalizedValue, 'truncate'))) {
                let result4 = shiftToLeft(normalizeWithMode(result3.normalizedValue, 'truncate'));
                normalizedDecimal.textContent = result4.shiftedValue; 
                finalExponent.textContent = exponent - result3.decimalPlacesMoved + result4.trailingZeros
               
                if(parseInt(finalExponent.textContent) > 90) {
                    var exp1 = finalExponent.textContent + " (Special Case: Infinity)";
                    finalExponent.textContent = exp1;
                    ePrime.textContent = "Infinity (Exponent > 90)";
                    combinationBits.textContent = "11110";
                    exponentBits.textContent = "000000";
                    dpd.textContent = "00000000000000000000";
                    finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent + " "
                    + "0000000000 0000000000"
                    finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent 
                        + "00000000000000000000")
                } else if (parseInt(finalExponent.textContent) < -101) {
                    var exp1 = finalExponent.textContent + " (Special Case: Denormalized)";
                    finalExponent.textContent = exp1;
                    ePrime.textContent = "101 (01100101)";
                    combinationBits.textContent = "01000";
                    exponentBits.textContent = "100101";
                    dpd.textContent = "00000000000000000000";
                    finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent + " "
                    + "0000000000 0000000000"
                    finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent 
                        + "00000000000000000000")
                } else {
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
    
                    finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent
                    + " " + dpd1.dpdNumber + " " + dpd2.dpdNumber;
        
                    finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent
                     + dpd1.dpdNumber + dpd2.dpdNumber)
                }
            } else {
                normalizedDecimal.textContent = normalizeWithMode(result3.normalizedValue, 'truncate'); 
                finalExponent.textContent = exponent - result3.decimalPlacesMoved;
               

                if(parseInt(finalExponent.textContent) > 90) {
                    var exp1 = finalExponent.textContent + " (Special Case: Infinity)";
                    finalExponent.textContent = exp1;
                    ePrime.textContent = "Infinity (Exponent > 90)";
                    combinationBits.textContent = "11110";
                    exponentBits.textContent = "000000";
                    dpd.textContent = "00000000000000000000";
                    finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent + " "
                    + "0000000000 0000000000"
                    finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent 
                        + "00000000000000000000")
                } else if (parseInt(finalExponent.textContent) < -101) {
                    var exp1 = finalExponent.textContent + " (Special Case: Denormalized)";
                    finalExponent.textContent = exp1;
                    ePrime.textContent = "101 (01100101)";
                    combinationBits.textContent = "01000";
                    exponentBits.textContent = "100101";
                    dpd.textContent = "00000000000000000000";
                    finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent + " "
                    + "0000000000 0000000000"
                    finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent 
                        + "00000000000000000000")
                } else {
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
    
                    finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent
                    + " " + dpd1.dpdNumber + " " + dpd2.dpdNumber;
        
                    finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent
                     + dpd1.dpdNumber + dpd2.dpdNumber)
                }
            }
        }

        if(normalizedDecimal.textContent.includes('NaN') || finalExponent.textContent.includes('NaN')) {
            var exp1 = " (Special Case: NaN)";
            normalizedDecimal.textContent = "NaN"
            signBit.textContent = '0';
            finalExponent.textContent = exp1;
            ePrime.textContent = "NaN (Not-a-Number)";
            combinationBits.textContent = "11111";
            exponentBits.textContent = "000000";
            dpd.textContent = "00000000000000000000";
            finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent + " "
            + "0000000000 0000000000"
            finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent 
                + "00000000000000000000")
        }

        if(normalizedDecimal.textContent.includes('0000000')) {
            var exp1 = "0";
            finalExponent.textContent = exp1;
            ePrime.textContent = "101 (01100101)";
            combinationBits.textContent = "01000";
            exponentBits.textContent = "100101";
            dpd.textContent = "00000000000000000000";
            finalAnswerBinary.textContent = signBit.textContent + " " + combinationBits.textContent + " " + exponentBits.textContent + " "
            + "0000000000 0000000000"
            finalAnswerHex.textContent = "0x" + binaryToHex(signBit.textContent + combinationBits.textContent + exponentBits.textContent 
                + "00000000000000000000")
        }

        exportBool.disabled = false;
    }
});

document.getElementById('export-button').addEventListener('click', function() {
    const decimalNumber = document.getElementById('decimal-number').value;
    const exponent = document.getElementById('exponent').value;
    const normalizedDecimal = document.getElementById('normalized-decimal');
    const finalExponent = document.getElementById('final-exponent');
    const ePrime = document.getElementById('e-prime');
    const signBit = document.getElementById('sign-bit');
    const combinationBits = document.getElementById('combination-bits');
    const exponentBits = document.getElementById('exponent-bits');
    const dpd = document.getElementById('dpd');
    const finalAnswerBinary = document.getElementById('final-answer-binary');
    const finalAnswerHex = document.getElementById('final-answer-hex');

    const selectElement = document.getElementById('input-type');
    var selectedValue = selectElement.value;
    const isDisabled =  selectElement.disabled 

    const roundingMappings = {
        'truncate': 'Truncate',
        'round-up': 'Round Up',
        'round-down': 'Round Down',
        'round-even': 'Round to Nearest Ties to Even'
    };

    if(isDisabled) {
        const content = "IEEE-754 Decimal-32 Floating-Point Converter" + "\n" + "Inputs: " + "\n" + "Decimal Number: " + 
        decimalNumber + "\n"  + "Exponent (Base-10): " + 
        exponent + "\n"  + "Rounding Method: None " + "\n\n" + "Processing: " + "\n" + "Normalized Decimal: " + 
        normalizedDecimal.textContent + "\n" + "Final Exponent: " +
        finalExponent.textContent + "\n" + "E-Prime: " +
        ePrime.textContent + "\n\n" + "Output: " + "\n" + "Sign Bit: " + 
        signBit.textContent + "\n" + "Combination Bits: " +
        combinationBits.textContent + "\n" + "Exponent Continuation Bits: " +
        exponentBits.textContent + "\n" + "Mantissa Continuation Bits: " +
        dpd.textContent + "\n" + "Final Output (Binary): " +
        finalAnswerBinary.textContent + "\n" + "Final Output (Hexadecimal): " +
        finalAnswerHex.textContent
        
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'IEEE-754 Decimal-32 Output.txt';
        document.body.appendChild(link); 
        link.click(); 
        document.body.removeChild(link); 
    } else {
        const content = "IEEE-754 Decimal-32 Floating-Point Converter" + "\n" + "INPUTS: " + "\n" + "Decimal Number: " + 
        decimalNumber + "\n"  + "Exponent (Base-10): " + 
        exponent + "\n"  + "Rounding Method: " + roundingMappings[selectedValue] + "\n\n" + "Processing: " + "\n" + "Normalized Decimal: " + 
        normalizedDecimal.textContent + "\n" + "Final Exponent: " +
        finalExponent.textContent + "\n" + "E-Prime: " +
        ePrime.textContent + "\n\n" + "Output: " + "\n" + "Sign Bit: " + 
        signBit.textContent + "\n" + "Combination Bits: " +
        combinationBits.textContent + "\n" + "Exponent Continuation Bits: " +
        exponentBits.textContent + "\n" + "Mantissa Continuation Bits: " +
        dpd.textContent + "\n" + "Final Output (Binary): " +
        finalAnswerBinary.textContent + "\n" + "Final Output (Hexadecimal): " +
        finalAnswerHex.textContent

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'IEEE-754 Decimal-32 Output.txt';
        document.body.appendChild(link); 
        link.click(); 
        document.body.removeChild(link); 
    }
    
});

function calculate(expression) {
   
    expression = expression.toString().trim();

    if (expression.startsWith('sqrt(') && expression.endsWith(')')) {
        const value = parseFloat(expression.slice(5, -1));
        if (isNaN(value) || value < 0) {
            return NaN; 
        }
        return Math.sqrt(value);
    }

    if (expression.includes('/')) {
        const parts = expression.split('/');
        if (parts.length === 2) {
            const numerator = parseFloat(parts[0].trim());
            const denominator = parseFloat(parts[1].trim());

            if (denominator === 0) {
                return NaN; 
            }
            return numerator / denominator;
        }
        return NaN; 
    }

    try {

        const result = new Function('return ' + expression)();
        
        if (isNaN(result) || !isFinite(result)) {
            return NaN; 
        }
        
        return result;
    } catch {
        return NaN; 
    }
}

function binaryToHex(binaryString) {
    let hexString = '';
    for (let i = 0; i < binaryString.length; i += 4) {

        let fourBits = binaryString.slice(i, i + 4);
        
        let hexDigit = parseInt(fourBits, 2).toString(16).toUpperCase();
        
        hexString += hexDigit;
    }

    return hexString;
}

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
    return number.toString(2).padStart(4, '0');
}

function decimalTo8BitBinary(decimalNumber) {
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

  function normalizeWithMode(value, mode) {
    let isNegative = value < 0;
    let strValue = Math.abs(value).toString();
    
    if (strValue.length > 7) {
        if (mode === 'truncate') {
            strValue = strValue.slice(0, 7);
        } else if (mode === 'round-up') {
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
             
            } else {
                strValue = strValue.slice(0, 7);
            }

        } else if (mode === 'round-even') {
            let originalBase = Number(strValue.slice(0, 7));
            let seventh = Number(strValue.slice(6, 7));
            let base = Number(strValue);
            let parts = base.toString().split('.');

            let decimalPart = parts[1] ? `.${parts[1]}` : '0'; 
            let base2 = Number(decimalPart);

            let is7thEven = seventh % 2 === 0;
         
            if(!isNegative) { 
                if(base2 > 0.5) {
                    originalBase += 1;
                    strValue = originalBase.toString().padStart(7, '0').slice(0, 7);
                } else if (base2 < 0.5) {
                    strValue = strValue.slice(0, 7);
                } else {
                    if(is7thEven) {
                        strValue = strValue.slice(0, 7);
                    } else {
                        originalBase += 1;
                        strValue = originalBase.toString().padStart(7, '0').slice(0, 7);
                    }
                }
            } else {
                if(base2 > 0.5) {
                    originalBase += 1;
                    strValue = originalBase.toString().padStart(7, '0').slice(0, 7);
                } else if (base2 < 0.5) {
                    strValue = strValue.slice(0, 7);
                } else {
                    if(is7thEven) {
                        strValue = strValue.slice(0, 7);
                    } else {
                        originalBase += 1;
                        strValue = originalBase.toString().padStart(7, '0').slice(0, 7);
                    }
                }
            }   
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
