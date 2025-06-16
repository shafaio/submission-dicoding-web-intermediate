import CONFIG from "../../config";
import IndexDB from "../../utils/index-db.js";

const token = localStorage.getItem("token");
const StoryModel = {
  async getAllStories() {
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/stories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { listStory } = await res.json();

      await IndexDB.saveStories(listStory);

      return listStory;
    } catch (error) {
      console.warn("Gagal ambil data dari API, fallback ke IndexedDB", error);
      const offlineStories = await IndexDB.getAllStories();
      return offlineStories;
    }
  },

  async getStoryById(id) {
    try {
      const res = await fetch(`${CONFIG.BASE_URL}/stories/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { story } = await res.json();
      return story;
    } catch (error) {
      const offlineStory = await IndexDB.getStoryById(id);
      if (offlineStory) return offlineStory;

      throw new Error("Gagal mengambil story (offline & tidak ada cache)");
    }
  },

  async addNewStory({ name, description, photo, lat, lon }) {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    formData.append("lat", lat);
    formData.append("lon", lon);

    const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    alert("berhasil menambahkan story");

    const result = await response.json();
    if (!response.ok)
      throw new Error(result.message || "Gagal menambahkan story");

    return result;
  },

  async clearOfflineStories() {
    await IndexDB.clearStories();
  },

  async getOfflineStories() {
    return await IndexDB.getAllStories();
  },
};

export default StoryModel;
