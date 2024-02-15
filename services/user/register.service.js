import getPool from "../../db/getPool.js";
import errors from "../../helpers/errors.helper.js";

const main = async (username, password, email, registrationCode) => {
  try {
    const pool = await getPool();
    const sqlQuery =
      "INSERT INTO users (username, password, email, registrationCode) VALUES (?, ?, ?, ?)";
    const values = [username, password, email, registrationCode];

    const [response] = await pool.query(sqlQuery, values);

    if (response.affectedRows !== 1) {
      errors.conflictError(
        "Error al insertar nuevo usuario",
        "INSERT_USER_ERROR"
      );
    }

    return response.insertId;
  } catch (error) {
    error.internalServerError(error.message, "DATA_INSERT_ERROR");
  }
};

export default main;
