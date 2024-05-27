import mongoose, { Schema, Document } from "mongoose";
import * as mongodb from "mongodb";

export interface ITask extends Document {
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  _id?: mongodb.ObjectId;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  status: { type: String, required: true },
});

export default mongoose.model<ITask>("Task", TaskSchema);
