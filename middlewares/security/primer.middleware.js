const main = (req, res, next) => {
  req.nombre = "Eduardo";
  next();
};

export default main;
