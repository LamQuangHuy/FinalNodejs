const firebaseModule = require('../database_config/firebase_config');
const { firebaseApp, analytics } = firebaseModule;

const db = firebaseApp.database();
const usersRef = db.ref('users');

const createUser = async (email, password, username) => {
        const newUserRef = usersRef.push();
        await newUserRef.set({
            email,
            password,
            username,
        });
};

module.exports = { createUser };