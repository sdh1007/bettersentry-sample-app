/**
 * User API handlers.
 *
 * FIX: Added null check for users.find() result.
 */

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "viewer";
}

const users: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "user" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "viewer" },
];

export async function listUsers(): Promise<User[]> {
  return users;
}

export async function getUser(id: string): Promise<{ user: string; email: string }> {
  const user = users.find((u) => u.id === id);

  if (!user) {
    throw new Error(`User not found: ${id}`);
  }

  const displayName = user.name.toUpperCase();

  return {
    user: displayName,
    email: user.email,
  };
}
