import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// eslint-config-next 16 ships native flat configs, so the @eslint/eslintrc
// FlatCompat shim the previous config used is no longer needed.
const eslintConfig = [
	{ ignores: [".next/**", "node_modules/**"] },
	...nextCoreWebVitals,
	...nextTypescript,
];

export default eslintConfig;
