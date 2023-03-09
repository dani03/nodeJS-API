# nodeJS-API
api avec node js et jwt 
les routes d'api: 

### POST =>  /auth/register => pour l'inscription d'un artiste.  champs a renseigner : email, password, role, pseudo

### POST => /auth/login => pour la connexion de n'importe qu'elle utilisateur. champs a renseigner : email, password

### POST => maquette/create => pour la creation d'une maquette. champs à renseigner : title, file_url

### POST => /artist/store => pour l'enregistrement d'un artiste par un manager champs a renseigner : email, password, role, pseudo

### GET => /maquettes => pour la recuperation de toutes les maquettes par un admin ou un manager...

### GET => /maquette/:id => pour la recuperation d'un maquette particuliaire

### PUT => update/maquette/:id => pour la mise a jour d'une maquette. champs à renseigner : title, file_url

### DELETE => /delete/maquette/:id => pour la suppression d'une maquette 

### GET => /user/maquettes => pour la recuperation des maquettes d'un artiste

### POST => auth/manager/register => pour l'ajout d'un manager par l'admin.  champs a renseigner : email, password, role, pseudo

### DELETE => user/delete/:id => pour la suppression d'un user 

### GET => /users => la recuperation de tous les users

### POST => approval/maquette/:id => pour laissez une approbation sur une maquette  champs a renseigner : approuve:boolean


## lancement du projet
au 1er lancement du projet l'admin est crée avec les identifiants: 
email : admin@admin.com
password: password

vous pouvez vous connectez avec celui ci via postman ..


au préalable  modifier les fichiers d'environement "env/mongo.env" et ".env" et renseigner vos identifiants de connexion à mongoDB afin de vous connectez à votre base de données.

ensuite vous pouvez lancez le projet si vous avez docker installer  en tapant la commande:
 `docker-compose up` ou `docker compose up --build app` afin de rebuild le dockerfile, le lancer laisser environ 1 minute lorsque dans la console apparaitra `connect with moongose` vous pouriez tester le projet via postman ou insomnia sur le PORT `9000` de votre machine ex:
 http://locahost:9000/auth/register . 


