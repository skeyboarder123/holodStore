export function formatPrice(price) {
  return (
    price.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    }) + ' руб.'
  );
}
