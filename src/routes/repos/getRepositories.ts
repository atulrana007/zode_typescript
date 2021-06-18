import { cacheClientInstance } from "../../utils/cacheClient";
import { KoaContext, methods } from "../../types";
import { HTTPMethod, RequestHandler, Context } from "@zopsmart/zode";
import { HttpClientInstance } from "../../utils";
import axios from "axios";

type Route = (ctx: KoaContext) => Promise<any>;

export class GetRepository {
  private static instance: undefined | GetRepository = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new GetRepository(HttpClientInstance);
    return this.instance;
  }
  constructor(private readonly client: any) {}
  getRepose = async (ctx: Context): Promise<unknown> => {
    try {
      console.log("fetching data");
      const { username }: any = ctx.state.params;
      console.log(username);
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const repos = response.data.public_repos;
      // set data to redis
      cacheClientInstance.setex(username, 10000, repos);
      return Promise.resolve(response.data);
    } catch (err) {
      console.error(err);
      Promise.resolve(err);
    }
  };
}

const getRepositoryInstance = GetRepository.getInstance();

const routes: { method: HTTPMethod; path: string; handler: RequestHandler }[] =
  [
    {
      method: HTTPMethod.GET,
      path: "/repos/:username",
      handler: getRepositoryInstance.getRepose,
    },
    {
      method: HTTPMethod.GET,
      path: "/metrics",
      handler: () => {
        return Promise.resolve("Metrics");
      },
    },
  ];
export default routes;
