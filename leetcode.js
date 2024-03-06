// // 3014

// let  word = "xycdefghij";
// let sum=1;
// for(let i=1;i<word.length;i++){
//    if(i>=0) sum++
//    if(i>=8) sum++
//    if(i>=16) sum++
//    if(i>=24) sum++
//    if(i>=32) sum++
// }console.log(sum);

//3046

let nums = [1,1,1,1]

const map =new Map()

for(let num of nums){
   map.set(num, (map.get(num) || 0) + 1)
}

for(let count of map.values()){
   if(count> 2){
      return false 
   }
}
return true