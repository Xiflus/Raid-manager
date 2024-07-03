import getPool from "../../db/getPool.js";

const selectCharacterByIdModel = async (characterName) => {
  const pool = getPool();
  const [character] = await pool.query(
    "SELECT * FROM characters WHERE name = ?",
    [characterName]
  );
  if (character.length === 0) {

    notFoundError(characterName);
  }
  return character[0];

};

export default selectCharacterByIdModel;