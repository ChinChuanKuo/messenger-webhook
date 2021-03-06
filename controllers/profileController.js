import profile from '../services/profileService';

let handleSetupProfile = async (req, res) => {
    try {
        await profile.handleSetupProfile();
        return res.redirect("/profile");
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    handleSetupProfile: handleSetupProfile
};