# 🗣️ Talk App – Real‑Time Chat Backend

**Stack:** Node.js, Express.js, MongoDB (Mongoose), Socket.IO, JWT Auth, bcrypt, Cloudinary (optional), Multer, Zod/Joi (validation), CORS, Helmet, Rate‑limit, Winston/Morgan (logging), Redis (optional for rate‑limit/socket adapter), Docker support.

> এই README ফাইলটি আপনার **Talk** real‑time chat app‑এর backend সেটআপ, রান, ডিপ্লয় এবং API/Socket ইভেন্ট ব্যবহারের সম্পূর্ণ গাইড।

---

## ✨ ফিচারস (Highlights)

- Realtime one‑to‑one & group chat (Socket.IO)
- JWT‑based authentication (access + refresh)
- Users: signup/login, profile, avatar upload
- Chats: personal & group, add/remove members, admin controls
- Messages: text, emoji, attachments (image/file)
- Message status: delivered/seen, typing indicator
- Online presence (user online/offline), last seen
- Pagination, search, soft‑delete/edit (optional)
- Secure CORS, Helmet, rate‑limit, input validation
- Production‑ready config, Docker & environments

---

## 📁 প্রোজেক্ট স্ট্রাকচার

```bash
talk-app-backend/
├─ src/
│  ├─ config/
│  │  ├─ env.ts            # env loader (dotenv)
│  │  └─ db.ts             # Mongo connection
│  ├─ server.ts            # http + socket bootstrap
│  ├─ app.ts               # express app & middlewares
│  ├─ routes/
│  │  ├─ auth.routes.ts
│  │  ├─ user.routes.ts
│  │  ├─ chat.routes.ts
│  │  └─ message.routes.ts
│  ├─ controllers/
│  ├─ services/
│  ├─ models/
│  │  ├─ User.ts
│  │  ├─ Chat.ts           # one-to-one / group
│  │  └─ Message.ts
│  ├─ sockets/
│  │  └─ index.ts          # socket handlers
│  ├─ middlewares/
│  ├─ utils/
│  ├─ validators/
│  └─ types/
├─ tests/
├─ public/                 # static (if any)
├─ .env.example
├─ docker-compose.yml
├─ Dockerfile
├─ package.json
└─ README.md
```

---

## 🧩 Data Models (Mongoose)

**User**

```ts
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  avatarUrl: String,
  bio: String,
  lastSeen: Date,
  isOnline: Boolean,
  createdAt, updatedAt
}
```

**Chat** (one‑to‑one অথবা group)

```ts
{
  _id: ObjectId,
  isGroup: Boolean,
  name: String,           # group name (if group)
  members: [ObjectId(User)],
  admins: [ObjectId(User)],
  lastMessage: ObjectId(Message),
  createdBy: ObjectId(User),
  createdAt, updatedAt
}
```

**Message**

```ts
{
  _id: ObjectId,
  chat: ObjectId(Chat),
  sender: ObjectId(User),
  type: 'text' | 'image' | 'file',
  content: String,        # text বা caption
  fileUrl: String,        # attachment url
  seenBy: [ObjectId(User)],
  deletedFor: [ObjectId(User)],
  createdAt, updatedAt
}
```

---

## 🔐 Environment Variables

`.env.example`

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Mongo
MONGO_URI=mongodb+srv://<user>:<pass>@cluster/dbname?retryWrites=true&w=majority

# JWT
JWT_ACCESS_SECRET=superaccesssecret
JWT_REFRESH_SECRET=superrefreshsecret
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

# File uploads (optional)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Redis (optional)
REDIS_URL=redis://localhost:6379
```

---

## 🛠️ Installation & Run

```bash
# 1) Clone
git clone https://github.com/yourname/talk-app-backend.git
cd talk-app-backend

# 2) Install deps
npm i
# or
yarn

# 3) Env
cp .env.example .env
# .env এ আপনার মান বসান

# 4) Dev run (ts-node-dev / nodemon)
npm run dev

# 5) Production build
npm run build && npm run start
```

**package.json – recommended scripts**

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc -p .",
    "start": "node dist/server.js",
    "lint": "eslint .",
    "test": "jest --runInBand",
    "format": "prettier --write ."
  }
}
```

---

## 🧰 Middlewares (Suggested)

- **Security:** `helmet`, `cors({ origin: CLIENT_URL, credentials: true })`
- **Rate limit:** `express-rate-limit` (optionally Redis store)
- **Logger:** `morgan`/`winston`
- **Parser:** `express.json`, `multer`
- **Auth:** custom `verifyAccessToken`
- **Validation:** `zod`/`joi` validators per route

---

##
