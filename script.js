const selectSongBtn = document.getElementById('select-song-btn');
const songResult = document.getElementById('song-result');
const genreBtns = document.querySelectorAll('.genre-btn');

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
	const selectedType = document.querySelector('.genre-btn.active').dataset.type;
	let filteredData = data;

	if (selectedType) {
		filteredData = data.filter((song) => song.Type === selectedType);
	}

	const randomIndex = Math.floor(Math.random() * filteredData.length);
	const randomSong = filteredData[randomIndex];

	songResult.innerHTML = `You should sing: ${randomSong.Song} by ${randomSong.Artist}`;
}

let data = [];

fetch('data.csv')
	.then((response) => response.text())
	.then((csv) => {
		const rows = csv.trim().split('\n');

		for (let i = 1; i < rows.length; i++) {
			const row = rows[i].split(',');
			data.push({
				Song: row[0],
				Artist: row[1],
				Type: row[2],
			});
		}
	});
