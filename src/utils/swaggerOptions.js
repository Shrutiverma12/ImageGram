import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Image gram API",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and document with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
    ],
  },
  apis: [path.resolve(__dirname, "../routers/v1/*.js")],
};
