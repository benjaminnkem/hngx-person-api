const request = require("supertest");
const app = require("../index");

const chai = require("chai");
const expect = chai.expect;

describe("DELETE /api", () => {
  it("should delete existing users", async () => {
    const res = await request(app).delete(`/api/Benjamin Nkem`)
    expect(res.status).to.equal(204);
  });
});
