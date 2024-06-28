export const SCROLL_ANCHOR = {
    TOP: 'TOP',
    BOTTOM: 'BOTTOM'
} as const;

export type scrollAnchorType = keyof typeof SCROLL_ANCHOR;