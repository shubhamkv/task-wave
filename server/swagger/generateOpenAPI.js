const swaggerJSDoc = require("swagger-jsdoc");
const yaml = require("js-yaml");
const swaggerOptions = require("../config/swaggerOptions");

const openapiSpec = swaggerJSDoc(swaggerOptions);
const openapiYaml = yaml.dump(openapiSpec);

console.log(openapiYaml);
