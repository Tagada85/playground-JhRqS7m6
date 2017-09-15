## Introduction

You may here a lot about functional programming lately. Functional programming relies on writing pure functions. So, what makes a function pure ?

 - No side effects, doesn’t change anything outside of it’s scope</li>
 - Gets its data from its arguments only<
 - Return a value or another function

These things make a pure function a lot easier to test, because it will always return the same value given the same arguments. In Javascript, you can write pure functions, even if Javascript is not a purely functional programming. It just takes more discipline to stick with it.

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
[0,2,3,4,5].reduce( (prev, curr) => prev + curr) 
```
First call =&gt; returns 0 , accumulator = 0

Second call =&gt; returns 2, accumulator = 0 + 2 = 2

Third call =&gt; returns 3, accumulator = 2 + 3 = 5

Fourth call =&gt; returns 4, accumulator = 5 + 4 = 9

Fifth call =&gt; returns 5, accumulator = 9 + 5 = 14

<strong>No more items, returns 14.</strong>
<pre><code>[0, 2, 3, 4, 5].reduce( ( prev, curr ) =&gt; prev - curr ) 
</code></pre>
<strong>This one returns -14 !</strong>
<h3>Reduce with functions !</h3>
The most interesting aspect of reduce is that it allows you to compose function. You can use the result of a function, use it in another function, then use that in another function …

For example, let’s create 3 functions.
<pre><code>const plus3 = x =&gt; x + 3

const double = x =&gt; x * 2

const minus5 = x =&gt; x - 5
</code></pre>
Let’s use reduce to compose a function including those three:
<pre><code>[plus3, double, minus5].reduce( (value, nextFunction) =&gt; nextFunction(value), 0 )
</code></pre>
Can you guess what this is going to return ?

We start at 0 and call plus3 =&gt; 0 + 3 = 3

We then call double with that value =&gt; 3 * 2 = 6

Finally we call minus5 =&gt; 6 - 5 = 1

Pretty cool, right ?!

Javascript also gives you a reduceRight function. It works like reduce but you start from the last item of the array. So this:
<pre><code>[plus3, double, minus5].reduceRight( (value, nextFunction) =&gt; nextFunction(value), 0)
</code></pre>
will return …. -7

The order matters when you are doing such calculations. Of course, here we give 0 as the starting point ( which is the argument given to the first function called in our array ), but that is not mandatory
<pre><code>[plus3, double, minus5].reduce( (value, nextFunction) =&gt; nextFunction(value), 5)
</code></pre>
This will return 11.

By using a tool like reduce, you can create small functions and easily combine them to create more complicated and complete functions. Creating small functions makes them easier to test, easier to debug and assures you that they only do one thing.

I hope this article gives you an idea of the power of the reduce function!

Feel free to share and comment.
Have a nice day!
