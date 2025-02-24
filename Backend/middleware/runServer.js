import { connect } from 'mongoose';

const runServer = async (app, MONGO_CONNECTION, PORT) => {
   try {
      await connect(MONGO_CONNECTION);
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });
   } catch (error) {
      console.log(error.message);
   }
};

export default runServer;
