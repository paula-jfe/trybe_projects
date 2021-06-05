// Desafio 1
function compareTrue(boolean1, boolean2) {
  if (boolean1 & boolean2 === true) {
    return true;
  } else {
    return false;
  }
}

/* console.log(compareTrue(true, true)); */

/* ________________________________________________________________________________ */

// Desafio 2
function calcArea(base, height) {
  let area = (base * height) / 2;
  return area;
}

/* console.log(calcArea(2, 3)); */

/* ________________________________________________________________________________ */

// Desafio 3
function splitSentence(string) {
  let arrayStrings = string.split(' ');
  return arrayStrings;
}

/* console.log(splitSentence('família é amor')); */

/* ________________________________________________________________________________ */

// Desafio 4
function concatName(arrayStrings) {
  let primeiroEUltimo = arrayStrings[arrayStrings.length - 1] + ', ' + arrayStrings[0];
  return primeiroEUltimo;
}

/* console.log(concatName(['Lucas', 'Cassiano', 'Ferraz', 'Paolillo']));  */

/* ________________________________________________________________________________ */

// Desafio 5
function footballPoints(wins, ties) {
  let vitoria = 3;
  let empate = 1;
  let campeonato = 0;
  campeonato = (wins * vitoria) + (ties * empate);
  return campeonato;  
} 

/* console.log(footballPoints(3, 11)); */

/* ________________________________________________________________________________ */

// Desafio 6
// Encontrar o maior número da array
// Contar quantas vezes se repete
function highestCount(arrayNumeros) {
  let maiorNumero = 0;
  let contNumero = 0;
  for (let i = 0; i < arrayNumeros.length; i += 1) {
    if (maiorNumero < arrayNumeros[i]) {
      maiorNumero = arrayNumeros[i];
    } 
  }
  for (let j = 0; j < arrayNumeros.length; j += 1) {
    if (maiorNumero === arrayNumeros[j]) {
      contNumero = contNumero + 1;              
    } 
  }
  return contNumero;
}

/* console.log(highestCount([9, 1, 2, 3, 9, 5, 7])); */

/* ________________________________________________________________________________ */

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let distanciaCat1 = Math.abs(cat1 - mouse);
  let distanciaCat2 = Math.abs(cat2 - mouse);
  if (distanciaCat1 == distanciaCat2) {
    return 'os gatos trombam e o rato foge';
  } else if (distanciaCat2 < distanciaCat1) {
    return 'cat2';
  } else {
    return 'cat1';
  }
}

/* console.log(catAndMouse(5, 4, 7)); */

/* ________________________________________________________________________________ */

// Desafio 8
function fizzBuzz(arrayNumeros) {
  let retorno = [];
  for (let i = 0; i < arrayNumeros.length; i += 1) {
    if (arrayNumeros[i] % 3 === 0 && arrayNumeros[i] % 5 === 0) {
      retorno.push('fizzBuzz');
    } else if (arrayNumeros[i] % 3 === 0) {
      retorno.push('fizz');
    } else if (arrayNumeros[i] % 5 === 0) {
      retorno.push('buzz');
    } else {
      retorno.push('bug!');
    }
  }
  return retorno; 
}

/* console.log(fizzBuzz([5, 3, 15, 13])); */

/* ________________________________________________________________________________ */

// Desafio 9
function encode(stringEncode) {
  let arrayEncode = stringEncode.split('');
  let novoArray = [];
  let novaString = '';
  for (let i = 0; i < arrayEncode.length; i += 1) {
    if (arrayEncode[i] == "a") {
      novoArray.push(1);
    } else if (arrayEncode[i] == "e") {
      novoArray.push(2);
    } else if (arrayEncode[i] == "i") {
      novoArray.push(3);
    } else if (arrayEncode[i] == "o") {
      novoArray.push(4);
    } else if (arrayEncode[i] == "u") {
      novoArray.push(5);
    } else {
      novoArray.push(arrayEncode[i]);
    }
  }
  novaString = novoArray.join('');
  return novaString;
} 

/* console.log(encode('Oi, tudo bem?')); */

/* ________________________________________________________________________________ */

function decode(stringDecode) {
  let arrayDecode = stringDecode.split('');
  let novoArray = [];
  let novaString = '';
  for (let i = 0; i < arrayDecode.length; i += 1) {
    if (arrayDecode[i] == 1) {
      novoArray.push('a');
    } else if (arrayDecode[i] == 2) {
      novoArray.push('e');
    } else if (arrayDecode[i] == 3) {
      novoArray.push('i');
    } else if (arrayDecode[i] == 4) {
      novoArray.push('o');
    } else if (arrayDecode[i] == 5) {
      novoArray.push('u');
    } else {
      novoArray.push(arrayDecode[i]);
    }
  }
  novaString = novoArray.join('');
  return novaString;
}

/* console.log(decode('12345')); */

/* ________________________________________________________________________________ */

// Desafio 10
/* https://www.it-swarm.dev/pt/javascript/como-criar-um-objeto-dinamico-em-um-loop/968021744/  */

function techList(arrayTech, name) {
  let arrayOrdenado = arrayTech.sort();
  let aux = {};
  let objects = new Array();
  if (arrayOrdenado.length == 0) {
    return 'Vazio!';
  } else {
      for (let i = 0; i < arrayOrdenado.length; i += 1) {
        /* aux.tech = arrayOrdenado[i]; 
        aux.name = name; */
        aux = {
          tech:arrayOrdenado[i], 
          name:name
        }
        objects[i] = aux; 
        /* Object.assign({},aux); esse método copia um objeto*/
      }
      return objects;
  } 
}

/* console.log(techList(['React', 'Jest', 'HTML', 'CSS', 'JavaScript'], 'Jessica')); */

/* ________________________________________________________________________________ */

// Desafio 11
function generatePhoneNumber(arrayTelefone) {
  let aux = {};
  numeroTelefone = [];
  contador = [];
  if (arrayTelefone.length != 11) {
    return 'Array com tamanho incorreto.';
  }
  for (let i = 0; i < arrayTelefone.length; i += 1) {
    if (arrayTelefone[i] < 0 || arrayTelefone[i] > 9) {
      return 'não é possível gerar um número de telefone com esses valores';
    } else {
      aux[arrayTelefone[i]] = aux[arrayTelefone[i]] ? aux[arrayTelefone[i]] + 1 : 1;
      contador.push(Object.values([aux[arrayTelefone[i]]]));
    }
  }
  for (let j = 0; j < contador.length; j += 1) {
    if (contador[j] >= 3) {
      return 'não é possível gerar um número de telefone com esses valores';
    } else {
      numeroTelefone = '(' + arrayTelefone[0] + arrayTelefone[1] + ') ' + arrayTelefone[2] + arrayTelefone[3] + arrayTelefone[4]+ arrayTelefone[5] + arrayTelefone[6] + '-' + arrayTelefone[7] + arrayTelefone[8]+ arrayTelefone[9] + arrayTelefone[10];
    }
  }
  return numeroTelefone;
}
      
/* console.log(generatePhoneNumber([1, 2, 3, 4, 5, 2, 7, 7, 0, 0, 1])); */

/* Exemplo Isaac; 
const repeated = {};
const numbers = [9, 3, 3, 8];

for (let i in numbers) {
  repeated[numbers[i]] = repeated[numbers[i]] ? repeated[numbers[i]] + 1 : 1;
  objeto[posição_numbers[0=9]] = objeto[posição_numbers[0=9]]? Se true objeto[posição_numbers[0=9]] + 1, se false, 1. 
}

console.log(repeated); */

/* ________________________________________________________________________________ */

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  lado1 = lineA + lineB;
  lado2 = lineB + lineC;
  lado3 = lineC + lineA;
  diflado1 = Math.abs(lineA - lineB);
  diflado2 = Math.abs(lineB - lineC);
  diflado3 = Math.abs(lineC - lineA);
  if ((lineC < lado1 && lineC > diflado1) || (lineB < lado3 && lineB > diflado3) || (lineA < lado2 && lineA > diflado2)) {
    return true;
  } else {
    return false;
  }
}

/* console.log(triangleCheck(10, 14, 8)); */

/* ________________________________________________________________________________ */

/* http://wbruno.com.br/expressao-regular/remover-tudo-oque-nao-digitonumeros-de-string-javascript/ */
// Desafio 13
function hydrate(barDaTrybe) {
  let numeros = barDaTrybe.replace(/[^\d]+/g,',');
  let array = numeros.split(',');
  array.pop();
  let novoArray = [];
  let soma = 0;
  for (let i = 0; i < array.length; i += 1) {
    novoArray.push(parseInt(array[i]));
  }
  for (let j = 0; j < novoArray.length; j += 1) {
    soma += novoArray[j];
  }
  if (soma === 0) {
    return 'Nenhum copo de água';
  } else if (soma === 1) {
    return '1 copo de água';
  } else {
    return soma + ' copos de água';
  }
}

/* console.log(hydrate('2 cachaça, 5 cervejas e 1 copo de vinho')); */

/* ________________________________________________________________________________ */

 module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  generatePhoneNumber,
  techList,
  highestCount,
  hydrate,
  splitSentence,
  triangleCheck,
} 
