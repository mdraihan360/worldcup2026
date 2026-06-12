export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { path } = req.query;
  const url = `https://api.football-data.org/v4/${path || ''}`;

  try {
    const response = await fetch(url, {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY || '3ef88e28409b4f3b828f25963ca17486' }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
