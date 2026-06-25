import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";

describe("Todo Application Tests", () => {

  it("should create a task", async () => {

    const token = jwt.sign( { ID: "507f1f77bcf86cd799439011" }, "something to make token strong" );

    const response = await request(app).post("/api/inserttask/list")
      .set("Authorization", `Bearer ${token}`).send({
        title: "DevOps Test Task",
        description: "Testing",
        endDate: "2026-08-20"
      });

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("Task Created");
  });


  it("should update the newly inserted task", async () => {
    const token = jwt.sign( { ID: "507f1f77bcf86cd799439011" }, "something to make token strong" );

    const res = await request(app).patch("/api/todo/update")
    .set("Authorization", `Bearer ${token}`).send({
        Etitle: "DevOps Test Task",
        title: "DevOps Ci Testing Task"
    });

    console.log(res.body);

    expect(res.status).toBe(200);
    expect(res.body.msg).toBe("Updated Successfully");
  });


  it("should return 404 for an invalid route", async () => {
  const response = await request(app)
    .get("/this-route-does-not-exist");

  expect(response.status).toBe(404);
});

});