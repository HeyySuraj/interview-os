
function firstUniqueChar(input){
    const freq = {} ; 
  
    for(let ch of input){
        freq[ch] = (freq[ch] || 0) + 1;
    }

  for(let i=0; i<input.length; i++){
      const ch = input[i];
      if(freq[ch] === 1) return i;
  }

  return null;
}
const input = "swiss"; // aabbcc, javascript
console.log(firstUniqueChar(input))

// ----------------------------------------------------
// introduction 
// let const var keywords and theire scope 
// What is closure
// arrow funtions vs noraml function 
// 
// primitive vs not primitive 
// in js is everything is object
// how network thread work. if u hit google.com how it work in backedn
// what is prototype inheritance? 
// he asked about cross site scripting 
// and then security practive to follow to secure the application