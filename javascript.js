function print_weather_data(today, city) {
  forecasts = weather_data[today][city]
  $("#weather_data").append("<p id=\"" + city + "\">" + city + ": </p>" );
  var i;
  for (i = 0; i < forecasts.length; i++) {
    $("#" + city).append(
      "<label>"
	+ "<b>" + forecasts[i]["date_taken"] + "</b> "
        + "<i class=\"" + forecasts[i]["weather_icon"] + "\"></i>"
	+ "Min: " + forecasts[i]["temp_min"] + " "
	+ "Max: " + forecasts[i]["temp_max"]
	+ "</label> | " );
  }
}

$(document).ready(function() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  print_weather_data(today, "Zurich");
  print_weather_data(today, "Budapest");
  print_weather_data(today, "Krakow");
} );
