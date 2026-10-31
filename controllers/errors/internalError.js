const internalError = (err,req, res, next) => {
  res.render("errors/505");
};

export default internalError;
