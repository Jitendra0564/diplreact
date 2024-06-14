const { app, connectToMongoDB } = require('./app1');

// Start server function
async function startServer() {
  await connectToMongoDB(); // Connect to MongoDB before starting the server
  const PORT = process.env.PORT || 5000;
  return app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

module.exports = startServer;
