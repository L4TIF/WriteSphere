export const themes = {
    light: {
        background: '#ffffff',
        text: '#1a1a1a',
        primary: '#3b82f6',
        secondary: '#6b7280',
        accent: '#8b5cf6',
        border: '#e5e7eb',
    },
    dark: {
        background: '#1a1a1a',
        text: '#ffffff',
        primary: '#60a5fa',
        secondary: '#9ca3af',
        accent: '#a78bfa',
        border: '#374151',
    },
};

export const getThemeColors = (theme) => {
    return themes[theme] || themes.light;
}; 