const AppError = require("../utils/AppError");

const handleCastErrorDB = (error) =>
  new AppError(`Invalid ${error.path}: ${error.value}.`, 400);

const handleDuplicateErrorDB = (error) =>
  new AppError(
    `Duplicate ${Object.keys(error.keyPattern)}: ${Object.values(
      error.keyValue
    )}.`,
    400
  );

const sendErrorProd = ({ operational, status, message }, res) => {
  if (operational) {
    res.status(statusCode).json({
      status: status,
      message: message,
    });
  } else
    res.status(500).json({
      status: "error",
      message: "Something went wrong 🙃",
    });
};

module.exports = (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || 500,
    status: err.status || "error",
    ...err,
  };

  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateErrorDB(error);
  if (process.env.NODE_ENV === "production") sendErrorProd(error, res);
  else
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
};
