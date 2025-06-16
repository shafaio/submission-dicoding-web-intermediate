import MediaHelper from "../../utils/media-helper.js";

export default class AddStoryView {
  constructor(id) {
    this.container = document.getElementById(id);
  }

  render() {
    return `
      <section class="max-w-2xl mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Tambah Story Baru</h1>
        <form id="add-story-form" class="flex flex-col gap-4">
          <div>
            <label for="description" class="block mb-1 font-medium">Deskripsi</label>
            <textarea id="description" required class="w-full p-2 border rounded"></textarea>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 font-medium">Ambil Gambar</label>
              <video id="camera" autoplay playsinline class="w-full rounded mb-2"></video>
              <canvas id="snapshot" class="hidden"></canvas>
              <button type="button" id="take-photo" class="p-2 bg-blue-500 text-white rounded">Ambil Foto</button>
            </div>
            <div id="photo-preview-container">
              <label class="block mb-1 font-medium">Preview Gambar</label>
            </div>
          </div>
          <div>
            <label class="block mb-1 font-medium">Pilih Lokasi:</label>
            <div id="map" class="w-full h-64 mb-2 rounded border"></div>
            <p id="selected-coordinates" class="text-sm text-gray-700">Latitude: -, Longitude: -</p>
          </div>
          <button type="submit" class="p-2 bg-green-600 text-white rounded">Kirim</button>
        </form>
        <div id="form-error" class="text-red-500 mt-2"></div>
      </section>
    `;
  }

  showForm() {
    this.container.innerHTML = this.render();
  }

  bindSubmitHandler(handler) {
    const form = document.querySelector("#add-story-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        handler(e);
      });
    }
  }

  async initCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.displayCameraStream(stream);
      MediaHelper.addNewStream(stream);
    } catch (err) {
      this.showFormError("Akses Kamera Ditolak");
    }
  }

  bindTakePhotoHandler(callback) {
    const video = document.querySelector("#camera");
    const canvas = document.querySelector("#snapshot");
    const takePhotoBtn = document.querySelector("#take-photo");
    const errorEl = document.querySelector("#form-error");
    const previewContainer = document.querySelector("#photo-preview-container");

    takePhotoBtn?.addEventListener("click", async () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg")
      );

      if (blob.size > 1048576) {
        errorEl.textContent =
          "Ukuran foto melebihi 1MB. Silakan ambil ulang dengan kualitas lebih rendah.";
        callback(null);
        return;
      }

      const preview = document.createElement("img");
      preview.src = URL.createObjectURL(blob);
      preview.className = "rounded w-full";
      preview.id = "photo-preview";

      const existingPreview = document.querySelector("#photo-preview");
      if (existingPreview) existingPreview.remove();
      previewContainer?.appendChild(preview);

      callback(blob);
    });
  }

  bindMapClickHandler(callback) {
    const map = L.map("map").setView([-8.65, 116.32], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(map);

    let marker = null;

    map.on("click", (e) => {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      const coordText = `Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(
        4
      )}`;
      const coordDisplay = document.querySelector("#selected-coordinates");
      if (coordDisplay) coordDisplay.textContent = coordText;

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }

      callback(lat, lon);
    });
  }

  getDescriptionValue() {
    return document.querySelector("#description")?.value || "";
  }

  displayCameraStream(stream) {
    const video = document.querySelector("#camera");
    if (video) video.srcObject = stream;
  }

  showFormError(message) {
    const el = document.querySelector("#form-error");
    if (el) el.textContent = message;
  }

  showLoginAlert() {
    alert("Login dulu ya!");
  }

  redirectToLogin() {
    window.location.hash = "/login";
  }

  redirectToStories() {
    window.location.hash = "/stories";
  }
}
