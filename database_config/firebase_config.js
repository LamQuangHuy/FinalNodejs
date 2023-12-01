const firebase = require('firebase/app');
require('firebase/analytics');
require('firebase/database');
require('dotenv').config();

//client side
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

const admin = require('firebase-admin');
const serviceAccount = require('../database_config/final-nodejsweb-firebase-adminsdk-jwqh5-1ad389c7a3.json');

//server side only
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.URL_FIREBASE,
});

module.exports = { firebaseApp, analytics, admin };