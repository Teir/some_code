/**
 * This time we want to write calculations using functions and get the results. Let's have a look at some examples:
 * 
 * seven(times(five())); // must return 35
 * four(plus(nine())); // must return 13
 * eight(minus(three())); // must return 5
 * six(dividedBy(two())); // must return 3
 * 
 * Requirements:
 * 
 * There must be a function for each number from 0 ("zero") to 9 ("nine")
 * There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy
 * Each calculation consist of exactly one operation and two numbers
 * The most outer function represents the left operand, the most inner function represents the right operand
 * Division should be integer division. For example, this should return 2, not 2.666666...:
 * 
 * eight(dividedBy(three()));
 */

 function makeNumberFunction(num) {
    return (arg) => {
      if (arg !== undefined) {
        return arg(num);
      }
      return num;
    };
  }
  
  const zero = makeNumberFunction(0);
  const one = makeNumberFunction(1);
  const two = makeNumberFunction(2);
  const three = makeNumberFunction(3);
  const four = makeNumberFunction(4);
  const five = makeNumberFunction(5);
  const six = makeNumberFunction(6);
  const seven = makeNumberFunction(7);
  const eight = makeNumberFunction(8);
  const nine = makeNumberFunction(9);
  
  function plus(rightNum) {
    return (leftNum) => leftNum + rightNum;
  }
  function minus(rightNum) {
    return (leftNum) => leftNum - rightNum;
  }
  function times(rightNum) {
    return (leftNum) => leftNum * rightNum;
  }
  function dividedBy(rightNum) {
    return (leftNum) => Math.floor(leftNum / rightNum);
  }