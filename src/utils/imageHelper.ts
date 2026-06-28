// Import all product assets
// @ts-ignore
import kiwiImg from '../../assets/kiwi.png';
// @ts-ignore
import mangoImg from '../../assets/mango.png';
// @ts-ignore
import orangeImg from '../../assets/orange.png';
// @ts-ignore
import dragonFruitImg from '../../assets/dragonfruit.png';
// @ts-ignore
import blueberriesImg from '../../assets/blueberries.png';
// @ts-ignore
import avocadoImg from '../../assets/avacado.png';
// @ts-ignore
import pomegranateImg from '../../assets/pomegranate.png';
// @ts-ignore
import walnutsImg from '../../assets/walnut.png';
// @ts-ignore
import almondsImg from '../../assets/almmond.png';
// @ts-ignore
import cashewsImg from '../../assets/cashews.png';
// @ts-ignore
import pistachiosImg from '../../assets/pistacious.png';
// @ts-ignore
import mixedNutsImg from '../../assets/mixednut.png';
// @ts-ignore
import orangeJuiceImg from '../../assets/juice.png';
// @ts-ignore
import mangoJuiceImg from '../../assets/mangojuice.png';
// @ts-ignore
import blueberriesJuiceImg from '../../assets/blueberriesjuice.png';
// @ts-ignore
import mixedFruitJuiceImg from '../../assets/🍹 Zip-a-Dee-Doo-Dah-Photoroom-Photoroom-Photoroom.png';
// @ts-ignore
import watermelonJuiceImg from '../../assets/watermelonjuice.png';
// @ts-ignore
import saladTropicalMixImg from '../../assets/tropicalsald.png';
// @ts-ignore
import saladTropicalParadiseImg from '../../assets/tropicalparadise.jpeg';
// @ts-ignore
import saladBerryBurstImg from '../../assets/berrybust.png';
// @ts-ignore
import detoxImg from '../../assets/detox.jpeg';

// Dynamic resolver map matching plain path/filenames to statically imported URLs
const assetMap: Record<string, string> = {
  // Fruits
  'kiwi.png': kiwiImg,
  'mango.png': mangoImg,
  'orange.png': orangeImg,
  'dragonfruit.png': dragonFruitImg,
  'blueberries.png': blueberriesImg,
  'avocado.png': avocadoImg,
  'avacado.png': avocadoImg,
  'pomegranate.png': pomegranateImg,
  
  // Nuts
  'walnuts.png': walnutsImg,
  'walnut.png': walnutsImg,
  'almonds.png': almondsImg,
  'almmond.png': almondsImg,
  'cashews.png': cashewsImg,
  'pistachios.png': pistachiosImg,
  'pistacious.png': pistachiosImg,
  'mixednuts.png': mixedNutsImg,
  'mixednut.png': mixedNutsImg,
  
  // Juices
  'orangejuice.png': orangeJuiceImg,
  'mangojuice.png': mangoJuiceImg,
  'blueberriesjuice.png': blueberriesJuiceImg,
  'mixedjuice.png': mixedFruitJuiceImg,
  'watermelonjuice.png': watermelonJuiceImg,
  
  // Salads
  'salad_tropical_mix.png': saladTropicalMixImg,
  'tropicalsald.png': saladTropicalMixImg,
  'salad_tropical_paradise.png': saladTropicalParadiseImg,
  'tropicalparadise.jpeg': saladTropicalParadiseImg,
  'salad_berry_burst.png': saladBerryBurstImg,
  'berrybust.png': saladBerryBurstImg,
  
  // Detox
  'detox.jpeg': detoxImg,
};

/**
 * Resolves a dynamic product icon. If the input is a plain asset name listed in the map
 * or looks like an absolute path/URL, it returns the resolved path. Otherwise, returns original (e.g. Emoji).
 */
export function getProductImage(iconName: string): string {
  if (!iconName) return '';
  
  // 1. Check if it matches a registered local key in our asset map (case-insensitive)
  const key = iconName.toLowerCase().trim();
  if (assetMap[key]) {
    return assetMap[key];
  }
  
  // 2. Check if it's already a full relative/absolute path or URL
  if (iconName.includes('/') || iconName.includes('.') || iconName.startsWith('data:') || iconName.startsWith('http')) {
    return iconName;
  }
  
  // 3. Fall back to original (e.g., Unicode Emoji)
  return iconName;
}
