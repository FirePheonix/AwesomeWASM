/** Steam CDN artwork — header/capsule are the most reliable assets */
export function steamArt(appId: number) {
  const base = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}`;
  return {
    cover: `${base}/header.jpg`,
    hero: `${base}/header.jpg`,
    screenshots: [
      `${base}/header.jpg`,
      `${base}/capsule_616x353.jpg`,
      `${base}/capsule_231x87.jpg`,
    ],
  };
}
