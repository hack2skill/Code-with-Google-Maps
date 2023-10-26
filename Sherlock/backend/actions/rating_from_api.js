const fs = require('fs');
const csv = require('csv-parser');
const language = require('@google-cloud/language');

// Create an empty object to store area names and sentiment scores.
const areaSafetyRatings = {};

async function safety_score(text) {
  const client = new language.LanguageServiceClient({
    keyFile: "sentiment-analysis-402517-f2e5d7c9cdd8.json"
  });

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  const [result] = await client.analyzeSentiment({ document: document });
  const sentiment = result.documentSentiment;

  return sentiment.score;
}

// Read the CSV file and process the data.
fs.createReadStream('/workspaces/SafeRoute-Navigator/backend/actions/area_data - Sheet1.csv')
  .pipe(csv())
  .on('data', async (row) => {
    const areaName = row['Areas'];
    const review = row['Reviews '];

    console.log(areaName, ":", review)
    // Calculate sentiment score for the review.
    const sentimentScore = await safety_score(review);
    // console.log(sentimentScore)
    //scaling the scores
    const scaledScore = (sentimentScore + 1) * 4.5 + 1;
    // Store the area name and sentiment score in the object
    areaSafetyRatings[areaName] = scaledScore;
    console.log(areaSafetyRatings);
  })
  .on('close', () => {
    // At this point, areaSentiments contains area names and their sentiment scores.
    console.log("fial", areaSafetyRatings);
    // You can return this object, or perform further actions as needed.
  });

  export default areaSafetyRatings;
