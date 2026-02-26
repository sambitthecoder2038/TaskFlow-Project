create database taskFlow;
use taskFlow;
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_Name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

select * from users;