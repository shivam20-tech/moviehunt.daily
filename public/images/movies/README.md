# Movie Images Folder

Drop your custom movie images (posters, stills, screenshots) here!

## How to use:
1. Place image files in this folder, for example:
   - `tumbbad-1.jpg`
   - `ugly-1.jpg`
   - `super-deluxe-2.png`

2. Reference them in `data/hunts.ts` like this:
```ts
images: [
  '/images/movies/tumbbad-1.jpg',
  '/images/movies/tumbbad-2.jpg',
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23'
]
```

The sliding image slider on the website will automatically load and slide through all images!
