/**
 * Extracts initials from a full name string.
 *
 * @param name - The full name to extract initials from
 * @returns The initials as a concatenated string
 *
 * @example getInitials("John Doe") // "JD"
 */
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};
