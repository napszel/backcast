#!/bin/bash

set -e

date=$(date +%Y%m%d)
mkdir -p ../daily-saves/$date

city="Zurich"
curl -f -g -s "https://api.openweathermap.org/data/2.5/onecall?lat=47.36667&lon=8.55&exclude=hourly,minutely&units=metric&appid=$1" > ../daily-saves/$date/$city-forecast.json || echo Download forecast data for $city failed

city="Budapest"
curl -f -g -s "https://api.openweathermap.org/data/2.5/onecall?lat=47.4979&lon=19.0402&exclude=hourly,minutely&units=metric&appid=$1" > ../daily-saves/$date/$city-forecast.json || echo Download forecast data for $city failed

city="Krakow"
curl -f -g -s "https://api.openweathermap.org/data/2.5/onecall?lat=50.0647&lon=19.945&exclude=hourly,minutely&units=metric&appid=$1" > ../daily-saves/$date/$city-forecast.json || echo Download forecast data for $city failed

city="Balatonederics"
curl -f -g -s "https://api.openweathermap.org/data/2.5/onecall?lat=46.802756&lon=17.383719&exclude=hourly,minutely&units=metric&appid=$1" > ../daily-saves/$date/$city-forecast.json || echo Download forecast data for $city failed

city="Mounteverest"
curl -f -g -s "https://api.openweathermap.org/data/2.5/onecall?lat=27.9896397&lon=86.9225283&exclude=hourly,minutely&units=metric&appid=$1" > ../daily-saves/$date/$city-forecast.json || echo Download forecast data for $city failed
