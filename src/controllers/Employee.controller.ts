import Employee, { IEmlopyee } from '../models/Employee.mode';

interface ICreateEmployeeInput {
  Email: IEmlopyee['Email'];
  Fname: IEmlopyee['Fname'];
  Lname: IEmlopyee['Lname'];
  Phone: IEmlopyee['Phone'];
  EmployeeID: IEmlopyee['EmployeeID'];
}

async function CreateEmployee({
  Email,
  Fname,
  Lname,
  Phone,
  EmployeeID,
}: ICreateEmployeeInput): Promise<IEmlopyee> {
  return Employee.create({
    Email,
    Fname,
    Lname,
    Phone,
    EmployeeID,
  })
    .then((data: IEmlopyee) => {
      return data;
    })
    .catch((error: Error) => {
      console.log(error);
      throw error;
    });
}

async function FindOneEmployeeAndUpdate(
  EmployeeID: string,
  newData: ICreateEmployeeInput
) {
  return Employee.findOneAndUpdate({ EmployeeID }, newData)
    .then((employee: any) => {
      if (employee) {
        console.log(
          `This employee ${EmployeeID} already exists and has been updated`
        );
        return true;
      } else return false;
    })
    .catch((error: Error) => {
      console.log(error);
      throw error;
    });
}

async function FindAllEmployees() {
  return Employee.find()
    .then((employees: any[]) => {
      if (employees) {
        return employees.map((employee) => ({
          EmployeeID: employee.EmployeeID,
          Fname: employee.Fname,
          Lname: employee.Lname,
          Phone: employee.Phone,
          'Date Created': employee.createdAt,
          'Date Updated': employee.updatedAt,
        }));
      }
      return null;
    })
    .catch((error: Error) => {
      console.log(error);
      throw error;
    });
}
export default {
  CreateEmployee,
  FindOneEmployeeAndUpdate,
  FindAllEmployees,
};
