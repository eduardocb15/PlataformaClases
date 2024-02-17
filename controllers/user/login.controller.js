import bcrypt from "bcrypt";
import validateSchema from "../../helpers/validator.helper.js";
import schema from "../../schemas/user/login.schema.js";
import userService from "../../services/user/index.service.js";
import errors from "../../helpers/errors.helper.js";
import securityService from "../../services/security/index.service.js";

const main = async (req, res, next) => {
  //Crear validación
  try {
    await validateSchema(schema, req.body);
    //obtener el usuario
    const users = await userService.getByEmailorUsername("", req.body.username);
    if (users.length === 0) {
      errors.notFoundError("Usuario no encontrado", "USER_NOT_FOUND");
    }
    // validar la password
    const validPassword = await bcrypt.compare(
      req.body.password,
      users[0].password
    );

    if (!validPassword) {
      errors.notAuthorizedError(
        "Credenciales incorrectas",
        "INVALID_CREDENTIALS"
      );
    }
    //check si esta activo o inactivo
    if (!users[0].active) {
      if (users[0].registrationCode !== null) {
        errors.forbiddenError(
          "El usuario aún no ha sido activado",
          "PENDING_ACTIVATION"
        );
      } else {
        errors.forbiddenError("El usuario está desactivado", "USER_INACTIVE");
      }
    }
    //crea token
    const tokenInfo = {
      id: users[0].id,
      role: users[0].role,
    };
    //devulve token
    const token = securityService.createToken(tokenInfo);

    res.send({
      status: "success",
      message: "Usuario logueado con éxito",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default main;
