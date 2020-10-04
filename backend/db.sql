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
insert into City (lon, lat, name) VALUES (17.383719, 46.802756, "Balatonederics");
insert into City (lon, lat, name) VALUES (86.9225283, 27.9896397, "Mounteverest");

----

update forecast set weather_icon="wi wi-day-cloudy" where weather_desc="Overcast Clouds" or
weather_desc="Scattered Clouds" or weather_desc="Broken Clouds" or weather_desc="Few Clouds";

update forecast set weather_icon="wi wi-day-rain" where weather_desc="Light Rain" or
weather_desc="Heavy Intensity Rain" or weather_desc="Moderate Rain";

update forecast set weather_icon="wi wi-day-sunny" where weather_desc="Clear Sky";

----

update forecast set weather_icon="grey wi wi-day-cloudy" where weather_desc like '%Clouds%';

update forecast set weather_icon="yellow wi wi-day-sunny" where weather_desc like '%Clear%';

update forecast set weather_icon="blue wi wi-day-rain" where weather_desc like '%Rain%';
