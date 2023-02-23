const multer = require("multer");
const path = require("path");

const nameFile = Date.now();
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads"),
  filename: (req, file, cb) => {
    cb(null, `${nameFile}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("image");

exports.uploadFile = (req, res) => {
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