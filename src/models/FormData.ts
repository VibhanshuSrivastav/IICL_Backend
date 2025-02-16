import mongoose from 'mongoose';

const FormDataSchema = new mongoose.Schema(
    {
        applyingFor: { type: String, required: true },
        centerStatus: { type: String, required: true },
        branchName: { type: String, required: true },
        directorName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        whatsappNumber: { type: String },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        facilities: { type: [String], required: true },
        additionalInfo: { type: String },
        existingFranchise: { type: String, required: true },
    },
    { timestamps: true }
);

const FormData = mongoose.model('FormData', FormDataSchema);

export default FormData;
