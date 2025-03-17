module.exports = {
  apps: [
    {
      name: 'odoo-cloud-plc-proxy',
      script: './dist/server.js',
      watch: true,
      env: {
        // Default environment (production)
        NODE_ENV: 'production',
        TARGET_URL: 'https://demeyre-hvac.cloudpepper.site',
        SERVER_PORT: 8051,
        SERVER_IP: '0.0.0.0'
      },
      env_development: {
        // Development environment
        NODE_ENV: 'development',
        TARGET_URL: 'https://demeyre-hvac.cloudpepper.site',
        SERVER_PORT: 4200,
        SERVER_IP: '127.0.0.1'
      }
    }
  ]
};

/*
 * To start the application with the default (production) environment:
 * pm2 start ecosystem.config.js
 *
 * To start the application with the development environment:
 * pm2 start ecosystem.config.js --env development
 */