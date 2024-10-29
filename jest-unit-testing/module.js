// module.js

function sum(a, b) {
  return a + b;
}

function div (a, b){
  return a / b;
}

function containsNumbers(text){
  for (let i = 0; i < text.length; i++) {
    const ascii = text.charCodeAt(i);
    if (String(ascii) >= '48' && String(ascii) <= '57')
      return true
  }
  return false;
}

export default { sum, div, containsNumbers };
