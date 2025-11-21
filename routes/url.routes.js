router.post("/shorten", createShortUrl)
router.get("/:code", redirectToUrl)
