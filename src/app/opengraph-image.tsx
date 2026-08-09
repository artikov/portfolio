import { ImageResponse } from "next/og";

export const alt = "Oybek Artikov - Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "80px",
					backgroundColor: "#222831",
					backgroundImage:
						"radial-gradient(900px circle at 20% 0%, rgba(0, 173, 181, 0.25), transparent 70%)",
				}}
			>
				<div
					style={{
						display: "flex",
						fontSize: 96,
						fontWeight: 700,
						color: "#ffffff",
						letterSpacing: "-0.03em",
					}}
				>
					Oybek Artikov
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 16,
						fontSize: 44,
						fontWeight: 600,
						color: "#00adb5",
					}}
				>
					Frontend Developer
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 32,
						maxWidth: 820,
						fontSize: 30,
						lineHeight: 1.4,
						color: "#eeeeee",
					}}
				>
					I build pixel-perfect, responsive, and accessible web experiences.
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 56,
						alignItems: "center",
					}}
				>
					<div
						style={{
							display: "flex",
							width: 56,
							height: 4,
							backgroundColor: "#00adb5",
						}}
					/>
					<div
						style={{
							display: "flex",
							marginLeft: 20,
							fontSize: 28,
							color: "#eeeeee",
						}}
					>
						artikov.tech
					</div>
				</div>
			</div>
		),
		{ ...size }
	);
}
