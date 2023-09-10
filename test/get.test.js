const request = require("supertest");
const app = require("../app");

const chai = require("chai");
const expect = chai.expect;

describe("GET /persons", () => {
  it("should return a list of persons", async () => {
    const res = await request(app).get("/api/person");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should return a specific person data", async () => {
    const res = await request(app).get("/api/person/BNXN");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id"); // Assuming the response includes an 'id'
    expect(res.body).to.property("name");
  });
});
