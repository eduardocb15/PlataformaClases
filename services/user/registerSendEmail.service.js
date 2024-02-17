import emailHelper from "../../helpers/email.helper.js";

const main = async (email, registrationCode) => {
  const emailBody = `<h1>Bienvenido</h1> Gracias por registrarte en la Plataforma de Idiomas. Para activar tu cuenta haz click en el siguiente enlace    
    
    <a href="http://localhost:8080/users/validate/${registrationCode}">Activar mi cuenta</a>
    
    `;
  const emailSubject = "Bienvenido a la Plataforma de Idiomas";

  await emailHelper(email, emailSubject, emailBody);
};

export default main;
