DROP TABLE hotels;


CREATE TABLE hotels (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  initialPrice INT,
  cleaning INT,
  services INT,
  taxes INT,
  unavailable_dates text
);


