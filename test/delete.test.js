const request = require("supertest");
const app = require("../app");

const chai = require("chai");
const expect = chai.expect;

describe("DELETE /persons", () => {
  it("should fail when it is only /person", async () => {
    const res = await request(app).delete("/api/person");
    expect(res.status).to.equal(404);
  });

  it("should delete existing users", async () => {
    const res = await request(app).delete(`/api/person/Benjamin Nkem`)
    expect(res.status).to.equal(200);
  });
});
