import express from "express";
import upload, { uploadFile, getImages } from "../controllers/image.controller.js";


const router = express.Router();

router.post('/images/:tabla', upload, uploadFile);

router.get('/images', getImages)




export default router;