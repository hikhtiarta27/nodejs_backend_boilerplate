let n = 12
let array = []
let tmp = 2
let x = 2
for (let i = 1; i <= n; i++) {
  if (i % 5 == 0 || i % 5 == 2) {
    array.push("*")
  } else array.push(i.toString())
}

console.log(array)

let listString = "{([])}[](({())){{[[]]}}"

//{ (
// } )

console.log(isParenthesis(listString))

function isParenthesis(listString) {
  if (listString % 2 == 1) return false
  if (listString.length == 0) return false
  let arr = []
  let expect = []
  for (let i = 0; i < listString.length; i++) {
    if (listString[i] == "(") expect.push(")")
    else if (listString[i] == "{") expect.push("}")
    else if (listString[i] == "[") expect.push("]")
    if (i != 0) {
      if (listString[i] == expect[expect.length - 1]) {
        arr.pop()
        expect.pop()
      } else {
        arr.push(listString[i])
      }
    } else {
      arr.push(listString[i])
    }
  }
  if (arr.length == 0) return true
  else return false
}

// console.log(reverse(123))

function reverse(n) {
  var temp = 0
  while (n) {
    // console.log(temp)
    temp *= 10
    temp += n % 10
    n = Math.floor(n / 10)
  }
  return temp
}

function removeElement(nums = [3,2,2,3,4,4,4,2,3], val = 3) {
  var tot = 0
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] == val) {
      nums[i] = 0
      tot++
    }
  }
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] < nums[i + 1]) {
      var temp = nums[i + 1]
      nums[i + 1] = nums[i]
      nums[i] = temp
    }
  }
  console.log(nums)
  return tot
}

console.log(removeElement())

// var checkIfExist = function(arr) {
//   let set = new Set();
//   for (let i = 0; i < arr.length; i++) {
//       if (set.has(arr[i] << 1) || set.has(arr[i] / 2)) return true;
//       set.add(arr[i]);
//   }
//   return false;
// };

var checkIfExist = function(arr) {
  const hashTable = {};
  
  for(let i = 0; i < arr.length; i ++) {
    const currValue = arr[i];
    console.log(hashTable)
    if(hashTable[currValue] !== undefined) {
      return true
    }
    hashTable[currValue / 2] = currValue;
    hashTable[currValue * 2] = currValue;
  }  
  return false;
};



console.log(checkIfExist([10,2,5,3]))
