import express from "express";
import mysql from "mysql2";
import conn from "express-myconnection";
import router from "./routes/image.routes.js";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


const app = express();
app.set('port', process.env.PORT || 4000)

const dbConfig = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'subidadeimagenes'
}

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(conn(mysql, dbConfig));
app.use('/', router);

app.use('/public', express.static(join(CURRENT_DIR, "../uploads")))

app.listen(app.get('port'), () => {
  console.log("Server running in port", app.get('port'))
})