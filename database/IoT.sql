use IoT;

create table user (
    email varchar(30) primary key,
    password varchar(30) not null
);

create table user_info (
	id int(6) unsigned not null auto_increment,
	email varchar(30) not null,
    fullname varchar(50),
    dateofbirth datetime default(curdate()),
    phone varchar(20),
    gender varchar(20),
    address varchar(256),
    primary key (id, email),
    foreign key (email) references user(email)
);

create table shrimp_farm (
    io_farmname varchar(30) primary key,
    aio_key varchar(100) not null unique
);

create table owner (
    email varchar(30) not null,
    io_farmname varchar(30) not null,
    primary key(email, io_farmname),
    foreign key (email) references user(email),
    foreign key (io_farmname) references shrimp_farm(io_farmname)
);

create table io_feed (
    id_feed int(6) unsigned not null auto_increment,
    feed_name varchar(50) not null,
    io_key char(50) not null,
    primary key (id_feed)
);

create table alert (
    id int(6) unsigned auto_increment not null,
    dates datetime default(curdate()),
    message varchar(256),
    id_feed int(6) unsigned not null,
    primary key (id),
    foreign key (id_feed) references io_feed(id_feed)
);