const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  fileType: String,
  length: Number,
  chunkSize: Number,
  uploadDate: { type: Date, default: Date.now },
  metadata: Object,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileCategory: { type: String, enum: ['pancard','resume', 'photo', 'idProof', ] },
});

const GridFSBucket = mongoose.mongo.GridFSBucket;
let bucket;

mongoose.connection.on('connected', () => {
  const db = mongoose.connection.db;
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

module.exports = mongoose.model('uploads.files', fileSchema);