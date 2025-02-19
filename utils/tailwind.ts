import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

export const fullConfig = resolveConfig(tailwindConfig);
export const colors = fullConfig.theme.colors;
