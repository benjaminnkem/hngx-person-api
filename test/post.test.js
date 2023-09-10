const request = require("supertest");
const app = require("../index");

const chai = require("chai");
const expect = chai.expect;

describe("POST /api", () => {
  it("should fail when no data is sent", async () => {
    const res = await request(app).post("/api");
    expect(res.status).to.equal(500);
  });

  it("should create new user", async () => {
    const mockPersonData = { name: `Juliet Mich ${Math.random() * 10000000000000}` };
    const res = await request(app).post(`/api`).send(mockPersonData);
    expect(res.status).to.equal(200);
  });
});
