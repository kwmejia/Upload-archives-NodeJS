import multer from "multer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const nameFile = Date.now();

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
const storage = multer.diskStorage({
  destination: join(CURRENT_DIR, "../../uploads"),
  filename: (req, file, cb) => {
    cb(null, `${nameFile}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default upload.single("image");

export const uploadFile = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const tipo = req.file.mimetype;
    const nombre = `${nameFile}-${req.file.originalname}`;

    console.log(nombre)
    conn.query(
      "INSERT INTO " + req.params.tabla + " set ?",
      [{ tipo, nombre }],
      (err, rows) => {
        console.log(
          err
            ? "Err INSERT INTO " + req.params.tabla + " " + err
            : req.params.tabla + ": Image added!"
        );
        res.json(
          err
            ? { err: "Error al cargar la imagen" }
            : { msg: "Imagen cargada satisfactoriamente" }
        );
      }
    );
  });
};




export const getImages = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM image", (err, rows) => {
      console.log(
        err
          ? "Err SELECT * FROM image" + err
          : "Get images succefull"
      );
      res.json(
        err
          ? { err: "Error al obtener las imagenes" }
          : { data: rows }
      );
    })
  });
}