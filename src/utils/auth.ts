
import { User } from "./types";
import { toast } from "sonner";

// Key for storing current user in localStorage
const AUTH_USER_KEY = "currentUser";

// Login user
export const loginUser = (user: User): boolean => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  toast.success("Logged in successfully");
  return true;
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem(AUTH_USER_KEY);
  toast.success("Logged out successfully");
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(AUTH_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

// Check if user is admin
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user ? user.isAdmin : false;
};

// Protected route check
export const requireAuth = (): boolean => {
  if (!isAuthenticated()) {
    toast.error("Please login to access this page");
    return false;
  }
  return true;
};

// Admin route check
export const requireAdmin = (): boolean => {
  if (!isAuthenticated()) {
    toast.error("Please login to access this page");
    return false;
  }
  
  if (!isAdmin()) {
    toast.error("You don't have permission to access this page");
    return false;
  }
  
  return true;
};
