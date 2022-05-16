const path = require('path');

const express = require('express');
const productsCOntroller = require('../controllers/file')

const router = express.Router();

router.post('/create_new_storage', productsCOntroller.createCookies )

router.get('/my_uploaded_files', productsCOntroller.getListFiles )

router.post('/upload_files', productsCOntroller.getUpload )

router.post('/text_file_to_audio',   productsCOntroller.postcreateAudiofile )

// router.post('/merge_videos',   productsCOntroller.craeteVideo)

// router.post('/merge_video_and_audio', productsCOntroller.mergeAudionandVideo )

router.get('/download_file/:name  ',productsCOntroller.download )



module.exports = router