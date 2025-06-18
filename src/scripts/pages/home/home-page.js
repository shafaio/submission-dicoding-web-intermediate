class HomePage {
  async render() {
    return `
      <div>
        <section id="home-page" class="landing-page px-6 py-10 text-gray-800 max-w-3xl mx-auto">
          <div>
            <h1 class="text-3xl font-bold mb-4">Selamat Datang di Dicoding berbagi Cerita</h1>
            <p class="text-lg mb-6">
              Dicoding berbagi Cerita adalah platform berbagi cerita berbasis komunitas. Unggah momen spesialmu melalui
              <strong>foto, status deskriptif, dan lokasi</strong>. Temukan inspirasi dari pengguna lain dan bagikan kisahmu hari ini.
            </p>
          </div>

          <section aria-labelledby="features-heading" class="mb-8">
            <h2 id="features-heading" class="text-2xl font-semibold mb-4">Fitur Utama</h2>
            <ul class="list-disc list-inside space-y-2">
              <li>📸 Unggah cerita berbentuk <strong>foto</strong> dengan status singkat yang penuh makna.</li>
              <li>🗺️ Sertakan <strong>lokasi cerita</strong> menggunakan peta interaktif.</li>
              <li>🔍 Jelajahi cerita orang lain berdasarkan lokasi dan waktu.</li>
              <li>🔐 Akses aman dan personal melalui autentikasi token.</li>
            </ul>
          </section>

          <section aria-labelledby="testimonials-heading" class="mb-12">
            <h2 id="testimonials-heading" class="text-2xl font-semibold mb-4">Apa Kata Mereka?</h2>
            <ul class="list-none space-y-4">
              <li>
                <blockquote class="pl-6 border-l-4 border-gray-500">
                  <p class="text-lg">Dicoding berbagi Cerita sangat membantu saya dalam berbagi cerita perjalanan saya. Saya dapat membagikan momen spesial saya dengan teman-teman saya.</p>
                  <cite class="text-sm text-gray-500">— Budi, Pengguna Dicoding berbagi Cerita</cite>
                </blockquote>
              </li>
              <li>
                <blockquote class="pl-6 border-l-4 border-gray-500">
                  <p class="text-lg">Saya suka bagaimana Dicoding berbagi Cerita dapat memudahkan saya dalam mencari cerita berdasarkan lokasi. Saya dapat menemukan inspirasi dari cerita orang lain.</p>
                  <cite class="text-sm text-gray-500">— Rina, Pengguna Dicoding berbagi Cerita</cite>
                </blockquote>
              </li>
            </ul>
          </section>

          <figure class="mt-6">
            <img
              src="https://picsum.photos/1600/900?random=1"
              alt="Ilustrasi orang menulis cerita di laptop"
              class="w-full rounded-md shadow"
              loading="lazy"
            />
            <figcaption class="text-sm text-center mt-2 text-gray-500">
              Ilustrasi pengguna berbagi cerita digital
            </figcaption>
          </figure>
        </section>
      </div>
    `;
  }
}

export default HomePage;
