import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(chalk.bgRed('ERROR') + ' ' + error);
};

const printSuccess = (msg) => {
  console.log(chalk.bgGreen('SUCCESS') + ' ' + msg);
};

const printHelp = () => {
  console.log(
      dedent`
    ${chalk.bgCyan('HELP')}
    No params - show weather
    
    -s [CITY] - set city
    -t [API_KEY] -set token
    -h - show help
      `,
  );
};

const printWeather = (res, icon) => {
  console.log(
      dedent`
      
    ${chalk.bgBlue('Weather')} in city ${res.name}
    ${icon}  ${res.weather[0].description}
    Temp: ${res.main.temp} (Feels like: ${res.main.feels_like})
    Humidity: ${res.main.humidity}%
    Wind speed: ${res.wind.speed}
    
    `,
  );
};

export {printError, printSuccess, printHelp, printWeather};