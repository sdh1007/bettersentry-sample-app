import express from "express";
import { getUser, listUsers } from "./api/users";
import { handleCheckout } from "./services/checkout";
import { parseConfig } from "./lib/config";

const app = express();
app.use(express.json());

// Load config
const config = parseConfig();

app.get("/api/users", async (_req, res) => {
  const users = await listUsers();
  res.json(users);
});

app.get("/api/users/:id", async (req, res) => {
  const user = await getUser(req.params.id);
  res.json(user);
});

app.post("/api/checkout", async (req, res) => {
  const result = await handleCheckout(req.body);
  res.json(result);
});

app.get("/api/config", (_req, res) => {
  res.json(config);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Sample app listening on port ${PORT}`);
});
