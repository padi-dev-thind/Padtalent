import { createClient } from 'redis';

const client = createClient();

const setCacheExpire = async (key: string, value: any, ttl: number) => {
  try {
    await client.set(key, JSON.stringify(value), {
      EX: ttl,
    });
    return {
      message: 'Cache successfully',
      status: 'success',
    };
  } catch (err: any) {
    return {
      message: 'Cache failed',
      status: 'fail',
    };
  }
};

const getCacheExpire = async (key: string) => {
  return await client.get(key);
};

const deleteCacheExpire = async (key: string) => {
  return await client.del(key);
};

client.on('connect', () => {
  `Redis client connected on port 6379!`;
});

client.on('error', (err: any) => {
  console.log(`Error: ${err?.message}`);
});

export { getCacheExpire, setCacheExpire, deleteCacheExpire, client };
