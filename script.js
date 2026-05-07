const data = [];

function parseCSVRow(row) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function selectSong() {
  const activeBtn = document.querySelector('.genre-btn.active');
  const selectedType = activeBtn ? activeBtn.getAttribute('data-type') : '';

  let pool = data;
  if (selectedType) {
    pool = data.filter(s => s.Type === selectedType);
  }

  if (!pool.length) return;

  const song = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById('song-result').innerHTML =
    `You should sing: <b>${song.Artist}</b> by <i><b>${song.Title}</b></i>`;
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('data.csv')
    .then(r => r.text())
    .then(csv => {
      const rows = csv.trim().split('\n');
      // header: Artist,Title,Type
      for (let i = 1; i < rows.length; i++) {
        const cols = parseCSVRow(rows[i]);
        if (cols.length >= 3) {
          data.push({ Artist: cols[0], Title: cols[1], Type: cols[2] });
        }
      }
      selectSong();
    });

  const genreBtns = document.querySelectorAll('.genre-btn');
  const singBtn   = document.getElementById('sing-btn');

  genreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      genreBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (singBtn) {
        const top = singBtn.getBoundingClientRect().top + window.pageYOffset - 35;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      selectSong();
    });
  });

  const singBtnEl = document.getElementById('sing-btn');
  if (singBtnEl) singBtnEl.addEventListener('click', selectSong);
});
