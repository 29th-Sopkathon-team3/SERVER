const admin = require('firebase-admin');
const serviceAccount = require('./sopkathon-firebase-adminsdk-4y0ol-602d3a72a3.json');
const dotenv = require('dotenv');

dotenv.config();

let firebase;
if (admin.apps.length === 0) {
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  firebase = admin.app();
}

module.exports = {
  api: require('./api'),
};
