const request = require("supertest");
const app = require("../index");

const chai = require("chai");
const expect = chai.expect;

describe("GET /api", () => {
  it("should return a list of persons", async () => {
    const res = await request(app).get("/api");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should return a specific person data", async () => {
    const res = await request(app).get("/api/BNXN");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id"); // Assuming the response includes an 'id'
    expect(res.body).to.property("name");
  });
});
