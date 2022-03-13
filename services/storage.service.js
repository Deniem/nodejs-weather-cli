import {homedir} from 'os';
import {join} from 'path';
import {promises} from 'fs';
import {printError, printSuccess} from './log.service.js';

const STORAGE_KEYS = {
  city: 'city',
  token: 'token',
};

const filePath = join(homedir(), 'weather-data.json');

const saveKeyValue = async (key, value) => {
  // console.info(filePath);
  // console.info(basename(filePath));
  // console.info(dirname(filePath));
  // console.info(extname(filePath));
  // console.info(relative(filePath, dirname(filePath)));
  // console.info(isAbsolute(filePath));
  // console.info(resolve(filePath));
  // console.info(sep);

  let data = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;

  try {
    await promises.writeFile(filePath, JSON.stringify(data));
    printSuccess(`${key} stored as:${value}`);
  } catch (e) {
    printError(`Unable to save value due to ${e.message}`);
  }
};

const getKeyValue = async (key) => {

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key] ?? undefined;
  }

  return undefined;
};

const isExist = async (path) => {
  try {
    await promises.stat(path);

    return true;
  } catch (e) {
    console.log(e.message);
  }
  return false;
};

export {saveKeyValue, getKeyValue, STORAGE_KEYS};