import "./env";
import logger from "morgan";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { uploadMiddleware, uploadController } from "./uploadPhoto";

const PORT = process.env.PORT || 80;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);

const handleRunning = () =>
  console.log(`Server is running on: http://localhost:${PORT}`);

server.start({ port: PORT }, handleRunning());
