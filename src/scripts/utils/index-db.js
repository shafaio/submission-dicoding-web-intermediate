import { openDB } from "idb";

const DB_NAME = "storyAppDB";
const STORE_NAME = "stories";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: "id" });
  },
});

const IndexDB = {
  async saveStories(list) {
    const db = await dbPromise;
    const tx = db.transaction("stories", "readwrite");
    const store = tx.objectStore("stories");
    for (const story of list) {
      await store.put(story);
    }
    await tx.done;
  },

  async saveStory(story) {
    if (!story || !story.id) throw new Error("Invalid story object");

    const db = await dbPromise;
    await db.put("stories", story);
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
