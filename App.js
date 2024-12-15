const path = require('path');
const express = require('express');
const appPort = require('./config/main').appPort;
const app = express();
const sequelize = require('./config/Sequelize');
const bodyParser = require('body-parser');
const multer = require('multer');
const profileImgDisk = require('./config/File').profileImgDisk;

const authRoutes = require('./Routes/Auth');
const userRoutes = require('./Routes/User');
const notficationRoutes = require('./Routes/Notfication');
const initAdmin=  require('./Adit/initialization');


app.use(bodyParser.json());
const auth = require('./Controllers/AuthController').auth;
const isAdmin = require('./Controllers/AuthController').isAdmin;

app.use(express.static(path.join(__dirname,'images')));

app.use('/auth',authRoutes);
app.use(auth);


app.use(multer({storage: profileImgDisk.fileStorage , fileFilter: profileImgDisk.fileFilter}).single('image'));

app.use('/user',userRoutes);
app.use('/notfication',isAdmin,notficationRoutes);

sequelize.authenticate()
.then(()=>{
    // sequelize.sync({force: true})
    sequelize.sync()
    .then(()=>{
        initAdmin(()=>{ app.listen(appPort);console.log('APP IS RUNNING ON URL: http://localhost:'+appPort+'/');});
    }).catch(err=>{
        console.log('ERROR IN DB SEQUELIZE CONNECTION WITH SYNC');
    })
})
.catch(err=>{
    console.log('ERROR IN DB SEQUELIZE CONNECTION WITH AUTHENTICATE');
});