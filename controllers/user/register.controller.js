import randomstring from "randomstring";
import bcrypt from "bcrypt";
import validateSchema from "../../helpers/validator.helper.js";
import schema from "../../schemas/user/register.schema.js";
import userService from "../../services/user/index.service.js";
import errors from "../../helpers/errors.helper.js";

const main = async (req, res, next) => {
  try {
    //recibir info pque vamos a tener que validar
    await validateSchema(schema, req.body);

    const { email, username, password } = req.body;

    //Generar código aleatorio de registro
    const registrationCode = randomstring.generate(30);

    //Validar que el usuario no este ya registrado
    const users = await userService.getByEmailorUsername(email, username);

    if (users.length > 0) {
      errors.conflictError(
        "El nombre de usuario o email ya se encuentra registrado",
        "USER_REGISTER_ERROR"
      );
    }

    //Encriptar contraseña
    const passwordEncrypted = await bcrypt.hash(password, 5);

    //Registro de usuarios
    await userService.register(
      username,
      passwordEncrypted,
      email,
      registrationCode
    );

    //Envio email de registro
    await userService.registerSendEmail(email, registrationCode);

    res.send({
      status: "success",
      message: "El usuario ha sido registrado con éxito",
    });
  } catch (error) {
    next(error);
  }
};

export default main;
