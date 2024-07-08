import pkg from 'mongoose';
const { Schema, mongo, connection, model } = pkg;

const fileSchema = new Schema({
  filename: String,
  fileType: String,
  length: Number,
  chunkSize: Number,
  uploadDate: { type: Date, default: Date.now },
  metadata: Object,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  fileCategory: { type: String, enum: ['pancard','resume', 'photo', 'idProof', ] },
});

const GridFSBucket = mongo.GridFSBucket;
let bucket;

connection.on('connected', () => {
  const db = connection.db;
  bucket = new GridFSBucket(db, { bucketName: 'uploads' });
});

fileSchema.statics.uploadFile = async function (file, userId, fileCategory) {
  const uploadStream = bucket.openUploadStream(file.filename, {
    metadata: { fileType: file.mimetype, userId, fileCategory },
  });

  uploadStream.once('finish', () => {
    console.log('File uploaded successfully');
  });

  uploadStream.once('error', (err) => {
    console.error('Error uploading file:', err);
  });

  uploadStream.end(file.buffer);

  // Return the ID of the uploaded file
  return uploadStream.id;
};

export default model('uploads.files', fileSchema);