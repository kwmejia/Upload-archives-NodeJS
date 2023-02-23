import express from "express";
import { uploadFile, upload } from "../controllers/image.controller.cjs";


const router = express.Router();

router.post('/images/:tabla', upload, uploadFile);
// router.get('/images',(req,res) => z);


export default router;