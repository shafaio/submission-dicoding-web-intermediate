import CONFIG from "../../config";

export default class StoriesView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.onClearOffline = null;
  }

  render(stories) {
    return `
      <section class="story-list">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-semibold">All Stories</h1>
          <button
            id="clearOfflineBtn"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Hapus Offline Data
          </button>
        </div>
        <div>
          <ul class="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            ${stories
              .map(
                (story) => `
                  <li class="border rounded-lg overflow-hidden shadow-md bg-white">
                    <img
                      src="${story.photoUrl}"
                      alt="Photo by ${story.name}"
                      class="w-full h-48 object-cover"
                    />
                    <div class="p-4 flex flex-col gap-2">
                      <h2 class="text-xl font-semibold">
                        <a
                          href="#/stories/${story.id}"
                          class="text-blue-600 hover:underline"
                        >
                          ${story.name}
                        </a>
                      </h2>
                      <p class="text-gray-700">${story.description}</p>
                      <time class="text-sm text-gray-500">
                        ${new Date(story.createdAt).toLocaleString("id-ID", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </time>
                      <div class="mt-2">
                        <div
                          id="map-${story.id}"
                          class="w-full h-64 rounded-md"
                        ></div>
                      </div>
                    </div>
                  </li>
                `
              )
              .join("")}
          </ul>
        </div>
      </section>
    `;
  }

  showStories(stories) {
    this.container.innerHTML = this.render(stories);
    stories.forEach((story) => this.renderStoryMap(story));

    const clearBtn = document.getElementById("clearOfflineBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        this.onClearOffline?.(); // dipanggil dari presenter
      });
    }
  }

  showErrorMessage(message) {
    this.container.innerHTML = `<p style="color:red;">Gagal memuat stories: ${message}</p>`;
  }

  showSuccessMessage(message) {
    const msg = document.createElement("p");
    msg.className = "text-green-600 font-semibold my-2";
    msg.textContent = message;
    this.container.prepend(msg);
  }

  showOfflineNotice() {
    const notice = document.createElement("p");
    notice.className = "text-yellow-600 font-semibold my-2";
    notice.textContent = "Menampilkan data offline dari IndexedDB.";
    this.container.prepend(notice);
  }

  showLoginAlert() {
    alert("Login dulu ya!");
  }

  redirectToLogin() {
    window.location.hash = "/login";
  }

  renderStoryMap(story) {
    const mapId = `map-${story.id}`;
    const mapContainer = document.getElementById(mapId);

    if (!mapContainer || story.lat === null) return;

    const map = L.map(mapId).setView([story.lat, story.lon], 13);

    const openStreetMap = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      }
    );

    const mapTilerStreets = L.tileLayer(
      `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${CONFIG.MAPTILER_KEY}`,
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
