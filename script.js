const selectSongBtn = document.getElementById('select-song-btn');
const songResult = document.getElementById('song-result');
const data = [];

// Flash animation on result update
function flashResult() {
  if (!songResult) return;
  songResult.classList.remove('flash');
  void songResult.offsetWidth; // reflow to restart animation
  songResult.classList.add('flash');
}

// Function to select a random song and display it
function selectSong() {
  const activeBtn = document.querySelector('.genre-btn.active');
  if (!activeBtn || data.length === 0) return;

  const selectedType = activeBtn.textContent.trim();
  let filteredData = data;

  if (selectedType !== 'All') {
    filteredData = data.filter((song) => song.Type.includes(selectedType));
  }

  if (filteredData.length === 0) {
    songResult.innerHTML = `<span style="color:var(--text-muted)">No songs found for this type.</span>`;
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredData.length);
  const randomSong = filteredData[randomIndex];

  songResult.innerHTML = `🎤 You should sing: <b>${randomSong.Title}</b> by <i><b>${randomSong.Artist}</b></i>`;
  flashResult();
}

document.addEventListener('DOMContentLoaded', () => {
  // Load the CSV file and store the data
  fetch('data.csv')
    .then((response) => response.text())
    .then((csv) => {
      const rows = csv.trim().split('\n');
      for (let i = 1; i < rows.length; i++) {
        const cols = rows[i].split(',');
        if (cols.length >= 3) {
          data.push({
            Title: cols[0].trim(),
            Artist: cols[1].trim(),
            Type: cols[2].trim(),
          });
        }
      }
      selectSong();
    })
    .catch(() => {
      if (songResult) songResult.innerHTML = `<span style="color:var(--text-muted)">Couldn't load songs. Please try again.</span>`;
    });

  const genreBtns = document.querySelectorAll('.genre-btn');
  const singBtn = document.getElementById('sing-btn');

  genreBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      genreBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Smooth scroll to SING button
      if (singBtn) {
        const singBtnPosition = singBtn.getBoundingClientRect().top;
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const targetScrollPosition = currentScrollPosition + singBtnPosition - 35;
        window.scrollTo({ top: targetScrollPosition, behavior: 'smooth' });
      }

      selectSong();
    });
  });

  if (selectSongBtn) {
    selectSongBtn.addEventListener('click', selectSong);
  }
});
