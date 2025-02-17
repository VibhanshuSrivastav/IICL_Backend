import mongoose, { Schema, Document } from 'mongoose';

interface IProfile extends Document {
    role: string;
    centreCode: string;
    centreName: string;
    centreAddress: string;
    directorName: string;
    designation: string;
    mobileNo: string;
    email: string;
    password: string;
    card: string;
    authorizationCertificate: string;
}

const ProfileSchema: Schema = new Schema({
    role: { type: String, required: true },
    centreCode: { type: String, required: true },
    centreName: { type: String, required: true },
    centreAddress: { type: String, required: true },
    directorName: { type: String, required: true },
    designation: { type: String, required: true },
    mobileNo: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    card: { type: String, required: true },
    authorizationCertificate: { type: String, required: true }
});

const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;