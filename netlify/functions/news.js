exports.handler = async (event) => {
  const { country = "in", category = "top", language = "en" } =
    event.queryStringParameters || {};

  const API_KEY = process.env.NEWSDATA_API_KEY;

  const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=${country}&language=${language}&category=${category}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
};
