import express, { Application, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import Connect from './connect';
import parseCSV from './utils/parseCSV';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('TS App is Running');
});

const PORT = process.env.PORT;
const db = 'mongodb://localhost:27017/Foko-test';

Connect({ db }, () =>
  app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
    const args = process.argv.slice(2);
    const csvInputPath = args
      .find((arg) => arg.includes('input'))
      .split('=')[1];
    const csvOutputPath =
      (args.find((arg) => arg.includes('output')) &&
        args.find((arg) => arg.includes('output')).split('=')[1]) ||
      '';
    parseCSV(csvInputPath, csvOutputPath);
  })
);
