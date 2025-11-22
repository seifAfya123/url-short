// create url
// check if url in database
// retrun the short if exists and save it to redis
// if not exists creat short url and save to database then to redis
// retrun the short url

// get url
// check redis
// if exists return it 
// if not check database
// if exists retrun url and save it to redis 
// if not exists return message url does not exists

import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";

const searchMainUrl = async (url: string) => {
    const relatedURL = await prisma.url.findFirst({
        where: {
            mainUrl: {
                equals: url
            }
        }
    })
    if (relatedURL) {
        return relatedURL
    }
    return null
}

const searchShortUrl = async (code: string) => {
    const relatedURL = await prisma.url.findFirst({
        where: {
            shortUrl: {
                endsWith: code
            }
        }
    })
    if (!relatedURL) {
        throw new AppError("Url Not Found", 404);
    }
    return relatedURL
}

const saveNewURL = async (newUrlData: Prisma.UrlCreateInput) => {
    return prisma.url.create({
        data: newUrlData
    });
};



export default { searchMainUrl, searchShortUrl, saveNewURL }