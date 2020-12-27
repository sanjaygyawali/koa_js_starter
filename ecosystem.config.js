module.exports = {
  apps: [
    {
      name: "mockserver",
      exec_mode: "cluster",
      instances: 1,
      script: "npm",
      args: "run watch",
    },
  ],
};
