/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            spacing: {
                18: "4.5rem",
                112: "28rem",
                120: "30rem",
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
    ],
};
