#!/usr/bin/python
# -*- coding: utf-8 -*-

import sqlite3
import requests
import sys
import json
from datetime import datetime

conn = sqlite3.connect('../generated/weather.db')
conn.row_factory = sqlite3.Row

if len(sys.argv) < 2:
    print("Run it with API key as parameter")
    sys.exit(1)

api_key=sys.argv[1]

url = "https://api.openweathermap.org/data/2.5/forecast?lon=%s&lat=%s&exclude=hourly,minutely&units=metric&appid=%s"
date_taken = datetime.date(datetime.now())

# Read weather icons mapping. Downloaded from https://gist.github.com/tbranyen/62d974681dea8ee0caa1
f = open('icons.json',)
icons = json.load(f)
f.close()

try:
    c = conn.cursor()
    
    for city in conn.cursor().execute('SELECT rowid, lon, lat, name from City;'):
        #print('City:', city['name'], city['lon'], city['lat'])
        city_id = city["rowid"]
        download_url = url %(city['lon'], city['lat'], api_key)
        
        response = requests.get(download_url)
        if not response.ok:
            print("Download failed for {}. Tried with {}".format(city["name"], download_url))
            continue

        text_data = response.text        
        json_data = json.loads(text_data)
            
        fc = json_data["list"]
        for day in fc:
            # The new API give you hourly breakdown... but nobody needs that, so I just take the one at 12
            hour = datetime.utcfromtimestamp(day["dt"]).strftime('%H')
            if int(hour) != 12:
                continue

            date_for = datetime.utcfromtimestamp(day["dt"]).strftime('%Y-%m-%d')
            temp_min = day["main"]["temp_min"]
            temp_max = day["main"]["temp_max"]
            weather_description = day["weather"][0]["description"].title()

            # weather icon needs data from the icons json and some prefixing to match the css classes
            prefix = 'wi wi-'
            weather_id = day["weather"][0]["id"]
            weather_icon = icons[str(weather_id)]["icon"]
            if not (weather_id > 699 and weather_id < 800) and not (weather_id > 899 and weather_id < 1000):
                weather_icon = 'day-' + weather_icon
            weather_icon = prefix + weather_icon

            # plus add some colors to them too
            if "Clear" in weather_description:
                weather_icon = 'yellow ' + weather_icon
            if "Clouds" in weather_description:
                weather_icon = 'grey ' + weather_icon
            if "Rain" in weather_description:
                weather_icon = 'blue ' + weather_icon
            if "Snow" in weather_description:
                weather_icon = 'lightblue ' + weather_icon

            next_day_to_insert = [(date_taken, date_for, city_id, temp_min, temp_max, weather_description, weather_icon)]
            c.executemany("INSERT OR IGNORE INTO Forecast (date_taken, date_for, city_id, temp_min, temp_max, weather_desc, weather_icon) VALUES (?, ?, ?, ?, ?, ?, ?)", next_day_to_insert)

    conn.commit()
except conn.Error as err:
    print(err)
    print("Transaction failed! ROLLBACK")
    conn.rollback()

conn.close()
