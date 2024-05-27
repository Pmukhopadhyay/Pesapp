import request from "supertest";
import app from "../app";

describe("Task CRUD Operations", () => {
  let taskId: string;
  it("should create a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "Test Task", description: "This is a Test Task", status: "To Do" });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    taskId = response.body._id;
  });

  it("should get all tasks", async () => {
    const response = await request(app).get("/tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a task by ID", async () => {
    const response = await request(app).get(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", taskId);
  });
});
