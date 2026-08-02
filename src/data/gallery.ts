/**
 * Gallery
 * --------
 * Drop your photos into `src/assets/photos/` (jpg, jpeg, png, webp, avif)
 * and they will automatically appear here — no code changes needed.
 * Until then, styled placeholder tiles are shown in their place.
 */

export interface GallerySlot {
  title: string;
  caption: string;
}

export const gallerySlots: GallerySlot[] = [
  { title: 'Workspace', caption: 'Where the systems get built' },
  { title: 'Events', caption: 'Seminars and stage sessions' },
  { title: 'Community', caption: 'Clubs, teams, and people' },
  { title: 'Awards', caption: 'Chess, debate, and science' },
  { title: 'Behind the scenes', caption: 'The process, unfiltered' },
  { title: 'On the road', caption: 'Dhaka and beyond' },
];

// Vite requires this glob pattern to be a literal — do not extract it to a variable.
export const galleryPhotos: string[] = Object.values(
  import.meta.glob<string>('../assets/photos/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' }),
).sort();
