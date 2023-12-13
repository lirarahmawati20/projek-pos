DROP DATABASE projek_pos;

CREATE DATABASE projek_pos;
USE projek_pos;

 CREATE TABLE  users(
 id INT PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(30),
 email VARCHAR(30),
`password` VARCHAR(30),
`role` VARCHAR(30)
);
INSERT INTO users VALUES
('','lira rahmawati','lirarahmawati@gmail.com','12345','SUPPER_ADMIN'),
('','ades','adesroy@gmail.com','67890','ROLE_USER');


CREATE TABLE category(
id INT PRIMARY KEY AUTO_INCREMENT,
`name`VARCHAR(30)
);

INSERT INTO category VALUES
('','food'),
('','drink'),
('','seafood');



CREATE TABLE product(
 id INT PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(30),
 image	VARCHAR(255),
 price   INT,
 stok INT,
 id_category INT,
 CONSTRAINT `fk_category` FOREIGN KEY (id_category) REFERENCES category(id)
 );


CREATE TABLE `transaction`(
id INT PRIMARY KEY AUTO_INCREMENT,
tanggal VARCHAR(30),
no_transaction VARCHAR(30),
total_price INT,
total_product INT
);

CREATE TABLE transaction_detail (
id INT PRIMARY KEY AUTO_INCREMENT,
product_name VARCHAR(50),
product_price INT,
amount  INT,
total_price INT,
id_transaction INT,
CONSTRAINT fk_transaction   FOREIGN KEY ( id_transaction )REFERENCES `transaction` (id)
);



