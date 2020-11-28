-- Drop table

-- DROP TABLE playfield.usr;

CREATE TABLE playfield.usr (
	id serial NOT NULL DEFAULT nextval('playfield.usr_id_seq'::regclass),
	email varchar NOT NULL,
	pword varchar NOT NULL,
	tstamp timestamp(0) NOT NULL,
	nickname varchar NOT NULL
);
