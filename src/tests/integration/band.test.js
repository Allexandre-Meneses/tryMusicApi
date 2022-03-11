const supertest = require("supertest");

const url = "http://localhost:8080";

describe("Teste de bandas", () => {
  it("POST Create bands", async () => {
    const response = await supertest(url).post("/bands").send({
      name: "CP",
      user_id: 3,
    });
    if (response.statusCode === 401) {
      return expect(response.statusCode).toBe(401);
    } else if (response.statusCode === 400){
        return expect(response.statusCode).toBe(400);
    }

    expect(response.statusCode).toBe(200);
  });

  it("GET Return bands", async() => {
    const response = await supertest(url).get('bands');

    if(response.statusCode === 401){
        return expect(response.statusCode).toBe(401)
    }

    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("user_id");
  });

  it("PUT Update band", async() => {
      const response = await supertest(url).put("/bands").send({
          name: "",
          novoName: ""
      });
      if(response.statusCode == 400){
          return expect(response.statusCode).toBe(400);
      } else if(response.statusCode === 401){
        return expect(response.statusCode).toBe(401);
      }

      expect(response.statusCode).toBe(200);
  });

  it("PUT joinBand ", async() => {
    const response = await supertest(url).put("/bands").send({
        band_id: "",
    });
    if(response.statusCode == 400){
        return expect(response.statusCode).toBe(400);
    } else if(response.statusCode === 401){
      return expect(response.statusCode).toBe(401);
    }

    expect(response.statusCode).toBe(200);
  });

  it("DELETE delete band", async() => {
      const response = await supertest(url).delete('bands');
    
      if(response.statusCode === 400){
          return expect(response.statusCode).toBe(400);
      }
      expect(response.statusCode).toBe(200);
  })
});
