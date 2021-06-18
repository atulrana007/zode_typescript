import { HTTPMethod, RequestHandler } from "@zopsmart/zode";
import { IKafkaClient } from "../../interface";
import { KafkaInstance } from "../../utils";

export class SampleKafka {
  private static instance: SampleKafka | undefined = undefined;

  public static getInstance(KafkaInstance: IKafkaClient) {
    if (this.instance === undefined) {
      this.instance = new SampleKafka(KafkaInstance);
    }
    return this.instance;
  }
  constructor(private readonly KafkaInstance: IKafkaClient) {}
  producer = () => {
    return Promise.resolve(this.KafkaInstance.KafkaProducer());
  };
  consumer = () => {
    this.KafkaInstance.KafkaConsumer();
    return Promise.resolve(this.KafkaInstance.PrintingOutput());
  };
}

const sampleKafkaInstance = SampleKafka.getInstance(KafkaInstance);

const routes: { path: string; method: HTTPMethod; handler: RequestHandler }[] =
  [
    {
      path: "/kafka/producer",
      method: HTTPMethod.POST,
      handler: sampleKafkaInstance.producer,
    },
    {
      path: "/kafka/consumer",
      method: HTTPMethod.GET,
      handler: sampleKafkaInstance.consumer,
    },
  ];

export default routes;
