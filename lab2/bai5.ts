type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;

  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = parseFloat(input1 as string) + parseFloat(input2 as string);
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
}

const combineNumber = combine(30, 26, 'as-number');
console.log(combineNumber); 

const combineStringNumber = combine('30', '26', 'as-number');
console.log(combineStringNumber); 

const combineText = combine('Typescript Vs ', 'Javascript', 'as-text');
console.log(combineText);