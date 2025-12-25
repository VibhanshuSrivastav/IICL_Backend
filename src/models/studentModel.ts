// studentModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMark {
  subject: string;
  theoryMaxMarks: number;
  theoryObtainedMarks: number;
  practicalMaxMarks: number;
  practicalObtainedMarks: number;
}

export interface IStudent extends Document {
  name: string;
  email: string;
  fatherName: string;
  motherName: string;
  phone: string;
  sessionFrom: string;
  sessionTo: string;
  registrationDate: string;
  address: string;
  dob: string;
  gender: string;
  course: string;
  batch: string;
  image?: {
    data: Buffer;
    contentType: string;
  } | null;
  qualification: string;
  idProof: string;
  idProofNumber: string;
  franchiseId: string;
  enrollmentId: string;
  registrationId:string;
  marks:IMark[];
  issueDate?: string; // New field to store the issue date
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  phone: { type: String, required: true },
  sessionFrom: { type: String, required: true },
  sessionTo: { type: String, required: true },
  registrationDate: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: String, required: true },
  batch: { type: String, required: true },
  image: {
    data: { type: Buffer, default: null },
    contentType: { type: String, default: null },
  },
  qualification: { type: String, required: true },
  idProof: { type: String, required: true },
  idProofNumber: { type: String, required: true },
  franchiseId: { type: String, required: true },
  enrollmentId: { type: String, required: true },
  registrationId: { type: String, required: true },
  certificationStatus: {type: String},
  marks: [
    {
      subject: { type: String, required: true },
      theoryMaxMarks: { type: Number, required: true },
      theoryObtainedMarks: { type: Number, required: true },
      practicalMaxMarks: { type: Number, required: true },
      practicalObtainedMarks: { type: Number, required: true },
    },
  ],
  issueDate: { type: String, default: null }, // Add issue date field
}, { timestamps: true }); // Enable createdAt and updatedAt for consistent sorting

export default mongoose.model<IStudent>('Student', StudentSchema);
