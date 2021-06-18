export interface IKafkaClient {
  KafkaProducer: () => Promise<void>;
  KafkaConsumer: () => Promise<any>;
  PrintingOutput: () => any;
}
