import { Request, Response, NextFunction } from "express";
import redisService from "../services/cache.service";
import dataBaseService from "../services/url.service";
import { AppError } from "../utils/AppError";
import { generateHmac } from "../utils/generateCode";

function normalizeUrl(url: string) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return "https://" + url;
    }
    return url;
}


export const getShortURL = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const code = req.params.code;
        console.log("------------------------", code);

        if (!code) {
            throw new AppError("Short code is required", 400);
        }

        // Check Redis cache first
        const cachedUrl = await redisService.getURL(code);
        if (cachedUrl) {
            console.log("CACHE HIT:", code);
            return res.redirect(cachedUrl);
        }

        console.log("CACHE MISS:", code);

        // Check database
        const record = await dataBaseService.searchShortUrl(code);

        if (!record) {
            throw new AppError("URL not found", 404);
        }

        // Store URL in Redis with TTL
        await redisService.saveNewURL(record);

        // Redirect to real URL
        return res.redirect(record.mainUrl);

    } catch (err) {
        next(err);
    }
};



export const createShortUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let nurl: any = req.query.url ?? "";
        const url = normalizeUrl(nurl)
        if (!url) {
            throw new AppError("URL is required", 400);
        }
        const existingRecord = await dataBaseService.searchMainUrl(url);

        if (existingRecord) {
            await redisService.saveNewURL(existingRecord);
            return res.status(200).json({
                url: process.env.DASE_URL + existingRecord.shortUrl,
                message: "Short URL already exists",
            });
        }

        const encodedUrl = generateHmac(url);
        const newRecord = await dataBaseService.saveNewURL({
            mainUrl: url,
            shortUrl: encodedUrl,
        });

        await redisService.saveNewURL(newRecord);
        return res.status(201).json({ url: process.env.DASE_URL + newRecord.shortUrl });

    } catch (err) {
        next(err);
    }
};
