use database BlogPost;

---- create user table
create table user(
    id int primary key auto_increment,
    full_name varchar(100),
    email varchar(100) unique,
    phone_no varchar(15),
    password varchar(200),
    isDeleted int(1) default 0,
    created_time DATETIME default CURRENT_TIMESTAMP,
    col1 varchar(20),
    col2 varchar(20)
);

---- create category table
create table category(
    id int primary key auto_increment,
    title varchar(100),
    description varchar(100),
    col1 varchar(20),
    col2 varchar(20)
);

-- create blogs table
create table blogs(
    id int primary key auto_increment,
    title varchar(100),
    content varchar(1000),
    isDeleted int(1) default 0,
    created_time DATETIME default CURRENT_TIMESTAMP,
    updated_time DATETIME,
    user_id int,
    category_id int,
    col1 varchar(20),
    col2 varchar(20),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES category(id)
);