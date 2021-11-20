const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllUsers = async (client) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "profile" p
    WHERE is_deleted = FALSE
    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

const addUser = async (client, code, userId, username, imageUrl) => {
  const { rows } = await client.query(
    `
    INSERT INTO profile
    (code, user_id, username, profile_image)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `,

    [code, userId, username, imageUrl],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { getAllUsers, addUser };
