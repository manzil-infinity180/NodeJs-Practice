const express = require('express');
const fs = require('fs');
const app = express();
const {Readable,Writable,Transform,pipeline} = require('stream');


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Stream Instance 
const readableStream = fs.createReadStream('input.txt');
const writableStream = fs.createWriteStream('output.txt');

// data processing logic 
const transformData = new Transform({
  transform(chunk,encoding,callback){

    // modify the data that is comming from chunks 

    const modifyData = chunk.toString('utf-8').toUpperCase(); 
    // chunk - buffer data --> chunk.toString() -- converting buffer to string ---> then to upper case 
    this.push(modifyData);
    callback();
  }
});

// setting up the stream pipeline 

  pipeline(
    readableStream,
    transformData, // if you transform any data then mentioned it (OPTIONAL)
    writableStream,
    

  
    (err)=>{
      if(err) {
        console.log('Pipeline Failed ! '+ err);
      }else{
        console.log('Pipeline Succeeded');
      }
  
    }
  )
  



// app.get('/',(req,res)=>{
//   res.send('Hello Bro !!! head over to /read');
// })
// app.get('/read',(req,res)=>{
//   const read = fs.createReadStream('test.txt');
//   read.pipe(res);
//   });




app.listen(3000,()=>{
  console.log('listening on port 3000');
})