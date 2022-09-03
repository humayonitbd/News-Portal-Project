const numbers  = [ 1, 3, 5, 3, 2, 10, 12];
numbers.sort(function(a,b){
    return b-a;
})
console.log(...numbers)