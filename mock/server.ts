import jsonServer from "json-server";
import multer from "multer";

const PORT = 4000;
const server = jsonServer.create();
const middlewares = jsonServer.defaults({ static: `${__dirname}/public` });
const storage = multer.diskStorage({
  destination: `${__dirname}/public/image`,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

server.use(middlewares);

server.post("/public/image", upload.any(), (req, res) => {
  if (req.files) {
    // データ確認用
    console.log(req.files);
    res.status(200).json("Upload Success");
  } else {
    res.status(400).json("Upload Failure");
  }
});

server.listen(PORT, () => {
  console.log(`JSON Server is running PORT ${PORT}`);
});
