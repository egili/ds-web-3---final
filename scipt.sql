create table Usuario(
id int identity(1,1) not null,
nome varchar(20) not null,
email varchar(30) not null,
senha varchar(20) not null,
role varchar(20) not null
primary key clustered ([id]ASC)
)

Insert into Usuario (nome, email, senha, role) values ('Eliseu Gili', 'eliseu@gmail.com', 'senha', 'Adm')
Insert into Usuario (nome, email, senha, role) values ('Gili Eliseu', 'gili@gmail.com', 'cliente', 'Cliente')

create table Produto(
id int identity(1,1) not null,
valor int not null,
marca varchar(20) not null,
modelo varchar(20) not null,
primary key clustered ([id]ASC)
)

Insert into Produto (valor, marca, modelo) values (7000,'Apple','Iphone 14')
insert into Produto (valor, marca, modelo) values (3500,'Samsung', 'Galaxy S10')