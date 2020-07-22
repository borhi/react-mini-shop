export default async () => {
  const responseItems = await fetch('/data/items.json');
  const responseAttributes = await fetch('/data/attributes.json');
  return Promise.all(
    [
      responseItems.json(),
      responseAttributes.json(),
    ].map((p) => p.catch(() => undefined)),
  );
};
