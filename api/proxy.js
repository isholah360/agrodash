export default async function handler(req, res) {
  const targetUrl = `https://oyo-agri-backend-production.up.railway.app${req.url}`;
  
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined, // prevent host header forwarding
      },
      body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    });

    const data = await response.arrayBuffer();
    res.status(response.status);
    response.headers.forEach((value, key) => res.setHeader(key, value));
    res.send(Buffer.from(data));
  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
}
