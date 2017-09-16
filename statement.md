## Introduction

You may here a lot about functional programming lately. Functional programming relies on writing pure functions. So, what makes a function pure ?

 - No side effects, doesn’t change anything outside of its scope
 - Gets its data from its arguments only
 - Return a value or another function

These things make a pure function a lot easier to test, because it will always return the same value given the same arguments. In Javascript, you can write pure functions, even if Javascript is not a purely functional programming language. It just takes more discipline to stick with it.

There are a few methods that you can learn in order to write pure functions. In this article, we will look a the *Array.prototype.reduce()* function.

## reduce()

Reduce is a well named method. It takes an array and **reduces** it to a single value.

It takes a function as its first parameter. This function can take 4 arguments. It can also take a optional second argument, which is the initial value to the first call of the function. Like so :

`[0, 1, 2, 3].reduce( function( accumulator, currentValue, currentIndex, array ){}, [ initialValue ])`

The accumulator receives the value returned by the callback function after each iteration. It accumulates it to the previous value it had.

The currentValue is the current value being processed in the array.
The currentIndex is the current index being processed in the array.
array is the target array reduce is called on.

The initialValue is an optional value that indicates if the first value should be different than the first index of the array. If you supply this, reduce will start at index 1 in the array.

So, for each element in the array, reduce executes the callback provided in its first argument.
Let’s look at a simple example.
```javascript runnable
const sum = [0,2,3,4,5].reduce( (prev, curr) => prev + curr) 

console.log(sum)
```

Let's decompose this step by step to understand what it does under the covers.

First call => returns 0 , accumulator = 0

Second call => returns 2, accumulator = 0 + 2 = 2

Third call => returns 3, accumulator = 2 + 3 = 5

Fourth call => returns 4, accumulator = 5 + 4 = 9

Fifth call =>; returns 5, accumulator = 9 + 5 = 14

**No more items, returns 14.**

```javascript runnable
const minus = [0, 2, 3, 4, 5].reduce( ( prev, curr ) => prev - curr ) 

console.log(minus)
```

**This one returns -14 !**
## reduce() with functions !

The most interesting aspect of reduce is that it allows you to compose function. You can use the result of a function, use it in another function, then use that in another function …

For example, let’s create 3 functions. The function *plus3* takes a number and adds 3. *double* returns the number multiplied by 2 and *minus5* substracts 5 to the number. Then, we can create an array of functions and call reduce on it.

```javascript runnable
const plus3 = x => x + 3

const double = x => x * 2

const minus5 = x => x - 5

const result = [plus3, double, minus5].reduce( (value, nextFunction) => nextFunction(value), 0 )

console.log(result)
```

Can you guess what this is going to return ?

We start at 0 and call plus3 => 0 + 3 = 3

We then call double with that value => 3 * 2 = 6

Finally we call minus5 => 6 - 5 = 1

Pretty cool, right ?!

Javascript also gives you a reduceRight function. It works like reduce but you start from the last item of the array. Like so:
```javascript runnable
const reduceRight = [plus3, double, minus5].reduceRight( (value, nextFunction) => nextFunction(value), 0)

console.log(reduceRight)
```


The order matters when you are doing such calculations. Of course, here we give 0 as the starting point ( which is the argument given to the first function called in our array ). But we don't have to start at 0:

```javascript runnable
const starting5 = [plus3, double, minus5].reduce( (value, nextFunction) => nextFunction(value), 5)

console.log(starting5)
```

Composition is a key concept of functional programming. This is outside the scope of this article, but understanding how to use reduce can open a lot of possibilities in Javascript.

By using a tool like reduce, you can create small functions and easily combine them to create more complicated and complete functions. Creating small functions makes them easier to test, easier to debug and assures you that they only do one thing.

## Creating map() from reduce()

The *map* function iterates through an array and returns a new array. Each element in the original array are passed to a function. For example:

```javascript runnable
const double = [1, 2, 3, 4].map( x => x *2 )

console.log(double)
```

We can re-create this functionality with reduce:

```javascript runnable

const double = item => item * 2

const map = ( mappingFunction, array ) => array.reduce( (acc, item ) => {
    return acc.concat( mappingFunction( item ) )
}, [])

const doubleWithReduce = map( double, [2, 4, 6] )

console.log( doubleWithReduce )

```

Can you see how interesting reduce makes things? How we can compose functions with it? Creating small and reusable pieces to create bigger functions?

@[Can you create a filter function with reduce only?]({"stubs": ["reduce.js"], "command": "node reduce.js"})


::: Unfold to see my solution!
 
```javascript runnable
const prices = [ 2.99, 5.99, 7.2, 15, 2000, 0.99 ]

const filter = ( filterFunction, array ) => array.reduce( (newArray, item) => {
  return filterFunction( item ) ? newArray.concat( item ) : newArray
}, [] )

const higherThan6 = price => price > 6 
const pricesOver6 = filter( higherThan6, prices )
console.log(pricesOver6)
```

:::
