/**
 * User API handlers.
 *
 * BUG 1 (getUser): Accesses `user.name` without null-checking the result
 * of `find()`. When a user ID doesn't exist in the database, `find()`
 * returns `undefined`, causing:
 *   TypeError: Cannot read properties of undefined (reading 'name')
 *
 * FIX: Add a null check — if user is undefined, return a 404-style
 * response or throw a descriptive error.
 */

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "viewer";
}

// Simulated database
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

  // FIX: Added null check — prevents crash when user not found
  if (!user) {
    throw new Error("User not found");
  }

  const displayName = user.name.toUpperCase();

  return {
    user: displayName,
    email: user.email,
  };
}
