const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });



app.post('/upload', function (req, res) {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    uploadPath = __dirname + '/uploads/' + sampleFile.name;

    console.log(sampleFile, uploadPath)

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, (err) => {
        if (err) {
            console.log("erroring out", err)
            return res.status(500).send(err);
        }else {
        res.send('File uploaded!');
        }
    });
});

app.post("/test" , (req, res)=>{
    return res.json(req.body)
})

app.listen(8000)