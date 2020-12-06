import EmployeeAPI from '../Controllers/User.controller';
import { Parser } from 'json2csv';
import fs from 'fs';

export default async (csvOutputPath: string) => {
  const allEmployeesData = await EmployeeAPI.FindAllEmployees();
  const json2csvParser = new Parser({ header: true });
  const csvData = json2csvParser.parse(allEmployeesData);
  const csvFilePath = `${csvOutputPath}/mongodb.csv`;
  fs.writeFile(csvFilePath, csvData, function (error) {
    if (error) throw error;
    console.log(`Write to ${csvFilePath} successfully!`);
  });
};
