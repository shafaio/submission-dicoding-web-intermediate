import CONFIG from "../../config";
import IndexDB from "../../utils/index-db.js";

const token = localStorage.getItem("token");
const StoryModel = {
  async getAllStories() {
    const online = navigator.onLine;
    if (online) {
      const res = await fetch(`${CONFIG.BASE_URL}/stories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { listStory } = await res.json();

      return listStory;
    } else {
      return this.getOfflineStories();
    }
  },

  async getStoryById(id) {
    const res = await fetch(`${CONFIG.BASE_URL}/stories/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { story } = await res.json();
    return story;
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
