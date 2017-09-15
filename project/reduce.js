// Filter takes an array and returns another array.
// Each item is run against a predicate. If the function returns true, the item is added to the new array.
// For example:
// [ 5, 10, 15, 20 ].filter(item => item > 10)  => returns [ 15, 20 ]

// TODO: Create a filter function using only reduce
// I have a prices array, I only want the items with a price higher than 6.

// GOOD LUCK

const prices = [ 2.99, 5.99, 7.20, 15, 2000, 0.99 ]


const filter = ( filterFunction, array ) => array.reduce( (newArray, item) => {
  return filterFunction( item ) ? newArray.concat( item ) : newArray
}, [] )

const higherThan6 = price => price > 6 

const pricesOver6 = filter( higherThan6, prices )

console.log(pricesOver6)
