# 🔗 URL Shortener

A lightweight URL Shortener built using **Node.js**, **TypeScript**, **Express**, **Prisma**, and **Redis**.

---



<img width="2736" height="3708" alt="image" src="https://github.com/user-attachments/assets/47e3fcfa-bc08-40ad-9b26-64534507ace8" />


---

## 🚀 Features
- Shorten URLs  
- Fast redirects  
- Redis caching  
- Prisma (PostgreSQL)  
- HMAC short code generation  
- Clean TypeScript structure  

---

## 📁 Project Structure

src/
├── config/
├── controllers/
├── services/
├── routes/
├── utils/
└── index.ts
prisma/
.env
README.md


---

## 🗄 Prisma Model
```prisma
model Url {
  id        String   @id @default(uuid())
  mainUrl   String
  shortUrl  String   @unique
  clicks    Int      @default(0)
  createdAt DateTime @default(now())
}
```

## ⚙️ Setup

### 1️⃣ Install dependencies
```bash
npm install
```

### Create .env file
DATABASE_URL=postgres://...
SECRET_KEY=YOUR_SECRET
REDIS_PORT=6379
CACHE_TTL_DAYS=7
PORT=3000

### Run Prisma migration
```
npx prisma migrate dev
```

### Start Redis (Mac)
```
brew services start redis
```

### Run project
```
npm run dev
```
