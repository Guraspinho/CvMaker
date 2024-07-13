const multer = require('multer');

const {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const { v4: uuidv4 } = require('uuid');

const storage = multer.memoryStorage();

// filter for files
const fileFilter = (req,file,cb) =>
{
    if(file.mimetype === "application/pdf" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype === "application/msword")
    {
        cb(null,true);
    }
    else
    {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"),false)
    }
}

// filter for photos
const photoFilter = (req,file,cb) =>
{
    if(file.mimetype.split("/")[0] === "image")
    {
        cb(null,true);
    }
    else
    {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"),false)
    }
}

const photo = multer({ storage, photoFilter, limits: {fileSize: 4000000} }); // 4MB

const upload = multer({ storage, fileFilter, limits: { fileSize: 4000000, files: 1 }}); // 4MB



// for deleting an object (file) from digitalocean spaces

const deleteCommand = (Key) =>
{
    return new DeleteObjectCommand(
        {
            Bucket: process.env.SPACES_BUCKET_NAME,
            Key
        }
    );
}

// for deleting multiple objects (files) from digitalocean spaces


// for uploading an object (file) to digitalocean spaces

const uploadCommand = (file) =>
{
    const Key = `photos/${uuidv4()} - ${file.originalname}`;
    return {
        Key,
        command: new PutObjectCommand({
            Bucket: process.env.SPACES_BUCKET_NAME,
            Key,
            Body: file.buffer
        })
    };
}



const s3Operation = async (Key, command) => {
    const s3client = new S3Client({
        region: 'fra1',
        endpoint: 'https://fra1.digitaloceanspaces.com',
        credentials: {
            accessKeyId: process.env.SPACES_ACCESS_KEY,
            secretAccessKey: process.env.SPACES_SECRET_KEY
        }
    });

    const response = await s3client.send(command);
    return { Key, response };
}


// function to sign the url's of resume photos
const getSignedUrlFunction = async (Key) =>
{
    const s3client = new S3Client({
        region: 'fra1',
        endpoint: 'https://fra1.digitaloceanspaces.com',
        credentials: {
            accessKeyId: process.env.SPACES_ACCESS_KEY,
            secretAccessKey: process.env.SPACES_SECRET_KEY
        }
    });

    const command = new GetObjectCommand({
        Bucket: process.env.SPACES_BUCKET_NAME,
        Key: Key
    });

    const signedUrl = await getSignedUrl(s3client, command, { expiresIn: 7200 }); // URL expires in 2 hour
    return signedUrl;
}


// sign multiple urls
const signMultipleUrls = async (Keys) =>
{

    const s3client = new S3Client({
        region: 'fra1',
        endpoint: 'https://fra1.digitaloceanspaces.com',
        credentials: {
            accessKeyId: process.env.SPACES_ACCESS_KEY,
            secretAccessKey: process.env.SPACES_SECRET_KEY
        }
    });

    // Use Promise.all to handle all promises in parallel
    const signedUrlsPromises = Keys.map(Key =>
    {
        const command = new GetObjectCommand({
            Bucket: process.env.SPACES_BUCKET_NAME,
            Key
        });

        return getSignedUrl(s3client, command, { expiresIn: 7200 });
    });


    const signedUrls = await Promise.all(signedUrlsPromises);
    return signedUrls;
};


module.exports =
{
    deleteCommand,
    uploadCommand,
    s3Operation,
    getSignedUrlFunction,
    signMultipleUrls,
    upload,
    photo
}

