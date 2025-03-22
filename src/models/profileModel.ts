import mongoose, { Schema, Document, Model } from 'mongoose';

// interface IProfile extends Document {
//     role: string;
//     centreCode: string;
//     centreName: string;
//     centreAddress: string;
//     directorName: string;
//     designation: string;
//     mobileNo: string;
//     email: string;
//     password: string;
//     card: string;
//     authorizationCertificate: string;
// }

// const ProfileSchema: Schema = new Schema({
//     role: { type: String, required: true },
//     centreCode: { type: String, required: true },
//     centreName: { type: String, required: true },
//     centreAddress: { type: String, required: true },
//     directorName: { type: String, required: true },
//     designation: { type: String, required: true },
//     mobileNo: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     card: { type: String, required: true },
//     authorizationCertificate: { type: String, required: true }
// });

// const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);

// export default Profile;

export interface IFranchiseProfile extends Document {
    firstName: string;
    lastName: string;
    dob: string;
    directorName: string;
    instituteName: string;
    address: string;
    mobile: string;
    email: string;
    aadharId: string;
    password: string;
    franchiseId:number;
}

// ✅ Define Schema
const FranchiseProfileSchema = new Schema<IFranchiseProfile>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dob: { type: String, required: true },
        directorName: { type: String, required: true },
        instituteName: { type: String, required: true },
        address: { type: String, required: true },
        mobile: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        aadharId: { type: String, required: true },
        password: { type: String, required: true },
        franchiseId:{type : Number}
    },
    { timestamps: true }
);

const FranchiseProfileModel: Model<IFranchiseProfile> = mongoose.model<IFranchiseProfile>(
    'FranchiseAdmission',
    FranchiseProfileSchema
);

export default FranchiseProfileModel;