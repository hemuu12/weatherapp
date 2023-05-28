function BackgroundImage(data) {
  let id = 0;
  if (!Array.isArray(data) && data.list[0].weather[0].id) {
    id = data.list[0].weather[0].id;
  }

  function getImageUrl(weatherId) {
    // id classification https://openweathermap.org/weather-conditions
    switch (true) {
      case weatherId >= 200 && weatherId < 300:
        document.body.classList.remove(
          'rain',
          'snow',
          'cloudy',
          'drizzle',
          'clear-day',
          'strong-wind'
        );
        document.body.classList.add('thunderstorm');
        return 'https://i.gifer.com/Rnim.gif'; // thunderstorm
      case weatherId >= 300 && weatherId < 400:
        document.body.classList.remove(
          'rain',
          'snow',
          'cloudy',
          'clear-day',
          'strong-wind',
          'thunderstorm'
        );
        document.body.classList.add('drizzle');
        return ''; // drizzle
      case weatherId >= 500 && weatherId < 600:
        document.body.classList.remove(
          'snow',
          'cloudy',
          'drizzle',
          'clear-day',
          'strong-wind',
          'thunderstorm'
        );
        document.body.classList.add('rain');
        return ''; // rain
      case weatherId >= 600 && weatherId < 700:
        document.body.classList.remove(
          'rain',
          'cloudy',
          'drizzle',
          'clear-day',
          'strong-wind',
          'thunderstorm'
        );
        document.body.classList.add('snow');
        return ''; // snow
      case weatherId >= 700 && weatherId < 800:
        document.body.classList.remove(
          'rain',
          'snow',
          'cloudy',
          'drizzle',
          'clear-day',
          'thunderstorm'
        );
        document.body.classList.add('strong-wind');
        return ''; // strong wind
      case weatherId === 800:
        document.body.classList.remove(
          'rain',
          'snow',
          'drizzle',
          'cloudy',
          'strong-wind',
          'thunderstorm'
        );
        document.body.classList.add('clear-day');
        return ''; // clear day Image
      default:
        document.body.classList.remove(
          'rain',
          'snow',
          'drizzle',
          'clear-day',
          'strong-wind',
          'thunderstorm'
        );
        document.body.classList.add('cloudy');
        return ''; // cloudy day
    }
  }

  return getImageUrl(Number(id));
}

export default BackgroundImage;
