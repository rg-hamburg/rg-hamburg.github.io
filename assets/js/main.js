// Hero carousel — wire pagination tabs as indicators
document.addEventListener('DOMContentLoaded', () => {
  const carousel  = document.getElementById('heroCarousel');
  const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carousel);
  const pagiItems  = document.querySelectorAll('.hero-pagi-item');

  // Click: jump to the corresponding slide
  pagiItems.forEach((item, i) => {
    item.addEventListener('click', () => bsCarousel.to(i));
  });

  // On slide change: move active class so the CSS progress animation restarts
  carousel.addEventListener('slid.bs.carousel', (e) => {
    pagiItems.forEach((item, i) => {
      item.classList.toggle('active', i === e.to);
    });
  });
});
