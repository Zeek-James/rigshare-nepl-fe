const config = {
  dev: {
    BASE_URL: "https://performance-dialogue-d5552af161a7.herokuapp.com/api/v1",
  },
  staging: {
    BASE_URL: "https://perf-dial-staging.rightclick-academy.com/api/v1",
  },
  production: {
    BASE_URL: "https://performance-dialogue-d5552af161a7.herokuapp.com/api/v1",
  },
};

export default config[process.env.REACT_APP_ENV || "dev"];