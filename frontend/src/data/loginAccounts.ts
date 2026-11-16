/** CloudConnekt production login accounts used on the login portals. */
export const cloudConnektAccounts = {
  admin: {
    email: "admin@cloudconnekt.com",
    password: "Admin@123",
    label: "CloudConnekt Admin",
    portal: "/admin-login",
  },
  user: {
    email: "user@cloudconnekt.com",
    password: "User@123",
    label: "CloudConnekt User",
    portal: "/login",
  },
} as const;
