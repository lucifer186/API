 const uploadFile = require("../middleware/upload");
 const videofile = require('../middleware/gTTs')
 const audioVideo = require('../middleware/audiovideos')
 const fs = require('fs')
 const Gtts = require('gtts');
 const  fluent_ffmpeg = require('fluent-ffmpeg')
 const { exec } = require('child_process')

// const { execSync } = require('child_process')
 

 


  exports.createCookies = async (req,res) =>{
    // res.setHeader('Content-Type', 'text/plain');
      await res.writeHead(200,{
        'Set-Cookie':"token=encryptedstring; HttpOnly",
        "Access-Control-Allow-Credentials":"true"
      }).send();
      // res.cookie('session_id','123456')
      // res.status(200).send({
        
      //     status: "ok",
      //     message: "Storage Created Successfully"
      
      
      // })
     
  }

  exports.getUpload = async (req, res) => {
    try {
      await uploadFile(req, res);
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      res.status(200).send({
        status: "ok",
        message: "Uploaded the file successfully: " + req.file.originalname,
        file_path: "/upload/" +req.file.originalname
    
      });
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  };
  exports.getListFiles = (req, res) => {
    const directoryPath = __basedir + "/uploads/";
    fs.readdir(directoryPath, function (err, my_uploaded_files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      let fileInfos = [];
      my_uploaded_files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: "http://localhost:8080/my_uploaded_files/" + file,
        });
      });
      res.status(200).send(fileInfos);
    });
  };
  exports.download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/uploads/";
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
      return  res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
      

    })
    // res.status(200).send({message:"file will downloading"});
  };

  exports.mergeAudionandVideo =  async (req,res) =>{
    // try{
    //  await audioVideo(req,res);
     var uploadMultiple =  audioVideo.fields([
      { name: 'file' },
      { name: 'file'},
    ]);
    //  let output = ""
    //  var flag = false
     
     uploadMultiple(req, res, (err) => {
         if (err) {
             console.log(err)
         }
         else {
           console.log(req.files)
            //  output =
            //    Date.now() + "output" + path.extname(req.file.video[0].path);
            //  console.log(req.file.video[0].path)
            //  console.log(req.file.audio[0].path)
  
            //  exec(`ffmpeg -i ${req.file.video[0].path} -stream_loop -1 -i ${req.file.audio[0].path} -map 0:v -map 1:a -c copy -shortest ${output}`, (err, stderr, setdout) => {
            //      if (err) {
            //          console.log(err)
            //      }
            //      else {
            //          console.log("conversion completed")
            //          flag = true
            //      }
            //  });
         }
     })
  
  //    if (flag) {
  //   res.status(200).send({
     
  //      status: "ok",
  //      message: "Video and Audio Merged Successfully",
  //      video_file_path:  __basedir+ "/uploads/"+ Math.random()+"newMp4"
  //  })
  // }
        // res.download(output, () => {
        //     console.log("file is downloaded")
        // })
        
    

  // } catch (err) {
  //   res.status(500).send({
  //     message: `Could not upload the file:`,
  //   });
  // }

}
  

  exports.postcreateAudiofile =  async (req,res) =>{
   
      let fileName =  __basedir + "/uploads/" + req.file;
      const gtts = new Gtts(fileName, 'en');
      outputfilepath  = __basedir +  "/uploads/"+ Math.random() + "audio.mp3" ;
      await gtts.save(outputfilepath, function(err, result) {
        if(err){
          fs.unlinkSync(outputfilepath);
          res.send('unable to convert audio')
        }
 
      // res.status(200).send({
      //    status: "ok",
      //    message: "text to speech converted",
      //    file_path: "/uploads/"+ Math.random() + "audio.mp3"  
      //  });
       res.download(outputfilepath, (err) =>{
         if(err){
           fs.unlinkSync(outputfilepath)
           res.send("Unable to download the file ")
         }
        //  fs.unlinkSync(outputfilepath)
 
       }  )
 
     })
  
  }

exports.craeteVideo =  async(req,res) => {
 await videofile(req,res);

  var list = ""
 
var listFilePath =  __basedir+ '/uploads/';
 
var outputFilePath =  __basedir+ '/uploads/'+ Date.now() + 'output.mp4'
  if(req.files){
    console.log(req.files)
      // req.files.forEach(file => {

      //     list += `file ${file.filename}`
      //     list += "\n"
          
      // });

      var writeStream = fs.createWriteStream(listFilePath)

      writeStream.write(list)

      writeStream.end()

      exec(`ffmpeg -safe 0 -f concat -i ${listFilePath} -c copy ${outputFilePath}`, (error, stdout, stderr) => {
        
          if (error) {
            return res.status(400).send({ message: "Please upload a files!" });
          }
          else{
              console.log("videos are successfully merged")
          res.download(outputFilePath,(err) => {
              if(err) throw err

              // req.file.forEach(file => {
              //     fs.unlinkSync(file.path)                    
              // });

              // fs.unlinkSync(listFilePath)
              // fs.unlinkSync(outputFilePath)

            

          })
      }
          
      })
  }
}


