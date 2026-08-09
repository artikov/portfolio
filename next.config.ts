import type { NextConfig } from "next";

// 'unsafe-inline' is required for styles because of the inline cursor gradient
// in CursorGlow, and for scripts because of Next's inline bootstrap.
const contentSecurityPolicy = [
	"default-src 'self'",
	"img-src 'self' data:",
	"style-src 'self' 'unsafe-inline'",
	"font-src 'self'",
	"script-src 'self' 'unsafe-inline'",
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
