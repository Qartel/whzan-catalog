// src/app/assets/productImages.ts
import imgHeadphones from './product_headphones.jpg';
import imgHomeDecor from './product_home_decor.jpg';
import imgLaptop from './product_laptop.jpg';
import imgDisplay from './product_product_display.jpg';
import imgShoesRed from './product_shoes_red.jpg';
import imgSneakers from './product_sneakers.jpg';
import imgSunglasses from './product_sunglasses.jpg';
import imgWatch from './product_watch.jpg';

// Put all your product images in one array
const allImages = [
  imgShoesRed,
  imgSneakers,
  imgHeadphones,
  imgSunglasses,
  imgLaptop,
  imgDisplay,
  imgHomeDecor,
  imgWatch,
];

function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// Stable mapping: same id always gets the same image
export function getProductImageForId(id: string): string {
  if (!id) return allImages[0];
  const index = hashId(id) % allImages.length;
  return allImages[index];
}
