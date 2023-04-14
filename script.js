const selectSongBtn = document.getElementById('select-song-btn');
const songResult = document.getElementById('song-result');
const genreFilter = document.getElementById('genre-filter');

selectSongBtn.addEventListener('click', selectSong);

function selectSong() {
	let filteredData = data;

	if (genreFilter.value) {
		filteredData = data.filter((song) => song.Genre === genreFilter.value);
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
			const row = rows[i].

