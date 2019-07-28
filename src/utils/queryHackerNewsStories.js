const {BigQuery} = require('@google-cloud/bigquery');

async function queryHackerNewsStories(title, text, date) {
    // Queries HackerNewsStories dataset from BigQuery
  
    // Create a client
    const bigqueryClient = new BigQuery();

    // Assigning sqlQuery with and without date input (lowered all cases since LIKE is case sensitive)
    const sqlQuery = date.length < 1 ? 
      `SELECT title, url, text, time_ts
      FROM \`bigquery-public-data.hacker_news.stories\`
      WHERE LOWER(title) LIKE LOWER('%${title}%')
        AND LOWER(text) LIKE LOWER('%${text}%')
      LIMIT 50` :

      `SELECT
      title, url, text, time_ts
      FROM \`bigquery-public-data.hacker_news.stories\`
      WHERE LOWER(title) LIKE LOWER('%${title}%')
        AND LOWER(text) LIKE LOWER('%${text}%')
        AND time_ts between '${date}' and '${date} 23:59:59'
      LIMIT 50`


    // Print for debugging
    // console.log(sqlQuery);
  
    // Setting up the options, including location of the dataset
    const options = {
      query: sqlQuery,
      location: 'US',
    };
  
    // Run the query
    const [rows] = await bigqueryClient.query(options);
    
    // Preparing the search results into desired format
    const searchResults = {
      articles: []
    }

    rows.forEach(row => {
      searchResults['articles'].push({
        "title": row['title'],
        "URL": row['url'],
        "text": row['text'],
        "date": row['time_ts'].value.slice(0,10)
      });
    });

    return searchResults;
  }

  module.exports = queryHackerNewsStories;