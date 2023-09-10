const request = require("supertest");
const app = require("../app");

const chai = require("chai");
const expect = chai.expect;

describe("POST /persons", () => {
  it("should fail when it is only /person", async () => {
    const res = await request(app).post("/api/person");
    expect(res.status).to.equal(500);
  });

  it("should create new user", async () => {
    const mockPersonData = { name: `Juliet Mich ${Math.random() * 10000000000000}` };
    const res = await request(app).post(`/api/person`).send(mockPersonData);
    expect(res.status).to.equal(200);
  });
});
