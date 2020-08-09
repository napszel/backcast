CREATE TABLE City (
	  lon FLOAT
	, lat FLOAT
	, name TEXT
);

CREATE TABLE Forecast (
	  date_taken TEXT
	, date_for TEXT
	, city_id INT NOT NULL
	, temp_min FLOAT
	, temp_max FLOAT
	, weather_desc TEXT
	, weather_icon TEXT
	, FOREIGN KEY (city_id) REFERENCES City (ROWID)
	, PRIMARY KEY (date_taken, date_for, city_id)
);

insert into City (lon, lat, name) VALUES (8.55, 47.36667, "Zurich");
insert into City (lon, lat, name) VALUES (19.0402, 47.4979, "Budapest");
insert into City (lon, lat, name) VALUES (19.945, 50.0647, "Krakow");
