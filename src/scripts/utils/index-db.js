import { openDB } from "idb";

const DB_NAME = "storyAppDB";
const STORE_NAME = "stories";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: "id" });
  },
});

const IndexDB = {
  async saveStories(stories) {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, "readwrite");
    for (const story of stories) {
      tx.store.put(story);
    }
    await tx.done;
  },

  async getAllStories() {
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
  },

  async getStoryById(id) {
    const db = await dbPromise;
    return db.get(STORE_NAME, id);
  },

  async clearStories() {
    const db = await dbPromise;
    await db.clear(STORE_NAME);
    alert("Offline stories berhasil dihapus.");
  },
};

export default IndexDB;
