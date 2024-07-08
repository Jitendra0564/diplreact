import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  fatherName: String,
  motherName: String,
  contactNo: String,
  AlternativeNo: String,
  fatherNo: String,
  Address: String,
  BankName: String,
  BankAccNo: String,
  Ifsc: String,
  Department: String,
  Position: String,
  Role: String,
  AadharCardNo: String,
  panCardNo: String,
  joiningdate: Date,
  Education: [
    {
      degree: String,
      field_of_study: String,
      institution: String,
      start_date: Date,
      end_date: Date,
    }
  ],
  Organization: String,
  workHistory: [
    {
      company: String,
      job_title: String,
      start_date: Date,
      end_date: Date,
    },
  ],
  Language: String,
  status: {
    type: String,
    enum: ['Active', 'InActive'],
    default: 'Active',
  },
  files: [{ type: Schema.Types.ObjectId, ref: 'uploads.files' }],
  
});

export default model('User', UserSchema);













 