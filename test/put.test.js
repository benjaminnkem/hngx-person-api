const request = require("supertest");
const app = require("../app");

const chai = require("chai");
const expect = chai.expect;

describe("PUT /persons", () => {
  it("should fail when it is only /person", async () => {
    const res = await request(app).put("/api/person");
    expect(res.status).to.equal(404);
  });

  it("should update existing user", async () => {
    const randName = `BNXN${Math.random() * 5000}`;

    const newPersonData = { name: randName };
    const res = await request(app).put(`/api/person/BNXN`).send(newPersonData);
    expect(res.status).to.equal(200);
  });
});
