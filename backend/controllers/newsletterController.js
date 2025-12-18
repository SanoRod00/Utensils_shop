const subscribers = new Set();

export const subscribe = (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  subscribers.add(email.toLowerCase());
  res.json({ message: "Thanks for subscribing!" });
};

export const listSubscribers = (req, res) => {
  res.json({ count: subscribers.size, emails: Array.from(subscribers) });
};
