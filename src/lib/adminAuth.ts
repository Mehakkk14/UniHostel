// Admin email configuration
export const ADMIN_EMAIL = 'hello.unihostel@gmail.com';

// Check if user is admin
export const isAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false;
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
};
