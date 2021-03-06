import profile from '../services/profileService';

let handleSetupProfile = async (req, res) => {
    try {
        await profile.handleSetupProfileAPI();
        return res.redirect("/");
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    handleSetupProfile: handleSetupProfile
};