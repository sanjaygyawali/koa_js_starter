// Network interfaces
var ifaces = require("os").networkInterfaces();
// Iterate over interfaces ...
var adresses = Object.keys(ifaces).reduce(function (result, dev) {
  return result.concat(
    ifaces[dev].reduce(function (result, details) {
      return result.concat(
        details.family === "IPv4" && !details.internal ? [details.address] : [],
      );
    }, []),
  );
});

const url = process.env.APP_URL;
const port = process.env.APP_PORT || 3000;
export default `${url}:${port}/assets/`;
