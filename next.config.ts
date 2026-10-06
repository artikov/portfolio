import type { NextConfig } from "next";

// 'unsafe-inline' is required for styles because of the inline cursor gradient
// in CursorGlow, and for scripts because of Next's inline bootstrap.
// 'unsafe-eval' is dev-only: React uses eval() to rebuild server call stacks
// in development and raised a console error under this CSP. It never uses
// eval() in production, so the production header stays without it.
const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
	"default-src 'self'",
	"img-src 'self' data:",
	"style-src 'self' 'unsafe-inline'",
	"font-src 'self'",
	`script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
	"frame-ancestors 'none'",
	"base-uri 'self'",
	"form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
	poweredByHeader: false,
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "DENY" },
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
					{ key: "Content-Security-Policy", value: contentSecurityPolicy },
				],
			},
		];
	},
};

export default nextConfig;
