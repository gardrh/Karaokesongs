const selectSongBtn = document.getElementById('select-song-btn');
const songResult = document.getElementById('song-result');
const genreBtns = document.querySelectorAll('.genre-btn');

genreBtns.forEach((btn) => {
	btn.addEventListener('click', () => {
		// Remove active class from all buttons
		genreBtns.forEach((btn) => btn.classList.remove('active'));
		
		// Add active class to the clicked button
		btn.classList.add('active');
	});
});

selectSongBtn.addEventListener('click', selectSong);

function selectSong() {
	const selectedGenre = document.querySelector('.genre-btn.active').dataset.genre;
	let filteredData = data;

	if (selectedGenre) {
		filteredData = data.filter((song) => song.Genre === selectedGenre);
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
				Genre: row[2],
			});
		}
	});
 
