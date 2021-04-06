import express from 'express'
import multer from 'multer'
import multers3 from 'multer-s3'
import s3 from '../config/index.js'
import { nanoid } from 'nanoid'
import path from 'path'

const router = express.Router()

const upload = multer({
  storage: multers3({
    s3: s3,
    acl: 'public-read',
    bucket: process.env.S3_BUCKET,
    contentType: multers3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
            cb(null, nanoid() + path.extname(file.originalname))
          }
  })
})

router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
        let url = s3.getSignedUrl('getObject', {Bucket: process.env.S3_BUCKET, Key: req.file.key, Expires: 4*60*60})
        res.send({url: url})
        console.log({path: req.file.location, key: req.file.key, metadata: req.file.metadata})
      } else {
        res.send("Missing image file/s");
      }
    })
    
    
    // let storage = multer.memoryStorage()
    // const upload = multer({ storage: storage }).single('file')

    
    // router.post('/upload', upload, (req, res) => {
  //   s3.putObject(
    //     process.env.S3_BUCKET,
    //     req.file.originalname,
//     req.file.buffer,
//     (err, etag) => {
//       if (err) {
  //         return console.log(err)
  //       }
//       s3.presignedUrl(
  //         'GET',
  //         process.env.S3_BUCKET,
//         req.file.originalname,
//         4 * 60 * 60,
//         (err, presignedUrl) => {
  //           if (err) {
//             return console.log(err)
//           }
//           res.status(200).json({ fileUrl: presignedUrl })
//           console.log(req.file.buffer)
//         }
//       )
//     }
//   )
// })

router.get('/status', (req, res) => {
  res.status(200).json('OK')
})

export default router
