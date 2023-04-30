export default async function handler(req, res) {
  let today = new Date();
  if (req.method === "GET") return res.status(200).json(today);
}
