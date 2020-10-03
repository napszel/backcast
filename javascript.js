function get_weather_data_date_taken(backcast) {
  if (backcast) {
    return "<div><label class='date'>" + backcast["date_taken"] + "</label>  "
      + backcast["weather_desc"]
      + "    <i class=\"" + backcast["weather_icon"] + "\"></i>    "
      + Math.round(backcast["temp_min"]) + "&#8451; &ndash; "
      + Math.round(backcast["temp_max"]) + "&#8451;</div>";
  }
}

function get_weather_data_date_for(forecasts) {
  if (forecasts) {
    return "<div><label class='date'>" + forecasts["date_for"] + "</label>  "
      + forecasts["weather_desc"]
      + "    <i class=\"" + forecasts["weather_icon"] + "\"></i>    "
      + Math.round(forecasts["temp_min"]) + "&#8451; &ndash; "
      + Math.round(forecasts["temp_max"]) + "&#8451;</div>";
  }
}

function print_backcasts(backcasts) {
  $("#backcasts").empty();
  var i = backcasts.length - 2;
  for (i; i > -1; i--) {
    $("#backcasts").append(
      get_weather_data_date_taken(backcasts[i]) + "<br/>");
  }
}

function print_forecasts(date, city) {
  $("#forecasts").empty();
  var j = 7;
  for (var i = 0; i < 7; i++) {
    next_day = weather_data[get_future_date(i)][city];
    console.log(next_day);
    forecast = get_weather_data_date_for(next_day[j]) + "<br/>";
    j--;
    $("#forecasts").append(forecast);
  }
}

function print_weather_data_date_for_city(date, city) {
  if (!(city in weather_data[date])) {
    city = "Zurich";
  }
  backcasts = weather_data[date][city];

  $("#city_title").html(city + " today");
  $("#city_weather").html(get_weather_data_date_taken(backcasts[backcasts.length-1]));

  print_backcasts(backcasts);
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
  var startHash = window.location.hash.substring(1);
  if (!startHash) {
    startHash = "zurich";
  }

  var startCity = startHash.charAt(0).toUpperCase() + startHash.slice(1);
  print_weather_data_date_for_city(get_today(), startCity);

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
} );
