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
  const file = req.file;
  const retVal = {
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
  res.json(retVal);  
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
