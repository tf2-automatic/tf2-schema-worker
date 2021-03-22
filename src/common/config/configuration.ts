export interface Config {
  steamApiKey: string;
  queue: QueueConfig;
  services: Services;
}

export interface Services {
  schema: string;
}

export interface QueueConfig {
  isSentinel: boolean;
  host: string;
  port: number;
  password?: string;
  set?: string;
}

export default (): Config => {
  return {
    steamApiKey: process.env.STEAM_API_KEY,
    queue: {
      isSentinel: process.env.QUEUE_IS_SENTINEL === 'true',
      host: process.env.QUEUE_HOST,
      port: parseInt(process.env.QUEUE_PORT, 10),
      password: process.env.QUEUE_PASSWORD,
      set: process.env.QUEUE_SET,
    },
    services: {
      schema: process.env.SCHEMA_SERVICE_URL,
    },
  };
};
