export const SHOW_SKELETON = 'SHOW_SKELETON';
export const HIDE_SKELETON = 'HIDE_SKELETON';

export function showSkeleton() {
  return { type: SHOW_SKELETON };
}

export function hideSkeleton() {
  return { type: HIDE_SKELETON };
}
