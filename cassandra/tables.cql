use bookings;
DROP TABLE hotels;

CREATE TABLE hotels (
  ID int PRIMARY KEY,
  name text,
  initialPrice int,
  cleaning int,
  services int,
  taxes int,
  unavailable_dates text
);
