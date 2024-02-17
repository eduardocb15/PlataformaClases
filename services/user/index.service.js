import register from "./register.service.js";
import getByEmailorUsername from "./getByEmailorUsername.service.js";
import registerSendEmail from "./registerSendEmail.service.js";
import getByRegistrationCode from "./getByRegistrationCode.service.js";
import activate from "./activate.service.js";

export default {
  register,
  getByEmailorUsername,
  registerSendEmail,
  getByRegistrationCode,
  activate,
};
