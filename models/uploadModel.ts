import mongoose, { Schema, Document } from 'mongoose';

export interface Upload extends Document {
  filename: string;
  path: string;
  type: string;
}

const UploadSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
});

export const UploadModel = mongoose.model<Upload>('Upload', UploadSchema);
