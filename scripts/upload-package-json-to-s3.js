const { S3Client } = require("@aws-sdk/client-s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
require('dotenv').config()

const credentials = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
};

const fileToUpload = "package.json";

async function main() {
  // Create an S3 service client object.
  const s3Client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    credentials: credentials,
    region: "global",
  });

  const buffer = fs.readFileSync(fileToUpload);

  const upload_data = await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileToUpload,
      Body: buffer,
    })
  );
  console.log(upload_data);
}

main();
