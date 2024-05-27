import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  status: { type: String, required: true },
});

export default mongoose.model<ITask>("Task", TaskSchema);