const separator = '/';
export const toId = (navigator, scene) => `${navigator}${separator}${scene}`;
export const fromId = id => id.split(separator);
