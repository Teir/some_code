/**
 * In this Kata, you will be given an array of integers and your task is to return the number of arithmetic progressions of size 3
 * that are possible from that list. In each progression, the differences between the elements must be the same.
 * [1, 2, 3, 5, 7, 9] ==> 5
 * // [1, 2, 3], [1, 3, 5], [1, 5, 9], [3, 5, 7], and [5, 7, 9]
 * All array elements will be unique and sorted. More examples in test cases.
 */

 function solve(arr){
    let count = 0;
    
    if (arr.length > 2) {
      const max = arr[arr.length - 2];
    
      for (let i = 1; i < max; i++) {
        count += getProgressionsCount(arr, i);
      } 
    }
    
    return count;
  }
  
  function getProgressionsCount(arr, num) {
    return arr.reduce((result, val, index) => {
      const nextVal = val + num;
      
      if (arr.includes(nextVal, index + 1) && arr.includes(nextVal + num, index + 2)) {
        return result + 1;
      }
      
      return result;
    }, 0);
  }