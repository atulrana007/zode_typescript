import { Kafka, Message, Producer, Consumer } from "kafkajs";
import { IKafkaClient } from "../../interface/IKafkaClient";

export class KafkaClient implements IKafkaClient {
  private static instance: KafkaClient | undefined = undefined;

  public static getInstance(Kafka: any) {
    if (this.instance !== undefined) return this.instance;
    this.instance = new KafkaClient(Kafka);
    return this.instance;
  }
  private consumer_logs: any = [];
  constructor(private readonly Kafka: any) {}

  private kafka = new this.Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
  });
  private producer: Producer = this.kafka.producer();
  private consumer: Consumer = this.kafka.consumer({
    groupId: "consumer-group",
  });

  KafkaProducer = async () => {
    await this.producer.connect();
    await this.producer.send({
      topic: "test",
      messages: [{ value: "Another One" }],
    });

    await this.producer.disconnect();
  };

  KafkaConsumer = async () => {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: "test", fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }: any) => {
        const streamData = {
          partition,
          topic,
          value: message.value.toString(),
        };
        console.log(streamData);
        this.consumer_logs.push(streamData);
      },
    });
  };
  PrintingOutput = () => {
    return this.consumer_logs;
  };
}
export const KafkaInstance = KafkaClient.getInstance(Kafka);
export const KafkaProducer: Function = KafkaInstance.KafkaProducer;
export const KafkaConsumer: Function = KafkaInstance.KafkaConsumer;
