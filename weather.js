#!/usr/bin/env node

import {getArgs} from './helpers/args.js';
import * as log from './services/log.service.js';
import {printError, printWeather} from './services/log.service.js';
import {
  getKeyValue,
  saveKeyValue,
  STORAGE_KEYS,
} from './services/storage.service.js';
import {getIcon, getWeather} from './services/api.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Token cannot be blank.');
    return;
  }
  try {
    await saveKeyValue(STORAGE_KEYS.token, token);
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const weather = await getWeather(
        process.env.CITY ?? await getKeyValue(STORAGE_KEYS.city));
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (e) {
    let error = 'Unknown error. ';
    switch (e?.response?.status) {
      case 404:
        error = `City ${process.env.CITY} not found.`;
        break;
      case 401:
        error = 'Token is invalid';
        break;
      default:
        error += e.message;
        break;
    }

    printError(error);
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.s) {
    return saveKeyValue(STORAGE_KEYS.city, args.s);
  }
  if (args.h) {
    return log.printHelp();
  }
  if (args.t) {
    return saveToken(args.t);
  }

  return getForecast();
};

initCLI();