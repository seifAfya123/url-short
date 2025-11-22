import express from "express"
import { createShortUrl, getShortURL } from "../controllers/url.controller"

const router = express.Router()

router.post("/shorten", createShortUrl)
router.get("/:code", getShortURL)

export default router