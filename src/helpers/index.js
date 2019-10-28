const separator = '/';
export const toKey = (navigator, scene) => `${navigator}${separator}${scene}`;
export const fromKey = key => key.split(separator);
