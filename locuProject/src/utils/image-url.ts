function getImageURL(name: string) {
  return new URL(`../../../server/public/uploads/${name}`, import.meta.url)
    .href;
}

export { getImageURL };
