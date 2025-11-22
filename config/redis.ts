import { createClient } from "redis";


const redis_port = process.env.REDIS_PORT
console.log("***********",redis_port)

export const redis = createClient({
    url: `redis://localhost:${redis_port}`
});

redis.on("error", (err) => console.error("Redis Error:", err));

(async () => {
    await redis.connect();
})();

export default redis;