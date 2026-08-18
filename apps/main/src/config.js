// BASE_URL for "dev" historically differed between the admin and operators
// apps (they pointed at different backend instances). Now that both roles
// build from this one app, that per-role difference is keyed on
// REACT_APP_ROLE instead of living in two duplicated files.
const DEV_BASE_URL_BY_ROLE = {
  admin: "https://performance-dialogue-d5552af161a7.herokuapp.com/api/v1",
  operators: "https://perf-dial-dev.rightclick-academy.com/api/v1",
};

const role = process.env.REACT_APP_ROLE || "operators";

const config = {
  dev: {
    BASE_URL: DEV_BASE_URL_BY_ROLE[role] || DEV_BASE_URL_BY_ROLE.operators,
  },
  staging: {
    BASE_URL: "https://perf-dial-staging.rightclick-academy.com/api/v1",
  },
  production: {
    BASE_URL: "https://performance-dialogue-d5552af161a7.herokuapp.com/api/v1",
  },
};

export default config[process.env.REACT_APP_ENV || "dev"];
