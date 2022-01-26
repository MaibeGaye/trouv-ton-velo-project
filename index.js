require('dotenv').config();
const express = require('express');

const router = require('./app/router');

const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;


const expressJSDocSwagger = require('express-jsdoc-swagger');

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

const firstFunction = expressJSDocSwagger(app);

//on ajoute un middleware à notre app express en exécutant cette 1ère fonction qui va prendre en paramètre l'object de config
firstFunction(options);


//pas d'object de config pour régler finement les droits d'entrée
//on ne met pas de limitation d'accès, welcome everybody
app.use(cors({
  origin: '*'
}));

//on prévient express qu'il peut recevoir des infos au format json dans le body de la request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

app.use(express.static('assets'));

app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
});
