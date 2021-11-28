const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const multer = require('multer');

app.use(cors())
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}))
//app.use(multer().array());
app.use(express.static(__dirname))

app.get('/test',(req,res)=>{
    res.sendFile(path.join(__dirname,'upload.html'))
})
app.post('/upload',async (req,res)=>{
    console.log(req.body.namec)
    const fileStorageEngine = multer.diskStorage({
        destination: (req,file,cb)=>{
            //cb(null,"./static");
            if(file.fieldname=== "filec"){
                cb(null, "./static");
            }
            if(file.fieldname === "filecc"){
                cb(null, "./static/per");
            }
        },
        filename: (req,file,cb) =>{
            cb(null,file.originalname);
            console.log(req.body.namec,"another")
        },
    });

    console.log(req.body.namec,"great")
    
  //  const upload = multer({storage: fileStorageEngine}).single('filec');
    const upload = multer({storage: fileStorageEngine}).fields([
        {
            name: 'filec',maxCount:1
        },
        {
            name:'filecc',maxCount:1
        }
    ]);
    // upload2()
    upload(req,res, function(err){
        if(err)throw err
        console.log(req.body.namec)
        //Do your database saving here
        //It's in 
        res.status(200).json({
            status: 1,
            message: "Successfully" + req.body.namec        });
    })    
})

app.get('/*', (req,res) =>{ 
    res.send('<h1>HELLO WORLD!m</h1>');
    //res.redirect('http://localhost:8080')
})

const port = process.env.PORT || 5000;
app.listen(port, () =>{console.log(`Server started on port ${port}`)})