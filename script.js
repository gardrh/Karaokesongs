const selectSongBtn = document.getElementById('select-song-btn');
const songResult = document.getElementById('song-result');
const genreBtns = document.querySelectorAll('.genre-btn');
const data = [];

// Function to select a random song and display it
function selectSong() {
  const selectedType = document.querySelector('.genre-btn.active').textContent;

  let filteredData = data;

  if (selectedType !== 'All') {
    filteredData = data.filter((song) => song.Type.includes(selectedType));
  }

  const randomIndex = Math.floor(Math.random() * filteredData.length);
  const randomSong = filteredData[randomIndex];

  songResult.innerHTML = `You should sing: <b>${randomSong.Artist}</b> by <i><b>${randomSong.Title}</b></i>`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Load the CSV file and store the data
  fetch('data.csv')
    .then((response) => response.text())
    .then((csv) => {
      const rows = csv.trim().split('\n');

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(',');
        data.push({
          Artist: row[0],
          Title: row[1],
          Type: row[2],
        });
      }

      // Call selectSong() to display a random song on page load
      selectSong();
    });

  // Get the genre buttons and the "SING!" button
  const genreBtns = document.querySelectorAll('.genre-btn');
  const singBtn = document.getElementById('sing-btn');

  // Add click event listeners to genre buttons
  genreBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      genreBtns.forEach((btn) => btn.classList.remove('active'));

      // Add active class to the clicked button
      btn.classList.add('active');

      // Scroll to the "SING!" button
      const singBtnPosition = singBtn.getBoundingClientRect().top;
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const targetScrollPosition = currentScrollPosition + singBtnPosition - 20; // Subtract 20px for margin
      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth',
      });

      selectSong();
    });
  });

  // Click the "SING!" button to select a random song
  selectSongBtn.addEventListener('click', selectSong);
});
