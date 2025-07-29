import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// * @param fullName - The full name string (e.g., "John Doe", "Jane Mary Smith").
// * @returns The initials in uppercase (e.g., "JD", "JS"), or an empty string if the input is invalid.
// */
export function getInitials(fullName: string): string {
	// Guard against null, undefined, or empty/whitespace-only strings
	if (!fullName || fullName.trim() === "") {
		return "";
	}

	// Trim whitespace from the beginning and end of the string
	const trimmedName = fullName.trim();

	// Split the name into parts by spaces. Handles multiple spaces between words.
	// Filters out any empty strings that might result if there were unusual spacing patterns
	// not entirely covered by a simple split(' ').
	const nameParts = trimmedName.split(/\s+/).filter((part) => part.length > 0);

	// If, after splitting and filtering, there are no valid name parts
	if (nameParts.length === 0) {
		return "";
	}

	// Get the first character of the first name part
	const firstInitial = nameParts[0][0];

	// If there's only one name part (e.g., "John" or "Cher")
	if (nameParts.length === 1) {
		return firstInitial.toUpperCase();
	}

	// If there are multiple name parts, get the first character of the last name part
	const lastInitial = nameParts[nameParts.length - 1][0];

	// Concatenate the first and last initials and convert to uppercase
	return (firstInitial + lastInitial).toUpperCase();
}

/**
 * Checks if a given string is a valid email address.
 *
 * This function uses a regular expression to perform a syntactical check
 * according to common email address formats. It does not guarantee that the
 * email address actually exists or can receive mail.
 *
 * @param email - The string to be validated.
 * @returns `true` if the string is a valid email address, otherwise `false`.
 */
export function isValidEmail(email: string): boolean {
	// Guard against non-string, null, or undefined inputs
	if (typeof email !== "string") {
		return false;
	}

	// A regular expression for basic email format validation.
	// It checks for:
	// - At least one character before the @ symbol
	// - An @ symbol
	// - At least one character for the domain name
	// - A dot .
	// - At least two characters for the top-level domain (e.g., .com, .co.za)
	const emailRegex = new RegExp(
		// The overall pattern must match from the start (^) to the end ($) of the string
		// The 'i' at the end makes the entire match case-insensitive
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
	);

	// The .test() method of a RegExp returns a boolean
	return emailRegex.test(email);
}
