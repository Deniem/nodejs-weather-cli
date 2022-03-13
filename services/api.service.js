import {getKeyValue, STORAGE_KEYS} from './storage.service.js';
import axios from 'axios';

const getWeather = async (city) => {
  // const url = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  const token = process.env.TOKEN ?? await getKeyValue(STORAGE_KEYS.token);

  if (!token) {
    throw new Error('Token is not defined.Use -t [API_KEY] to set.');
  }

  const {data} = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: token,
          lang: 'ua',
          units: 'metric',
        },
      },
  );

  return data;
};

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '🌞';
    case '02':
      return '⛅';
    case '03':
      return '⛅';
    case '04':
      return '🌥';
    case '09':
      return '🌧';
    case '10':
      return '🌦';
    case '11':
      return '⛈';
    case '13':
      return '❄';
    case '50':
      return '🌫';
    default:
      return '🌡';
  }

  return '🌡';
};

const getWeatherHttp = (city) => {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');

  url.searchParams.append('q', city);
  url.searchParams.append('appid', token);
  url.searchParams.append('lang', 'ua');
  url.searchParams.append('units', 'metrics');

  http1s.get(url, (response) => {
    let result = '';
    response.on('data', (chunk) => result += chunk);
    response.on('end', () => console.log(result));
    response.on('error', (err) => console.error(err));
  });
};

export {getWeather, getWeatherHttp, getIcon};