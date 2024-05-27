import { Request, Response } from "express";
import Task, { ITask } from "../models/task";

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const newTask: ITask = new Task({ title, description, status });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true },
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
