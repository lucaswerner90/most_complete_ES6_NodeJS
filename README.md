# Own simple project

## Scripts available
```
"scripts": {
  "start": "node server.js",
  "launch": "DEBUG=express* PORT=7000 nodemon --inspect server.js",
  "test": "PORT=9000 mocha --watch ./src/test/server_side/**/*.test.js",
  "upload:github": "git add -A && git commit -m 'Automatic commit from package.json' && git push -u ownbranch master",
  "coverage": "PORT=9000 nyc --reporter=html mocha --watch ./src/test/server_side/**/*.test.js",
  "heroku:deploy": "gulp init && git add . && git commit -m 'Heroku deployment' && git push heroku master && heroku open",
  "heroku:open": "heroku open",
  "heroku:log": "heroku logs --tail",
  "compile": "gulp init && gulp execute",
  "documentation": "jsdoc ./src/**/*.js -d documentation"
}
```

## Implementations

- Test coverage
- Test code
- JSDoc documentation
- Heroku deployment
- Gulpfile
- ES6 compilation
