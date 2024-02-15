import getPool from "./getPool.js";

const main = async () => {
  // Variable que almacenará una conexión con la base de datos.
  let pool;

  try {
    pool = await getPool();

    console.log("Borrando tablas...");

    await pool.query(
      "DROP TABLE IF EXISTS studentClasses, classes, media, reviews, users"
    );

    console.log("Creando tablas...");

    // Crear tabla users
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                nombre VARCHAR(50),
                apellido VARCHAR(50),
                bio TEXT,
                idiomaNativo VARCHAR(30),
                nivelIngles VARCHAR(30)
            )	
        `);

    // Crear la tabla reviews
    await pool.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                place VARCHAR(30) NOT NULL,
                description TEXT NOT NULL,
                userId INT UNSIGNED NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

    // Crear la tabla de media
    await pool.query(`
            CREATE TABLE IF NOT EXISTS media (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                mediaUrl VARCHAR(100) NOT NULL,
                reviewId INT UNSIGNED NOT NULL,
                tipo ENUM('foto', 'video', 'presentacion') DEFAULT 'foto',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (reviewId) REFERENCES reviews(id)
            )
        `);

    // Crear la tabla de classes
    await pool.query(`
            CREATE TABLE IF NOT EXISTS classes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                tema VARCHAR(50) NOT NULL,
                fecha DATE NOT NULL,
                hora TIME NOT NULL,
                duracion INT NOT NULL,
                profesorId INT UNSIGNED NOT NULL,
                FOREIGN KEY (profesorId) REFERENCES users(id)
            )
        `);

    // Crear la tabla studentClasses
    await pool.query(`
            CREATE TABLE IF NOT EXISTS studentClasses (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                estudianteId INT UNSIGNED NOT NULL,
                claseId INT UNSIGNED NOT NULL,
                FOREIGN KEY (estudianteId) REFERENCES users(id),
                FOREIGN KEY (claseId) REFERENCES classes(id)
            )
    `);

    console.log("¡Tablas creadas!");
  } catch (err) {
    console.error(err);
  } finally {
    // Cerramos el proceso.
    process.exit();
  }
};

// Ejecutamos la función anterior.
main();
