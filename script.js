const selectSongBtn = document.getElementById('select-song-btn');
const songResult = document.getElementById('song-result');
const data = [];

function parseCSVRow(row) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      if (inQuotes && row[i+1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(current); current = '';
    } else { current += ch; }
  }
  result.push(current);
  return result;
}

function selectSong() {
  const activeBtn = document.querySelector('.genre-btn.active');
  const selectedType = activeBtn ? activeBtn.getAttribute('data-type') : '';

  let filteredData = data;
  if (selectedType !== '' && selectedType !== null) {
    filteredData = data.filter((song) => song.Type === selectedType);
  }

  if (filteredData.length === 0) return;

  const randomSong = filteredData[Math.floor(Math.random() * filteredData.length)];
  songResult.innerHTML = `You should sing: <b>${randomSong.Artist}</b> by <i><b>${randomSong.Title}</b></i>`;
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('data.csv')
    .then((response) => response.text())
    .then((csv) => {
      const rows = csv.trim().split('\n');
      for (let i = 1; i < rows.length; i++) {
        const cols = parseCSVRow(rows[i]);
        if (cols.length >= 3) {
          data.push({
            Artist: cols[0].trim(),
            Title:  cols[1].trim(),
            Type:   cols[cols.length - 1].trim(),
          });
        }
      }
      selectSong();
    });

  const genreBtns = document.querySelectorAll('.genre-btn');
  const singBtn = document.getElementById('sing-btn');

  genreBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      genreBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (singBtn) {
        const pos = singBtn.getBoundingClientRect().top;
        const scroll = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({ top: scroll + pos - 35, behavior: 'smooth' });
      }
      selectSong();
    });
  });

  if (selectSongBtn) selectSongBtn.addEventListener('click', selectSong);
});
