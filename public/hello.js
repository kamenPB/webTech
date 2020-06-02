"use strict";
var msg = "hello world!"
console.log(msg);


var number = 42;
console.log(Math.pow(number, 2));


function square(n) {
  return n*n;
}
console.log(square(42));


var list = [3, 9, 7, 5, 10, 8]; // sum is 42
function addList(list){
  var sum = 0;
  for(var i = 0; i<list.length; i++){
    sum += list[i];
  }
  return sum;
}
console.log(addList(list));
