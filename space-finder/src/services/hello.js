exports.main = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(`Data connected! ${process.env.TABLE_NAME}`),
  };
};
