export interface Config {
  steamApiKey: string;
  queue: QueueConfig;
  services: Services;
}

export interface Services {
  schema: string;
}

export interface QueueConfig {
  host: string;
  port: number;
  password: string;
}

export default (): Config => {
  return {
    steamApiKey: process.env.STEAM_API_KEY,
    queue: {
      host: process.env.QUEUE_HOST,
      port: parseInt(process.env.QUEUE_PORT, 10),
      password: process.env.QUEUE_PASSWORD,
    },
    services: {
      schema: process.env.SCHEMA_SERVICE_URL,
    },
  };
};
