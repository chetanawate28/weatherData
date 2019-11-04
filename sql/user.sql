drop table if exists userMaster;
create table `usermaster` (
	`userName` varchar (60),
	`password` varchar (60)
); 

insert into `usermaster` (`userName`, `password`) values('admin','admin');
insert into `usermaster` (`userName`, `password`) values('chetan','chetan');


DELIMITER $$ 
DROP PROCEDURE IF EXISTS stp_getUser $$
CREATE PROCEDURE getUser(strUserid varchar(20)) 
BEGIN
    SELECT *  FROM userMaster;
END $$ 
DELIMITER ;