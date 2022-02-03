/**
 * Write a function that takes a string of parentheses, and determines if the order of the parentheses is valid. The function should return true if the string is valid, and false if it's invalid.
 * 
 * Examples:
 * "()"              =>  true
 * ")(()))"          =>  false
 * "("               =>  false
 * "(())((()())())"  =>  true
 */

function validParentheses(parens) {
    let openedCount = 0;
    
    for (const letter of parens) {
        if (letter === '(') {
          openedCount++;
          continue;
        }
      
        if (!openedCount) {
          return false;
        }
      
        openedCount--;
    }
    
    return !openedCount;
  }