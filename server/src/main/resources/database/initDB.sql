CREATE TABLE IF NOT EXISTS meetingsTable
(
    id              SERIAL PRIMARY KEY ,
    date            BIGSERIAL NOT NULL ,
    initiator       VARCHAR(254) NOT NULL ,
    estimatedTime    SERIAL  NOT NULL
);