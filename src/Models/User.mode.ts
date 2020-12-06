import mongoose, { Schema, Document } from 'mongoose';
// Database User Schema of Mongoose
export interface IUser extends Document {
  Email: String;
  Fname: String;
  Lname: String;
  Phone: String;
  EmployeeID: String;
}

const UserSchema: Schema = new Schema(
  {
    Email: {
      type: String,
      required: true,
    },
    Fname: {
      type: String,
      required: true,
    },
    Lname: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    EmployeeID: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
