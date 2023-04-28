use IoT;

-- user data
insert into user (email, password)
values ('thanhluan@gmail.com', '123');

insert into user (email, password)
values ('minhhai@gmail.com', '123');

-- user_info data
insert into user_info (email, fullname, dateofbirth, phone, gender, address)
values ('thanhluan@gmail.com', 'Nguyen Thanh Luan', '2001-01-02', '', 'male', '');

insert into user_info (email, fullname, dateofbirth, phone, gender, address)
values ('minhhai@gmail.com', 'Nguyen Van Minh Hai', '2001-05-02', '', 'male', '');

-- shrimp farm data
insert into shrimp_farm (io_farmname, aio_key)
values ('nvmhai0205', 'aio_elDy24Jp8pJXA5K0wp5B52L1mCHc');

-- owner data
insert into owner (email, io_farmname)
values ('thanhluan@gmail.com','nvmhai0205');

insert into owner (email, io_farmname)
values ('minhhai@gmail.com','nvmhai0205');

-- io_feed data
insert into io_feed (feed_name, io_key)
values ('BBC_FAN','bcc_fan');

insert into io_feed (feed_name, io_key)
values ('BBC_PH','bcc_ph');

insert into io_feed (feed_name, io_key)
values ('BBC_HUMID', 'bbc_humid');

insert into io_feed (feed_name, io_key)
values ('BBC_PUMP', 'bbc_pump');

insert into io_feed (feed_name, io_key)
values ('BBC_LIGHT', 'bbc_light');

insert into io_feed (feed_name, io_key)
values ('BBC_TEMPERATURE', 'bbc_temperature');

insert into io_feed (feed_name, io_key)
values ('BBC_OXYGEN', 'bbc_oxygen');