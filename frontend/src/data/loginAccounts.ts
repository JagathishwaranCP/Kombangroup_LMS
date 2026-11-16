/**
 * CloudConnekt review logins (frontend-only).
 * These credentials work without a production database so stakeholders
 * can open the admin / user portals for review.
 */
export const cloudConnektAccounts = {
  admin: {
    email: "admin@cloudconnekt.com",
    password: "Admin@123",
    label: "CloudConnekt Admin",
    role: "instructor" as const,
    portal: "/admin-login",
  },
  user: {
    email: "user@cloudconnekt.com",
    password: "User@123",
    label: "CloudConnekt User",
    role: "student" as const,
    portal: "/login",
  },
} as const;

export const DEMO_TOKEN_PREFIX = "cloudconnekt-demo:";

export type DemoRole = "instructor" | "student";

/** Match the review credentials and return a local session (no API / DB needed). */
export function tryDemoLogin(
  email: string,
  password: string,
  expectedRole: DemoRole,
): { access_token: string; role: DemoRole } | null {
  const normalized = email.trim().toLowerCase();
  const account =
    expectedRole === "instructor" ? cloudConnektAccounts.admin : cloudConnektAccounts.user;

  if (normalized !== account.email.toLowerCase()) return null;
  if (password !== account.password) return null;

  return {
    access_token: `${DEMO_TOKEN_PREFIX}${account.role}`,
    role: account.role,
  };
}
