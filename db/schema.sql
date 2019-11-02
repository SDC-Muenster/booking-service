DROP TABLE price_per_guest, hotels;

CREATE TABLE unavailable_dates(
  ID SERIAL PRIMARY KEY,
  dates text
);



CREATE TABLE hotels (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  intialPrice INT,
  cleaning INT,
  services INT,
  taxes INT,
) INHERITS (unavailable_dates);





INSERT INTO hotels(name, intialPrice, cleaning, services, taxes, dates)
  VALUES('laudantium House', 124, 147, 33, 317, 16, 35, 47, '10-25-2020 4-28-2020 3-22-2020 9-28-2020 9-24-2020');

-- INSERT INTO hotels(adult, child, infant)
--   VALUES (124, 147, 33);