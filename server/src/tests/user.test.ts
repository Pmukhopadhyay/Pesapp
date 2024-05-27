// src/tests/user.test.ts
import request from "supertest";
import nodemailer from "nodemailer";
import app from "../app";
import User from "../models/user"; // Mock nodemailer for testing

jest.mock("nodemailer"); // Mock nodemailer

describe("User API", () => {
  // ...

  it("should reset a user password and send an email", async () => {
    const response = await request(app)
      .post("/users/reset-password")
      .send({
        email: "user@example.com",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Password reset email sent");
  });

  // ...

  it("should delete a user", async () => {
    // Create a test user and save it to the database
    const testUser = new User({
      username: "testuser",
      email: "testuser@example.com",
      password: "testpassword",
    });
    await testUser.save();

    // Authenticate or obtain a valid JWT token for authorization (if needed)

    // Send a request to delete the user
    // eslint-disable-next-line no-underscore-dangle
    const testUserId = testUser._id;
    const response = await request(app)
      .delete(`/users/${testUserId}`)
      .set("Authorization", "Bearer your-jwt-token-here"); // Replace with a valid JWT token

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "User deleted successfully");

    // Check if the user was deleted from the database
    const deletedUser = await User.findById(testUserId);
    expect(deletedUser).toBeNull();
  });
});
