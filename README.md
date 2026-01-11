# 🎥 Streaming Video Platform

A full‑stack **Streaming Video Platform** that allows editors to upload videos and users to search & watch public videos. The project supports **MongoDB full‑text search**, role‑based access, and modern React UI.

---

## 🚀 Features

### 👤 User Roles

* **Editor**

  * Upload videos
  * Update & delete own videos
  
* **Viewer**

  * View public videos
  * Search videos

  * **Admin**

  * View all users , editors and streaming videos data
  * Search videos

---

### 🎬 Video Features

* Upload streaming videos
* Thumbnail support
* Public / Private visibility
* Categories & tags
* Full‑text search (title, description, tags)
* Relevance‑based search ranking

---

## 🛠️ Tech Stack

### Frontend

* React
* Axios
* Tailwind CSS
* Context API
* Lucide Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## 📂 Project Structure

```
backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 └── server.js

frontend/
 ├── components/
 ├── context/
 ├── pages/
 └── App.jsx
```

---

## 📦 Database Schema (StreamVideo)

```js
{
  owner: ObjectId (User),
  title: String,
  description: String,
  videoUrl: String,
  thumbnail: String,
  tags: [String],
  category: String,
  visibility: "public" | "private",
  createdAt: Date
}
```

---

## 🔍 Search Implementation (IMPORTANT)

### MongoDB Text Index

```js
streamVideoSchema.index({
  title: "text",
  description: "text",
  tags: "text",
});
```

### Search Logic

* **Empty search** → return all public videos
* **Valid keyword** → return matched videos
* **No match** → return message

```js
$text: { $search: q }
```

Search results are ranked using **textScore** (relevance score decided by MongoDB).

---

## 🔗 API Endpoints

### 🎥 Videos

| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| POST   | `/api/streaming/upload`     | Upload video (Editor only) |
| GET    | `/api/streaming/public`     | Get all public videos      |
| GET    | `/api/streaming/my-videos`  | Get editor's videos        |
| PUT    | `/api/streaming/update/:id` | Update video               |
| DELETE | `/api/streaming/delete/:id` | Delete video               |

---

### 🔍 Search Videos

```http
GET /api/streaming/searchvideo?q=react
```

Responses:

* ✅ Videos found
* ❌ No videos found
* 🔄 Empty search → all videos

---

## 🖥️ Frontend Search Flow

1. User types keyword
2. Submit search form
3. API request sent to backend
4. Results update using Context API
5. Toast message shown if no result

---

## ⚙️ Environment Variables

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000

```
## Code

EDITOR_CODE = "editor_video_stream_platform2026"
ADMIN_CODE = "admin_video_stream_platform2026"
---

## ▶️ Run Project

### Backend

```bash
npm install
npm run dev
```

### Frontend

```bash
npm install
npm run dev
```

---

## ✅ Best Practices Used

* MongoDB text indexing
* Role‑based access control
* Clean error handling
* Relevance‑based search sorting
* Modular architecture

---

## 📌 Future Improvements

* Video likes & comments
* Watch history
* Advanced filters
* Search suggestions
* Video analytics

---

## 👩‍💻 Author

**Deepali**

---

