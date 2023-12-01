const firebaseModule = require('../database_config/firebase_config');
const { firebaseApp, analytics } = firebaseModule;

const db = firebaseApp.database();
const productsRef = db.ref('products');

const createProduct = async (name, price, desc) => {
    const newProductRef = productsRef.push();
    await newProductRef.set({
        name,
        price,
        desc,
    });
};

module.exports = { createProduct };