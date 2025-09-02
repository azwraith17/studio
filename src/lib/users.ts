
export type UserRole = "client" | "psychologist" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string; // Password can be optional if we have pre-defined users
  role: UserRole;
};

// This acts as a mock database of users.
// In a real application, this would be stored securely in a database.
export const users: User[] = [
  // Pre-defined Admin User
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    role: "admin",
  },
  // Pre-defined Psychologist User
  {
    id: 'psych-1',
    name: 'Dr. Evelyn Reed',
    email: 'e.reed@example.com',
    password: 'password',
    role: 'psychologist',
  },
  {
    id: 'psych-2',
    name: 'Dr. Samuel Green',
    email: 's.green@example.com',
    password: 'password',
    role: 'psychologist',
  },
  // Example Client User (can be added to via signup)
  {
      id: 'client-1',
      name: 'Client User',
      email: 'client@example.com',
      password: 'password',
      role: 'client'
  }
];
