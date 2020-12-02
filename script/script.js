window.addEventListener('load', start);

var inputRange = null;
var inputCurrentNumber = null;
var inputFullNumber = null;

var firstRange = ['Zero', 'Um', 'Dois', 'Três', 'Quatro', 'Cinco', 'Seis', 'Sete', 'Oito', 'Nove'];
var secondRange = [
    ['Dez', 'Onze', 'Doze', 'Treze', 'Quatorze', 'Quinze', 'Dezesseis', 'Dezessete', 'Dezoito', 'Dezenove'],
    ['Vinte'], ['Trinta'], ['Quarenta'], ['Cinquenta'], ['Sessenta'], ['Setenta'], ['Oitenta'], ['Noventa']
];
var thirdRange = [
    ['Cem', 'Cento'], ['Duzentos'], ['Trezentos'], ['Quatrocentos'], ['Quinhentos'], ['Seiscentos'], ['Setecentos'],
    ['Oitocentos'], ['Novecentos']
];

function start() {
    inputRange = document.querySelector('#inputRange');
    inputRange.addEventListener('input', handleInput);

    inputCurrentNumber = document.querySelector('#currentNumber');

    inputFullNumber = document.querySelector('#fullNumber');
}

function handleInput(event) {
    var selectedNumber = event.target.value;
    inputCurrentNumber.value = selectedNumber;

    selectedNumber = parseInt(selectedNumber);
    var fullNumber;
    if (selectedNumber <= 9) {
        fullNumber = getFullNumberInFirstRange(selectedNumber);
    } else if (selectedNumber <= 99) {
        fullNumber = getFullNumberInSecondRange(selectedNumber);
    } else {
        fullNumber = getFullNumberInThirdRange(selectedNumber);
    }

    inputFullNumber.value = fullNumber;
}

function getFullNumberInFirstRange(number) {
    var fullNumber = firstRange[number];    
    return fullNumber;
}

function getFullNumberInSecondRange(number) {
    var fullNumber;

    var tens = parseInt(number / 10);
    var rest = number % 10;    
    if (rest === 0) {
        fullNumber = secondRange[tens - 1][rest];
    } else if (tens === 1) {
        fullNumber = secondRange[tens - 1][rest];        
    } else {
        fullNumber = secondRange[tens - 1][0] + ' e ' + getFullNumberInFirstRange(rest).toLowerCase();
    }

    return fullNumber;
}

function getFullNumberInThirdRange(number) {
    var fullNumber;

    var hundred = parseInt(number / 100);
    var rest = number % 100;
    if (rest === 0) {
        fullNumber = thirdRange[hundred - 1][rest];
    } else if (rest < 10) {
        if (hundred === 1) {
            fullNumber = thirdRange[0][1] + ' e ' + getFullNumberInFirstRange(rest).toLowerCase();
        }
        else {
            fullNumber = thirdRange[hundred - 1][0] + ' e ' + getFullNumberInFirstRange(rest).toLowerCase();
        }
    } else {
        if (hundred === 1) {
            fullNumber = thirdRange[0][1] + ' e ' + getFullNumberInSecondRange(rest).toLowerCase();
        }
        else {
            fullNumber = thirdRange[hundred - 1][0] + ' e ' + getFullNumberInSecondRange(rest).toLowerCase();
        }
    }

    return fullNumber;
}