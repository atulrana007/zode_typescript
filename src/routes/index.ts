import { HTTPMethod, RequestHandler } from "@zopsmart/zode";
import GetRepositoryRoutes from "../routes/repos/getRepositories";
import KafkaRoutes from "./sample-kafka/sample-kafka";

const finalRoutes: {
  method: HTTPMethod;
  path: string;
  handler: RequestHandler;
}[] = [
  {
    method: HTTPMethod.GET,
    path: "/hello",
    handler: () => {
      return Promise.resolve("RESOLVED");
    },
  },
  ...GetRepositoryRoutes,
  ...KafkaRoutes,
];
export default finalRoutes;
