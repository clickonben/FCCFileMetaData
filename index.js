const express = require('express');
const multer  = require('multer');
const cors = require('cors');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' })
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    const file = req.file;
    const fileInfo = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  }

  fs.unlink(file.path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  
    console.log('File deleted successfully');
  });

  res.json(fileInfo);  
    
  } catch (err) {
    console.error(err.stack);
    if(process?.env?.ENVIRONMENT === 'DEV') {
      res.status(500).send(err.stack);
    }
    else {
      res.status(500).send("Server Error");
    }
  }  
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
