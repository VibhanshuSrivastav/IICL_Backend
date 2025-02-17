import Profile from "../models/profileModel.js";

export const getProfileData = async (userId: string) => {
    try {
        const profileData = await Profile.findOne({ where: { userId } });
        if (!profileData) {
            throw new Error('Profile not found');
        }
        return profileData;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error fetching profile data: ${error.message}`);
        } else {
            throw new Error('Unknown error occurred while fetching profile data');
        }
    }
};