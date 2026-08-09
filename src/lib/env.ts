/**
 * Single point of access for environment variables. See `.env.example`.
 *
 * Validation is deliberately *not* done at module load. The public site imports
 * the content store, which imports this file, during `next build` -- so a
 * module-load check for admin credentials would make the public site
 * unbuildable for anyone who has none, CI included. Each consumer asks for the
 * variable it actually needs, at the point it needs it.
 */

/** Throws naming the variable, rather than letting `undefined` travel onwards. */
export function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(
			`Missing required environment variable ${name}. See .env.example.`
		);
	}
	return value;
}

export function optionalEnv(name: string): string | null {
	return process.env[name] || null;
}
