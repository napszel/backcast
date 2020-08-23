#!/usr/bin/python
# -*- coding: utf-8 -*-

import json
import pprint
import sqlite3
pp = pprint.PrettyPrinter(indent=4)

conn = sqlite3.connect('../generated/weather.db')
cur = conn.cursor()
cur.execute('SELECT DISTINCT date_for from forecast;')
dates = cur.fetchall()

bigtable = {}

# dict for each date_for
#    '2020-08-20': {
#       "Budapest":[
#          {
#              "date_taken":"2020-08-10",
#              "temp_min":33.57,
#              "temp_max":42.3,
#              "weather_desc":"Broken Clouds",
#              "weather_icon":"wi wi-day-cloudy"
#          },
#          {
#              "date_taken":"2020-08-11",
#              "temp_min":36.32,
#              "temp_max":41.45,
#              "weather_desc":"Broken Clouds",
#              "weather_icon":"wi wi-day-cloudy"
#          }
#      ],
#      "Krakow":[
#          {
#              "date_taken":"2020-08-10",
#              "temp_min":33.44,
#              "temp_max":43.78,
#              "weather_desc":"Light Rain",
#              "weather_icon":"wi wi-day-rain"
#          },
#          {
#              "date_taken":"2020-08-11",
#              "temp_min":38.34,
#              "temp_max":41.66,
#              "weather_desc":"Light Rain",
#              "weather_icon":"wi wi-day-rain"
#          }
#      ]
#    },
#    '2020-08-21': {
#     ...


for date in dates:
    cur.execute('SELECT DISTINCT city_id, city.name from forecast JOIN city on city.rowid=forecast.city_id WHERE date_for=?;', (date[0],))
    cities = cur.fetchall()
    next_date = {}
    list_of_cities = {}
    for city_id, city_name in cities:
        cur.execute('SELECT * from forecast WHERE date_for=? AND city_id=? ORDER BY date_taken ASC;', (date[0], city_id))
        next_city = {}
        forecasts = cur.fetchall()
        list_of_forecasts = []
        for fc in forecasts:
            next_data = {}
            next_data["date_taken"] = fc[0]
            next_data["temp_min"] = fc[3]
            next_data["temp_max"] = fc[4]
            next_data["weather_desc"] = fc[5]
            next_data["weather_icon"] = fc[6]
            list_of_forecasts.append(next_data)
        list_of_cities[city_name] = list_of_forecasts

    bigtable[date[0]] = list_of_cities

html = open('../generated/weather_data.js', 'w')
html.write("weather_data = " + json.dumps(bigtable) + "\n")
html.close()
