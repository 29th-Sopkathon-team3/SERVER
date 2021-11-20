const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllRanks = async (client, code) => {
  const { rows } = await client.query(
    `
    SELECT * FROM profile p
      JOIN "user" u  ON p.user_id = u.id
      WHERE code = $1
      ORDER BY temperature DESC
    `,[code]
  );
  return convertSnakeToCamel.keysToCamel(rows);

};

const addRank = async (client, code, title) => {
  const { rows } = await client.query(
    `
    INSERT INTO room
    (code, title)
    VALUES
    ($1, $2)
    RETURNING *
    `,
    [code, title],
  );
  return convertSnakeToCamel.keysToCamel( rows );
}

const updateRankPoint = async (client, userId, code, temperature) => {
  const { rows } = await client.query(
    `
    UPDATE profile p
    SET temperature = temperature + $1
    WHERE user_id = $2
      AND code = $3
    RETURNING *
    `,
    [temperature, userId, code],
    
  );
  return convertSnakeToCamel.keysToCamel(rows);
}

const tmp = async(client, code)=>{
  const { rows } = await client.query(
    `
    SELECT COUNT(*) AS cnt
    FROM "room"
    WHERE code = $1
    `,
    [code]
  );
  return convertSnakeToCamel.keysToCamel( rows);
}

module.exports = { getAllRanks, addRank, updateRankPoint, tmp };
