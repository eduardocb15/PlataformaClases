import randomstring from "randomstring";
import bcrypt from "bcrypt";
import validateSchema from "../../helpers/validator.helper.js";
import schema from "../../schemas/user/register.schema.js";
import userService from "../../services/user/index.service.js";

const main = async (req, res, next) => {
  try {
    await validateSchema(schema, req.body);

    const { email, username, password } = req.body;
    const registrationCode = randomstring.generate(30);

    const passwordEncrypted = await bcrypt.hash(password, 5);
    await userService.register(
      username,
      passwordEncrypted,
      email,
      registrationCode
    );

    res.send({
      status: "success",
      message: "El usuario ha sido registrado con éxito",
    });
  } catch (error) {
    next(error);
  }
};

export default main;
