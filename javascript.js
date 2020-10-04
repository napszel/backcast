function get_weather_data(predictions, reference) {
  if (predictions) {
    return "<div><label class='date'>" + predictions[reference] + "</label>  "
      + predictions["weather_desc"]
      + "    <i class=\"" + predictions["weather_icon"] + "\"></i>    "
      + Math.round(predictions["temp_min"]) + "&#8451; &ndash; "
      + Math.round(predictions["temp_max"]) + "&#8451;</div>";
  }
}

function print_backcasts(date, city) {
  $("#backcasts").empty();
  backcasts = weather_data[date][city];
  var i = backcasts.length - 2;
  for (i; i > -1; i--) {
    $("#backcasts").append(
      get_weather_data(backcasts[i], "date_taken") + "<br/>");
  }
}

function print_forecasts(date, city) {
  $("#forecasts").empty();
  for (var i = 0; i < 7; i++) {
    next_day = weather_data[get_future_date(i)][city];
    forecast = get_weather_data(next_day[next_day.length - 1], "date_for") + "<br/>";
    $("#forecasts").append(forecast);
  }
}

function print_weather_data_date_for_city(date, city) {
  if (!(city in weather_data[date])) {
    city = "Zurich";
  }

  $("#city_title").html(city + " today");
  todays = weather_data[date][city];
  $("#city_weather").html(get_weather_data(todays[todays.length-1], "date_taken"));

  print_backcasts(date, city);
  print_forecasts(date, city);
}

function date_to_string(date) {
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0');
  var yyyy = date.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}

function get_today() {
  return get_future_date(0);
}

function get_future_date(offset) {
  const fdate = new Date();
  fdate.setDate(fdate.getDate() + offset);
  return date_to_string(fdate);
}

$(document).ready(function() {
  // Get the code after # in the url and load that city
  var startHash = window.location.hash.substring(1);
  // If there's none, load our main city
  if (!startHash) {
    startHash = "zurich";
  }

  // Print today's weather backcast/forecast for the selected city
  var startCity = startHash.charAt(0).toUpperCase() + startHash.slice(1);
  print_weather_data_date_for_city(get_today(), startCity);

  // Add even listeners for each city button
  $("#zurich").click(function() {
    print_weather_data_date_for_city(get_today(), "Zurich");
  });

  $("#budapest").click(function() {
    print_weather_data_date_for_city(get_today(), "Budapest");
  });

  $("#krakow").click(function() {
    print_weather_data_date_for_city(get_today(), "Krakow");
  });

  $("#balatonederics").click(function() {
    print_weather_data_date_for_city(get_today(), "Balatonederics");
  });

  $("#mounteverest").click(function() {
    print_weather_data_date_for_city(get_today(), "Mounteverest");
  });
} );
