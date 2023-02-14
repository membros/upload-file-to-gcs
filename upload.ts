import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  keyFilename: "./service_account.json",
});

const bucketName = ""

const bucket = storage.bucket(bucketName);

app.post(
    "/upload-file",
    async function (req, res, next) {
      const { base64Image, fileName, fileType } = req.body;
  
      var file = bucket.file("images/" + fileName);
  
      const imageBuffer = Buffer.from(base64Image, "base64");
  
      const url = `${file.storage.apiEndpoint}/bucketName/${file.name}`;
  
      file
        .save(imageBuffer, {
          public: true,
          contentType: fileType,
        })
        .then(() => {
          return res.json(url.replace(/ /g, "%20"));
        })
        .catch((error) => {
          return res.status(500).send("Image upload fail.");
        });
    }
  );
