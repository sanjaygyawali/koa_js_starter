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

export default "http://0.0.0.0:3000/assets/";
