import { connect } from 'mongoose';

const runServer = async (app, mongoConnection, PORT) => {
  try {
    await connect(mongoConnection);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default runServer;
