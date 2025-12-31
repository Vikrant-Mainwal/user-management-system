import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

/**
 * Swagger API configuration
 */
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: `${process.env.APPLICATION_NAME} API Documentation`,
      description: "Auto-generated API documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "jwt",
        },
      },
    },
  },
  apis: ["./backend/routes/**/*.js", "./backend/models/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * Registers Swagger UI & JSON documentation routes
 */
const setupSwaggerDocs = (app) => {
  // Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Raw Swagger JSON
  app.get("/api-docs.json", (req, res) => {
    res.status(200).json(swaggerSpec);
  });
};

export default setupSwaggerDocs;
