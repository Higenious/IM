const Router = require('Router');
const router = Router();
const policyController = require('../controller/policyController')
const multer = require('multer');



/** uploading csv file in folder */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname;
      cb(null, fileName)
    }
  })
   
var upload = multer({ storage: storage })



/** routes  */
router.post('/uploadcsv', upload.single('myFile'), policyController.uploadCsv);
router.post('/getpolicyinfo', policyController.getPolicyInfo);
router.get('/getusers', policyController.getUsers);



/** CPU Utilization */




/** Export routes */
module.exports = router;

