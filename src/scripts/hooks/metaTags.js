export function setMetaTags({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}) {
  if (title) {
    document.title = title;
  }
  const basicMetaTags = [
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
  ];
  const ogMetaTags = [
    { property: 'og:title', content: ogTitle || title },
    { property: 'og:description', content: ogDescription || description },
    { property: 'og:image', content: ogImage },
    { property: 'og:url', content: ogUrl || window.location.href },
  ];

  const allMetaTags = [...basicMetaTags, ...ogMetaTags];

  allMetaTags.forEach((tag) => {
    if (!tag.content) return;

    const selector = tag.name
      ? `meta[name="${tag.name}"]`
      : `meta[property="${tag.property}"]`;

    let meta = document.querySelector(selector);

    if (!meta) {
      meta = document.createElement('meta');
      if (tag.name) {
        meta.setAttribute('name', tag.name);
      } else {
        meta.setAttribute('property', tag.property);
      }
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', tag.content);
  });
}
