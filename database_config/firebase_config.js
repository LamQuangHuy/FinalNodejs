const firebase = require('firebase/app');
require('firebase/analytics');
require('firebase/database');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.MFWP_FIREBASECONFIG_apiKey,
    authDomain: process.env.MFWP_FIREBASECONFIG_authDomain,
    projectId: process.env.MFWP_FIREBASECONFIG_projectId,
    storageBucket: process.env.MFWP_FIREBASECONFIG_storageBucket,
    messagingSenderId: process.env.MFWP_FIREBASECONFIG_messagingSenderId,
    appId: process.env.MFWP_FIREBASECONFIG_appId,
    measurementId: process.env.MFWP_FIREBASECONFIG_measurementId,
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();

module.exports = { firebaseApp, analytics };