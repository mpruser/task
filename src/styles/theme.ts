/**
 * styled-components theme setting
 * @see '@styles/variables.ts'
 */
export const theme = {
  fontFamily: 'var(--font-family)',

  font: {
    h1: 'var(--font-h1)',
    h2: 'var(--font-h2)',
    h3: 'var(--font-h3)',
    h4: 'var(--font-h4)',
    h5: 'var(--font-h5)',
    h6: 'var(--font-h6)',
    body1: 'var(--font-body1)',
    body2: 'var(--font-body2)',
    caption: 'var(--font-caption)',
    subtitle1: 'var(--font-subtitle1)',
    subtitle2: 'var(--font-subtitle2)',
  },

  color: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    success: 'var(--color-success)',
    error: 'var(--color-error)',
    surface: 'var(--color-surface)',
    background: 'var(--color-background)',
    white: 'var(--color-white)',
    black: 'var(--color-black)',
    gray70: 'var(--color-gray70)',
    gray50: 'var(--color-gray50)',
    gray30: 'var(--color-gray30)',
    gray20: 'var(--color-gray20)',
    gray8: 'var(--color-gray8)',
    gray3: 'var(--color-gray3)',
  },

  z: {
    base: 'var(--z-base)',
    content: 'var(--z-content)',
    header: 'var(--z-header)',
  },

  spacing: {
    large: 'var(--spacing-large)',
    medium: 'var(--spacing-medium)',
    small: 'var(--spacing-small)',
  },
};

export type Theme = typeof theme;
