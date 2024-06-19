module.exports = {
    apps: [
      {
        name: 'faucet-client',           // Application name
        script: './faucet-client/build-client.js', // Script to be run
        instances: 1,          // Number of instances to be started
        autorestart: true,     // Automatically restart crashed application
        watch: false,          // Watch files for changes
        max_memory_restart: '1G', // Restart the application if it reaches this memory usage
      }
    ]
  };