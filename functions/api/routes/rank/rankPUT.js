const functions = require('firebase-functions');
const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { rankDB } = require('../../../db');

module.exports = async (req, res) => {

  let {code, userId, temperature} = req.body
  temperature *=0.1
  if (!code || !userId || !temperature) {
    return res.status(statusCode.BAD_REQUEST)
      .send(util.fail
        (
          statusCode.BAD_REQUEST,
          responseMessage.NULL_VALUE
        )
      );
  }
  
  let client;
  
  try {
    client = await db.connect(req);

    const user = await rankDB.updateRankPoint(client, userId, code, temperature);
    
    res.status(statusCode.BAD_REQUEST)
      .send(util.success
        (
          statusCode.OK,
          responseMessage.UPDATE_ONE_USER_SUCCESS,
          user
        )
      );
  
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);
    
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail
        (
          statusCode.BAD_REQUEST,
          responseMessage.NULL_VALUE
        )
      );
  
  } finally {
    client.release();
  }
};