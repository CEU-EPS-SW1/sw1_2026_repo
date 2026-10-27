const fs = require("fs")

fs.promises
  .readFile("test.txt", "utf8")
  .then(processFileText)
  .catch(handleReadError);

function processFileText(){
  console.log("ok")
}
function handleReadError(e){
  console.log(e);
}