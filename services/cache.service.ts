import redis from "../config/redis"
import { Url } from '@prisma/client';

const exTime = parseInt(process.env.CACHING_TIME_TO_LIVE || "3600", 10);

const saveNewURL = async (newurl: Url) => {
    return await redis.set(newurl.shortUrl, newurl.mainUrl, { EX: exTime });
}
const getURL = async (clientUrl: string) => {
    return await redis.get(clientUrl)
}

export default { saveNewURL, getURL }