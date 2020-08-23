function get_weather_data_date_taken(backcast) {
  return "<div class='backcast_weather'><label class='date'>" + backcast["date_taken"] + "</label>  "
    + backcast["weather_desc"]
    + "    <i class=\"" + backcast["weather_icon"] + "\"></i>    "
    + Math.round(backcast["temp_min"]) + "&#8451; &ndash; "
    + Math.round(backcast["temp_max"]) + "&#8451;</div>";
}


function print_weather_data_date_for_city(date, city) {
  backcasts = weather_data[date][city]

  $("#city_title").html(city + " today");
  $("#city_weather").html(get_weather_data_date_taken(backcasts[backcasts.length-1]));

  $("#backcasts").empty();
  var i = backcasts.length - 2;
  for (i; i > -1; i--) {
    $("#backcasts").append(
      get_weather_data_date_taken(backcasts[i]) + "<br/>");
  }
}

$(document).ready(function() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  print_weather_data_date_for_city(today, "Zurich");

  $("#zurich").click(function() {
    print_weather_data_date_for_city(today, "Zurich");
  });

  $("#budapest").click(function() {
    print_weather_data_date_for_city(today, "Budapest");
  });

  $("#krakow").click(function() {
    print_weather_data_date_for_city(today, "Krakow");
  });
} );
