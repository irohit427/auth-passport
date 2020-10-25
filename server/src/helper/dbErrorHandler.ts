
const uniqueMessage = (error: any) => {
  let output;
  try {
      let fieldName = error.message.substring(
          error.message.lastIndexOf(".$") + 2,
          error.message.lastIndexOf("_1")
      );
      output =
          fieldName.charAt(0).toUpperCase() +
          fieldName.slice(1) +
          " already exists";
  } catch (ex) {
      output = "Unique field already exists";
  }

  return output;
}
const errorHandler = (err: any) => {
  let message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(err)
        break;
      default:
        message = "Something went wrong";
    }
  }
  return message;
}

export default errorHandler;