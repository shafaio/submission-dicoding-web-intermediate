import IndexDB from "../../utils/index-db";

export default class StoryDetailView {
  constructor(id) {
    this.container = document.getElementById(id);
  }

  render(story) {
    return `
      <section class="story-detail container max-w-3xl mx-auto px-4 py-8 bg-white rounded-lg shadow">
        <img
          src="${story.photoUrl}"
          alt="Foto cerita ${story.name}"
          class="w-full h-64 object-cover rounded-md mb-6 shadow-sm"
        />

        <h3 class="text-3xl font-bold mb-2 text-gray-800">${story.name}</h3>

        <p class="text-gray-700 mb-4">${story.description}</p>

        <p class="text-sm text-gray-500 mb-2">
          🕓 ${new Date(story.createdAt).toLocaleString()}
        </p>

        <div id="map-detail" class="w-full h-60 rounded-md overflow-hidden mb-6"></div>

        <button id="save-story-btn" class="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded shadow disable:opacity-50">
          💾 Simpan Story
        </button>

        <a href="#/stories" class="inline-block text-blue-600 hover:underline text-sm">
          &#x21A8; Back to list
        </a>
      </section>
    `;
  }

  async showDetailStory(story) {
    this.container.innerHTML = this.render(story);
    this.renderMap(story);

    const saveBtn = document.getElementById("save-story-btn");
    if (saveBtn) {
      try {
        const existing = await IndexDB.getStoryById(story.id);
        if (existing) {
          saveBtn.textContent = "✅ Sudah Disimpan";
          saveBtn.disabled = true;
        }
      } catch (err) {
        console.error("Gagal cek story di IndexedDB", err);
      }

      saveBtn.addEventListener("click", async () => {
        try {
          await IndexDB.saveStory(story);
          saveBtn.textContent = "✅ Sudah Disimpan";
          saveBtn.disabled = true;
          alert("Story berhasil disimpan untuk offline.");
        } catch (err) {
          alert("Gagal menyimpan story: " + err.message);
        }
      });
    }
  }
  showLoginAlert() {
    alert("Login dulu ya!");
  }

  redirectToLogin() {
    window.location.hash = "/login";
  }

  showErrorMessage(message) {
    this.container.innerHTML = `<p style="color:red;">Gagal memuat story: ${message}</p>`;
  }

  renderMap(story) {
    const map = L.map("map-detail").setView([story.lat, story.lon], 13);

    const openStreetMap = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      }
    );

    const mapTilerStreets = L.tileLayer(
      "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=W2qna2fjBhuZtKjG07ha",
      {
        attribution:
          '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>',
        tileSize: 512,
        zoomOffset: -1,
      }
    );

    const mapTilerSatellite = L.tileLayer(
      "https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=W2qna2fjBhuZtKjG07ha",
      {
        attribution:
          '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>',
        tileSize: 512,
        zoomOffset: -1,
      }
    );

    openStreetMap.addTo(map);

    L.control
      .layers(
        {
          OpenStreetMap: openStreetMap,
          "MapTiler Streets": mapTilerStreets,
          "MapTiler Satellite": mapTilerSatellite,
        },
        {}
      )
      .addTo(map);

    L.marker([story.lat, story.lon])
      .addTo(map)
      .bindPopup(`<strong>${story.name}</strong><br>${story.description}`);

    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }
}
