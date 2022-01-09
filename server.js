var express = require('express');
var cors = require('cors');
require('dotenv').config()

//* Multer Middleware
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/public/uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').slice(-1)[0])
  }
})

const upload = multer({ storage })
//* --------------------------------------------------------------------------

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.send({
    name: req.file.originalname,
    size: parseInt(req.file.size),
    type: req.file.mimetype
  })
})

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
