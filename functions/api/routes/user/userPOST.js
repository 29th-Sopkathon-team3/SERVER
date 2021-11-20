const functions = require('firebase-functions');
const { success, fail } = require('../../../lib/util');
const sc = require('../../../constants/statusCode');
const rm = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { userDB } = require('../../../db');

module.exports = async (req, res) => {
  const { code, username, userId } = req.body;
  const url = 'https://user-images.githubusercontent.com/54793607/142727985-d8aaaad5-f7b1-47bb-91e5-fb4936db1b74.png';

  if (!username) return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));

  let client;

  try {
    client = await db.connect(req);
    const user = await userDB.addUser(client, code, userId, username, url);

    res.status(sc.OK).send(success(sc.OK, rm.CREATE_ONE_USER_SUCCESS, user));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
