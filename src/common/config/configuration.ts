export interface Config {
  port: number;
  steamApiKey: string;
  chunkSize: number;
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
    port:
      process.env.NODE_ENV === 'production'
        ? 3000
        : parseInt(process.env.PORT, 10),
    steamApiKey: process.env.STEAM_API_KEY,
    chunkSize: parseInt(process.env.CHUNK_SIZE, 10) || 100,
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
