CREATE TABLE City (
	  lon FLOAT
	, lat FLOAT
	, name TEXT
	, display_name TEXT
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

insert into City (lon, lat, name, display_name) VALUES (8.55, 47.36667, "zurich", "Zürich");
insert into City (lon, lat, name, display_name) VALUES (19.0402, 47.4979, "budapest", "Budapest");
insert into City (lon, lat, name, display_name) VALUES (19.945, 50.0647, "krakow", "Kraków");
insert into City (lon, lat, name, display_name) VALUES (17.383719, 46.802756, "balatonederics", "Balatonederics");
insert into City (lon, lat, name, display_name) VALUES (86.9225283, 27.9896397, "mounteverest", "Mount Everest");

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
