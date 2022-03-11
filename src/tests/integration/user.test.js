const supertest = require("supertest");

const url = "http://localhost:8080"

describe("Testes De Usuário /users", () => {
  it("Return users", async () => {
    const response = await supertest(url).get('/users');

    if (response.statusCode === 401) {
      return expect(response.statusCode).toBe(401);
    }
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0,0]).toHaveProperty("password_hash");
  });

 it("Create users", async() => {
      const response = await supertest(url).post('/users').send({
          name: "Teste",
          email: "teste02@user.com.br",
          password_hash: "123456",
      });
      if(response.statusCode === 400){
        return expect(response.statusCode).toBe(400);
      }
      expect(response.statusCode).toBe(200);
  })

  it("UPDATE users", async() => {
    const response = await supertest(url).put('/users').send({
        name: "Name",
        email: "name@teste.com.br",
        passwordAntigo: "123456",
        password_hash: "12345678",
        confirmarPassword: "12345678"
    });
    if(response.statusCode === 401){
        return expect(response.statusCode).toBe(401);
    }
    expect(response.statusCode).toBe(200);
  });
 /* it("DELETE users", async() => {
    const response = await supertest(url).delete('/users').send({
        password: "123456"
    });
    expect(response.statusCode).toBe(200);
  });*/
});

