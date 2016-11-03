

CREATE TABLE resolutions
(
   id    serial primary key,
   height int not null,
   width int not null,
   pixel_density decimal not null,
   cookie character(500),
   time_stamp timestamp
);