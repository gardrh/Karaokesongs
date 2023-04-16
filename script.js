const selectSongBtn = document.getElementById('select-song-btn');
const songResult = document.getElementById('song-result');
const genreBtns = document.querySelectorAll('.genre-btn');

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

genreBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    genreBtns.forEach((btn) => btn.classList.remove('active'));

    // Add active class to the clicked button
    btn.classList.add('active');

    selectSong();
  });
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

  songResult.innerHTML = `You should sing: <b>${randomSong.Artist}</b> by <b>${randomSong.Title}</b>`;
}


// Fetch the data from data.csv
fetch('data.csv')
	.then(response => response.text())
	.then(data => {
		// Split the data into rows
		const rows = data.trim().split('\n');

		// Initialize an object to store the count for each type
		const typeCount = {};

		// Loop through each row and count the occurrences of each type
		for (let i = 1; i < rows.length; i++) {
			const cols = rows[i].split(',');
			const type = cols[2].trim();

			if (type in typeCount) {
				typeCount[type]++;
			} else {
				typeCount[type] = 1;
			}
		}

		// Create an array of objects from the type count object
		const typeCountArray = [];
		for (let type in typeCount) {
			typeCountArray.push({type: type, count: typeCount[type]});
		}

		// Sort the array by count in descending order
		typeCountArray.sort((a, b) => b.count - a.count);

		// Loop through the sorted array and add the results to the HTML
		const typeCountList = document.getElementById('type-count');
		for (let i = 0; i < typeCountArray.length; i++) {
			const type = typeCountArray[i].type;
			const count = typeCountArray[i].count;
			const listItem = document.createElement('li');
			listItem.textContent = `${type}: ${count}`;
			typeCountList.appendChild(listItem);
		}
	})
	.catch(error => console.error(error));
