import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';

// ✅ Define TypeScript Interface
export interface IFranchiseAdmission extends Document {
    firstName: string;
    lastName: string;
    dob: string;
    directorName: string;
    instituteName: string;
    city:string;
    state:string;
    address: string;
    mobile: string;
    email: string;
    aadharId: string;
    password: string;
    franchiseId:number;
    adminId:number;
    role:string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// ✅ Define Schema
const FranchiseAdmissionSchema = new Schema<IFranchiseAdmission>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dob: { type: String, required: true },
        directorName: { type: String, required: true },
        instituteName: { type: String, required: true },
        city:{type: String, required:true},
        state:{type:String, required:true},
        address: { type: String, required: true },
        mobile: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        aadharId: { type: String, required: true },
        password: { type: String, required: true },
        franchiseId:{type : Number},
        adminId:{type:Number},
        role:{type: String},
    },
    { timestamps: true }
);

// ✅ Add the comparePassword method
FranchiseAdmissionSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// ✅ Define & Export the Model Properly
const FranchiseAdmissionModel: Model<IFranchiseAdmission> = mongoose.model<IFranchiseAdmission>(
    'FranchiseAdmission',
    FranchiseAdmissionSchema
);

export default FranchiseAdmissionModel;
