module.exports = {
  apps: [{
    name: 'shine_tickets',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/html/shine_tickets',
    instances: 1,
    exec_mode: 'fork',
  }],
};
