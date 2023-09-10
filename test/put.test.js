const request = require("supertest");
const app = require("../index");

const chai = require("chai");
const expect = chai.expect;

describe("PUT /api", () => {
  it("should fail when it is only /api", async () => {
    const res = await request(app).put("/api");
    expect(res.status).to.equal(404);
  });

  it("should update existing user", async () => {
    const randName = `BNXN${Math.random() * 5000}`;

    const newPersonData = { name: randName };
    const res = await request(app).put(`/api/BNXN`).send(newPersonData);
    expect(res.status).to.equal(200);
  });
});
