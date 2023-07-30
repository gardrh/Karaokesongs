  // Function to scroll to the "SING!" button
  function scrollToSingButton() {
    const singButton = document.getElementById('select-song-btn');
    singButton.scrollIntoView({ behavior: 'smooth' });
  }

  // Function to scroll to the "SING!" button and result section
  function scrollToSingButtonAndResult() {
    scrollToSingButton();
    const resultSection = document.getElementById('song-result');
    setTimeout(() => {
      resultSection.scrollIntoView({ behavior: 'smooth' });
    }, 500); // Adjust the delay as needed
  }

  // Attach the scrollToSingButtonAndResult function to each genre button
  const genreBtns = document.querySelectorAll('.genre-btn');
  genreBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      genreBtns.forEach((btn) => btn.classList.remove('active'));

      // Add active class to the clicked button
      btn.classList.add('active');

      // Scroll to the "SING!" button and result section
      scrollToSingButtonAndResult();

      // Call selectSong() to update the result after scrolling
      selectSong();
    });
  });

  // Rest of the existing script
  const selectSongBtn = document.getElementById('select-song-btn');
  const songResult = document.getElementById('song-result');
  let data = [];

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

  selectSongBtn.addEventListener('click', selectSong);

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
