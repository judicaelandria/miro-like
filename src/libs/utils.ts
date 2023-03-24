export const getInitials = (name: string) => {
  const names = name.split(" ");
  const initials = names.map((name) => name.charAt(0).toUpperCase());
  return initials.join("");
};
