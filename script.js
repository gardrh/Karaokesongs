const generateBtn = document.getElementById("generate-btn");
const resultDiv = document.querySelector(".result");
const typeSelect = document.getElementById("type-select");

generateBtn.addEventListener("click", () => {
  fetch("data.csv")
    .then(response => response.text())
    .then(text => {
      const data = text.trim().split("\n").map(row => row.split(","));
      const headers = data.shift();
      const selectedType = typeSelect.value;
      const filteredData = data.filter(row => row[2] === selectedType);
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      const randomRow = filteredData[randomIndex];
      const resultHTML = headers.map((header, index) => `<p><strong>${header}:</strong> ${randomRow[index]}</p>`).join("");
      resultDiv.innerHTML = resultHTML;
    })
    .catch(error => console.error(error));
});

var request = new XMLHttpRequest();
request.open("GET", "data.csv", true);
request.onload = function() {
  // Parse the CSV data
  var csvData = request.responseText;
  var csvRows = csvData.split("\n");
  var rowCount = csvRows.length;

  // Update the HTML element with the row count
  var resultElement = document.getElementById("result");
  resultElement.innerHTML = "The CSV file has " + rowCount + " rows.";
};
request.send();
