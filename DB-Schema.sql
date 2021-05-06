use chat;

create table `ROOM` (
`socketID` varchar(30),
`roomID` char(38) not null,
`title` varchar(150),
`date` datetime,
`isAdmin` boolean,
`isActive` boolean
);

create table `USER`(
`userID` int not null AUTO_INCREMENT primary key,
`name` varchar(30) not null,
`surname` varchar(30) not null,
`email` varchar(50) not null
);

ALTER TABLE `USER` AUTO_INCREMENT = 1000;

create table `USER_SOCKET`(
`userID` int not null,
`socketID` varchar(30)
);

create table `ADMIN`(
`adminID` int not null AUTO_INCREMENT primary key,
`name` varchar(30),
`password` varchar(30)
);

create table `ADMIN_SOCKET`(
`adminID` int not null,
`socketID` varchar(30)
);

create table `MESSAGES`(
`messageID` int not null AUTO_INCREMENT primary key,
`message` varchar(5000) not null ,
`roomID` char(38) not null,
`senderSocketID` varchar(30),
`date` datetime
);




