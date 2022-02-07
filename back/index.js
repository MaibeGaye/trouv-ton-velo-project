require('dotenv').config();
const express = require('express');

const router = require('./app/router');
const cleaner = require('./app/middlewares/sanitizer');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cleaner);

const options = {
  info: {
    version: '1.0.0',
    title: 'Trouv ton velo',
    description: 'A bike renting app REST API',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
};
const jsDoc = expressJSDocSwagger(app);
jsDoc(options);

app.use(cors({
  origin: [`https://trouv-ton-velo.surge.sh`,`http://localhost:${port}`],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
  optionsSuccessStatus: 204
  //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended: true}));

app.use(router);

app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
});
