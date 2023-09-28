const unitList = ["mm", "cm", "m"];
const INCHES_TO_MM = 25.4;
const INCHES_TO_CM = 2.54;
const INCHES_TO_METERS = 0.0254;

let userInput = 0;
let unit = "";
let isTestFlagOn = false;

function convert() {
    let result = 0;
    if (isRunningInBrowser()) {
        const submitButton = document.getElementById("submitBtn");
        submitButton.onclick = () => {
            
            unit = getUnit()
            userInput = getNumber()

            result = converter(userInput, unit);
            document.getElementById("result").innerHTML =  `${userInput} inches = ${result} ${unit}`;
    
        }
    } else {
        isTestFlagOn = process.argv.indexOf('-t') > -1 ? true : false;
        unit = getUnit()
        userInput = getNumber()

        if (isTestFlagOn) {
            runUnitTests();
        }
        const result = converter(userInput, unit);
        console.log(`${userInput} inches = ${result} ${unit}`);
    }
    

}
convert()

function getNumber() {
    let number = 0;
    if (isRunningInBrowser()) {
        const userInput = document.getElementById("input").value;
        number = userInput;
    } else {
        const arguments = process.argv;
        number = isTestFlagOn === true ? arguments[3] : arguments[2];
    }
    return parseInt(number);
}

function getUnit() {
    let selectedUnit = "";
    if (isRunningInBrowser()) {
        const dropdownList = document.getElementById("unitOptions");
        selectedUnit = dropdownList.options[dropdownList.selectedIndex].value;
    } else {
        const arguments = process.argv;
        selectedUnit = isTestFlagOn === true ? arguments[4] : arguments[3];
        //delete "-" from front of string
        selectedUnit = selectedUnit.slice(1);
    }
    return selectedUnit;
}

console.log(userInput);
console.log(unit);


function converter(userInput, unit) {
    if (unit === "mm") {
        return userInput * INCHES_TO_MM;
    } else if (unit === "cm") {
        return userInput * INCHES_TO_CM;
    } else if (unit === "m") {
        return userInput * INCHES_TO_METERS;
    }
}
console.log(converter(userInput, unit));

/*
function getUserInput() {
    if (isRunningInBrowser()) {
        //const dropdownList = document.getElementById("unitOptions");
        //const selectedUnit = dropdownList.options[dropdownList.selectedIndex].value;
        //console.log(selectedUnit);
        const userInput = document.getElementById("input").value;
        //console.log(userInput);
        return {userInput, selectedUnit}
    } else {
        const arguments = process.argv;
        if(arguments.includes("-t")) {
            runUnitTests()
        } else {
            return {userInput: arguments[2], selectedUnit: arguments[3]}
        }
    }
}*/

function getInput() {
    let input = 0;
    if (isRunningInBrowser()) {
        input = document.getElementById("input").value;
    } else {
        input = process.argv[2];
    }
    return input;
}

function testConverter() {

    const result = converter(userInput, unit);

    test(() => {
        return typeof result === 'number';
    }, 'converter returns a number');

    if (unit == "mm") {
        // test millimeter
        const number = result * 10
        const tempINCHES_TO_MM = INCHES_TO_MM * 10;
        test(() => {
            return number % tempINCHES_TO_MM === 0;
        }, 'converts inches to millimeters correctly');
    }

    if (unit == "cm") {
        //test centimeter
        test(() => {
            const number = result * 100
            const tempINCHES_TO_CM = INCHES_TO_CM * 100;
            return number % tempINCHES_TO_CM === 0;
        }, 'converts inches to centimeters correctly');
    }

    if (unit === "m") {
        //test meter
        test(() => {
            const number = result * 10000;
            const tempINCHES_TO_METERS = INCHES_TO_METERS * 10000;
            return number % tempINCHES_TO_METERS === 0;
        }, 'converts inches to meters correctly');
    }
}




function runUnitTests() {



    test(() => {
        return isRunningInBrowser();
    }, "running in browser");


    test(() => {
        return typeof userInput == "number";
    }, "user input is a number");

    console.log("userInput type = ", typeof userInput)


    test(() => {
        if (typeof unit == "string") {
            return true;
        } else {
            return false;
        }
    }, "selected unit is a string");

    test(() => {
        if (unitList.includes(unit)) {
            return true;
        } else {
            return false;
        }
    }, "selected unit is valid");

    testConverter()
}


function isRunningInBrowser() {
    try {
        if (document) {
            return true;
        }
    } catch (error) {
        return false;
    }

    return false;
}



//input value


function test(evaluation, description) {
    try {
        if (evaluation()) {
            // Må være sant
            console.log(`🟢 Try: ${description}`)
        } else {
            console.log(`🔴 Try: ${description}`);
        }
    } catch (error) {
        console.log(`🔴 Error: ${description}`);
    }
}
