CREATE TABLE resolutions
(
   id    serial primary key,
   height int not null,
   width int not null,
   pixel_density int not null,
   time_stamp time
);