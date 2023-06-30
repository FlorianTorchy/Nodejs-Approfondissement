module.exports = {
  apps: [
    {
      name: "app_prod",
      script: "www/app.js",
      error_file: "./logs/err.log",
      log_max_size: "200M",
      env_production: {
        NODE_ENV: "production",
        PORT: 3003
      },
      env_dev: {
        name: "dev",
        NODE_ENV: "dev",
        PORT: 3004
      },
      env_test: {
        name: "test",
        NODE_ENV: "test",
        PORT: 3005
      },
      instances : 3,
      exec_mode: "cluster"
    },

    // {
    //   name: "app_dev",
    //   script: "www/app.js",
    //   error_file: "/logs/err.log",
    //   error_max_size: "200M",
    //   env_production: {
    //     NODE_ENV: "dev",
    //     PORT: 3004
    //   },
    // },

    // {
    //   name: "app_test",
    //   script: "www/app.js",
    //   error_file: "/logs/err.log",
    //   error_max_size: "200M",
    //   env_production: {
    //     NODE_ENV: "test",
    //     PORT: 3005
    //   },
    // },
  ],
};
