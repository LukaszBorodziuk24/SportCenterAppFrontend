// Simple auto-timezone date formatting

export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  // Auto-detects user's timezone and locale
  return date.toLocaleString();
};