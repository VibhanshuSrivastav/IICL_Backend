import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';

// ✅ Define TypeScript Interface for the Document
export interface IFormData extends Document {
    applyingFor: string;
    centerStatus: string;
    branchName: string;
    directorName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    additionalInfo?: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// ✅ Define Schema
const formDataSchema = new Schema<IFormData>(
    {
        applyingFor: { type: String, required: true },
        centerStatus: { type: String, required: true },
        branchName: { type: String, required: true },
        directorName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        additionalInfo: { type: String },
    },
    { timestamps: true }
);

// ✅ Add the comparePassword method properly
formDataSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// ✅ Define & Export the Model Correctly
const FormDataModel: Model<IFormData> = mongoose.model<IFormData>('FormData', formDataSchema);
export default FormDataModel;
