module.exports = {
  apps : [{
    script: '../frontend/src/index.js',
    watch: '.'
  }, {
    script: './server.js',
    watch: ['./server.js']
  }],

  env: {
    NODE_ENV: "development",
    API_KEY: 'AIzaSyDCyXm_G0BLJLc7n5AlTP2q8qQhrZuOkO8'
  },
  env_production: {
    NODE_ENV: "production",
    API_KEY: 'AIzaSyDCyXm_G0BLJLc7n5AlTP2q8qQhrZuOkO8'
  },

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
