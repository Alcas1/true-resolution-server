

CREATE TABLE resolutions
(
   id    serial primary key,
   height int not null,
   width int not null,
   pixel_density decimal not null,
   time_stamp timestamp
);