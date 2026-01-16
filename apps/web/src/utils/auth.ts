/**
 * Authentication utilities
 * 
 * Provides password hashing and comparison functions
 * Uses Web Crypto API for secure SHA-256 hashing
 */

/**
 * Hash a password using SHA-256
 * @param password - Plain text password to hash
 * @returns Promise<string> - Hexadecimal hash of the password
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}