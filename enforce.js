var gitenforcer = require('./index'),
    rules = require('./rules').rules,
    // note that you can specify either 'user' or 'org' depending on if you want to watch a username or an organization
    app = gitenforcer({
      baseUrl: process.env.BASE_URL,
      token: process.env.GITHUB_TOKEN,
      org: process.env.GITHUB_ORG
    });

// enable rules
Object.keys(rules).forEach(function (key) {
    app.use(rules[key]);
});
