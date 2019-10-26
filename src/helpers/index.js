export const toKey = (navigator, scene) => JSON.stringify([navigator, scene]);
export const fromKey = key => JSON.parse(key);
