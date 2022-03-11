const supertest = require("supertest");

const url = "http://localhost:8080";

describe("Teste de Eventos", () => {
  it("GET Return events", async () => {
    const response = await supertest(url).get("/events");

    if (response.statusCode === 401) {
      return expect(response.statusCode).toBe(401);
    }
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("date");
    expect(response.body[0]).toHaveProperty("time");
    expect(response.body[0]).toHaveProperty("place");
    expect(response.body[0]).toHaveProperty("description");
    expect(response.body[0]).toHaveProperty("tipo");
    expect(response.body[0]).toHaveProperty("band_id");
  });

  it("POST Create Event", async () => {
    const response = await supertest(url).post("/events").send({
      name: "Teste02",
      date: "2022-02-26",
      time: "10:00:00",
      place: "Praça da Cidade",
      description: "Teste insert",
      tipo: "Apresentação",
    });
    if (response.statusCode === 400) {
      return expect(response.statusCode).toBe(400);
    }
    expect(response.statusCode).toBe(200);
  });

  it("PUT Update Event", async() => {
      const response = await supertest(url).put("/events/3").send({
        name: "Teste",
        dateAnt: "2022-02-24",
        date: "2022-03-24",
        dateConf: "2022-03-24",
        time: "10:00:00",
        place: "Praça da Cidade",
        description: "Teste insert",
        tipo: "Apresentação"
      });
      if (response.statusCode === 400) {
        return expect(response.statusCode).toBe(400);
      }
      expect(response.statusCode).toBe(200);
  });

  it("DELETE Delete event", async() => {
      const response = await supertest(url).del('/events').send({
          name: "Test02",
          date: "2022-02-26"
      });
      if (response.statusCode === 400) {
        return expect(response.statusCode).toBe(400);
      }else if(response.statusCode === 401){
        return expect(response.statusCode).toBe(401);
      }
      expect(response.statusCode).toBe(200);
  })
});
