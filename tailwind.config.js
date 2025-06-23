import daisyui from "daisyui";
import themes from "daisyui/src/theming/themes.js";

export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    plugins: [daisyui],

    daisyui: {
        themes: [
            {
                light: {
                    // Wir verwenden das DaisyUI "corporate" Theme als Basis und überschreiben die Farben.
                    ...themes["corporate"],
                    "primary": "#2563eb",   // Ein modernes, kräftiges Blau
                    "secondary": "#0d9488", // Ein tiefes Türkis für sekundäre Elemente
                    "accent": "#f59e0b",    // Ein warmer Bernsteinton für Akzente und CTAs
                    "primary-content": "#ffffff", // Stellt sicher, dass Text auf primären Buttons weiß ist
                },
            },
            {
                dark: {
                    // Als Basis für den Dark-Mode dient das "business" Theme.
                    ...themes["business"],
                    "primary": "#3b82f6",   // Ein helleres Blau für besseren Kontrast auf dunklem Hintergrund
                    "secondary": "#14b8a6", // Ein lebendigeres Türkis
                    "accent": "#facc15",    // Ein leuchtenderer Gold/Gelb-Ton für den Dark-Mode
                    "primary-content": "#ffffff",
                },
            },
        ],
        darkTheme: "dark", // Legt fest, welches Theme für den Dark-Mode verwendet wird
    },
};