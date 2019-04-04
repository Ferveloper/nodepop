module.exports = {
  apps : [{
    name: 'nodepop',
    script: './bin/www',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    env: {
      NODE_ENV: 'development',
      watch: true,
      ignore_watch : ['node_modules', 'public/images'],
    },
    env_production: {
      NODE_ENV: 'production',
      watch: false
    }
  },
  {
    name: 'thumbnail generator service',
    script: './services/thumbnailService.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    env: {
      NODE_ENV: 'development',
      watch: true,
      ignore_watch : ['node_modules', 'public/images']
    },
    env_production: {
      NODE_ENV: 'production',
      watch: false
    }
  }
],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
