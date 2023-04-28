use IoT;

delimiter //
-- drop procedure if exists Login;
create procedure Login(email_in varchar(30), pass_in varchar(30))
begin
	select * from user where email = email_in and password = pass_in;
end //
delimiter ;

call Login('minhhai@gmail.com','123');

delimiter //
-- drop procedure if exists Register;
create procedure Register(email_in varchar(30), pass_in varchar(30))
begin
	insert into user (email, password) values (email_in, pass_in);
    insert into owner (email, io_farmname) values (email_in, 'nvmhai0205');
end //
delimiter ;

select * from user;


select * from owner;