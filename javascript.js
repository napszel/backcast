
function print_weather_data(today, city) {
  forecasts = weather_data[today][city]

  $("#title").html(city);

  $("#weather_data").empty();
  var i;
  for (i = 0; i < forecasts.length; i++) {
    $("#weather_data").append(
      "<div>"
	+ "<label class='date'>" + forecasts[i]["date_taken"] + "</label>  "
        + forecasts[i]["weather_desc"]
        + "    <i class=\"" + forecasts[i]["weather_icon"] + "\"></i>    "
	+ Math.round(forecasts[i]["temp_min"]) + "&#8451; &ndash; "
	+ Math.round(forecasts[i]["temp_max"]) + "&#8451;"
	+ "</div><br/>" );
  }
}

$(document).ready(function() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  print_weather_data(today, "Zurich");

  $("#zurich").click(function() {
    print_weather_data(today, "Zurich");
  });

  $("#budapest").click(function() {
    print_weather_data(today, "Budapest");
  });

  $("#krakow").click(function() {
    print_weather_data(today, "Krakow");
  });
} );
