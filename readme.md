# API TRYMUSIC

## Comandos para iniciar servidor detro da pasta api:

	yarn add express

	yarn sequelize db:migrate

	yarn dev
  * Obs: mudar o host em database.js para o host do seu servidor docker
## END POINTS PARA MÚSICOS:/


**CADASTRAR MÚSICO:**

/musico

body:

{\
	"name": "Allexandre",\
	"email": "allexandremelo@gmail.com",\
	"password_hash": "123456",\
	"contact": "869874568",\
	"instrument": "Teclado"\
}

**LOGIN:**

/login

body:

{\
	"email": "allexandremelo@gmail.com",\
	"password": "12345678"\
}

**ATUALIZAR MÚSICO:**

/musico

header:

    Bearer Token
    
body:

{\
	"novoName": "Allexandre Meneses de Melo",\
	"email": "allexandremelo@gmail.com",\
	"novoContact": "86 789451245",\
	"novoInstrument": "Telclado",\
	"passwordAntigo": "123456",\
	"passwordNovo": "12345678",\
	"confirmarPassword": "12345678"\
}

**DELETAR MÚSICO:**

/musico

header:

    Bearer Token
    
body:

{\
	"password": "12345678"\
}
