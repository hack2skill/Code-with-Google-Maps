// Define your CSV data as an array of objects (simulating a CSV file)
var csvData = [
    { name: "John", attribute1: "Value1", attribute2: "Value2" },
    { name: "Jane", attribute1: "Value3", attribute2: "Value4" },
    // Add more rows as needed
];

function searchCSV() {
    var search = document.getElementById("search").value.toLowerCase();
    var results = [];

    for (var i = 0; i < csvData.length; i++) {
        if (csvData[i].name.toLowerCase().includes(search)) {
            results.push(csvData[i]);
        }
    }

    displayResults(results);

    // Update the percentage display
    updatePercentage(results.length, csvData.length);
}

function displayResults(results) {
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (results.length === 0) {
        resultsDiv.innerHTML = "No results found.";
    } else {
        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var resultString = "Name: " + result.name + "<br>";
            resultString += "Attribute1: " + result.attribute1 + "<br>";
            resultString += "Attribute2: " + result.attribute2 + "<br><hr>";
            resultsDiv.innerHTML += resultString;
        }
    }
}

function updatePercentage(matchCount, totalCount) {
    var percentageElement = document.getElementById("percentage");
    var percentage = ((matchCount / totalCount) * 100).toFixed(2) + "%";
    percentageElement.textContent = "Results: " + percentage;
}