import mongoose from 'mongoose';

type DBInput = {
  db: string;
};

export default ({ db }: DBInput, cb: any) => {
  const connect = () => {
    mongoose
      .connect(db, { useUnifiedTopology: true })
      .then(() => {
        console.info(`Successfully connected to ${db}`);
        cb();
      })
      .catch((err) => {
        console.error(`Error connecting to database :`, err);

        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on('disconnected', connect);
};
