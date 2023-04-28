import { css } from 'styled-components';

export const variables = css`
  :root {
    --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    
    /** html > font-size: 10px; */
    --font-h1        : normal 300 6rem/1.167 var(--font-family);
    --font-h2        : normal 300 3.75rem/1.2 var(--font-family);
    --font-h3        : normal 400 3rem/1.167 var(--font-family);
    --font-h4        : normal 400 2.125rem/1.235 var(--font-family);
    --font-h5        : normal 400 1.5rem/1.334 var(--font-family);
    --font-h6        : normal 500 1.25rem/1.6 var(--font-family);
    --font-body1     : normal 400 1rem/1.5 var(--font-family);
    --font-body2     : normal 400 0.875rem/1.43 var(--font-family);
    --font-caption   : normal 400 0.75rem/1.66 var(--font-family);
    --font-subtitle1 : normal 400 1rem/1.75 var(--font-family);
    --font-subtitle2 : normal 500 0.875rem/1.57 var(--font-family);

    --color-primary    : rgba(25, 118, 210, 1);
    --color-secondary  : rgba(0, 0, 0, 1);
    --color-success    : rgba(46, 125, 50, 1);
    --color-error      : rgba(211, 47, 47, 1);
    --color-surface:   : rgba(255, 255, 255, 1);
    --color-background : rgba(247, 247, 247, 1);
    --color-white      : rgba(255, 255, 255, 1);
    --color-black      : rgba(0, 0, 0, 1);
    --color-gray70     : rgba(76, 76, 76, 1);
    --color-gray50     : rgba(127, 127, 127, 1);
    --color-gray30     : rgba(178, 178, 178, 1);
    --color-gray20     : rgba(204, 204, 204, 1);
    --color-gray8      : rgba(235, 235, 235, 1);
    --color-gray3      : rgba(247, 247, 247, 1);

    --z-base: 0;
    --z-header: 100;

    --spacing-large: 1.6rem;
    --spacing-medium: 1.2rem;
    --spacing-small: 0.8rem;
  }
`;
