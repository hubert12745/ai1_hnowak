create table car
(
    id      integer not null
        constraint car_pk
            primary key autoincrement,
    make text not null,
    model text not null,
    year integer not null
);
