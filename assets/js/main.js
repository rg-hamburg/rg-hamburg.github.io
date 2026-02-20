// ============================================================
//  INSTAGRAM FEED — Instafeed.js v3
//  Paste long-lived access tokens below to enable live posts.
//  Accounts do NOT need to be Business/Creator accounts.
//  See: https://developers.facebook.com → Instagram API with Instagram Login
// ============================================================
//const IG_TOKEN_RG  = '';   // TODO: @rg_hamburg long-lived token
//// @bmx_rghamburg long-lived token
//const IG_TOKEN_BMX = 'IGAA9HearWwmRBZAGFhbGh5NHRVQVk4NDRZAU0d0ZAkI1Vy0wdG1oSGRPc2xkanRuOFZABeTRocXYxSWdvY1cxaXdTWF9TV29TOUhPc2dqbXJPYXJZAa0F5QjNyTUdCcV90V0pyRzg2R2k3QW9TMWxPVHcweTIyT29NZA0l0Y0JqRDJTOAZDZD';
//
//const IG_TMPL =
//  '<div class="col-4">' +
//    '<div class="social-item">' +
//      '<a href="{{link}}" target="_blank" rel="noopener">' +
//        '<img src="{{image}}" class="social-img" alt="{{caption}}">' +
//      '</a>' +
//    '</div>' +
//  '</div>';
//
//if (IG_TOKEN_RG) {
//  new Instafeed({ accessToken: IG_TOKEN_RG,  limit: 3, target: 'instafeed-rg',  template: IG_TMPL }).run();
//}
//if (IG_TOKEN_BMX) {
//  new Instafeed({ accessToken: IG_TOKEN_BMX, limit: 3, target: 'instafeed-bmx', template: IG_TMPL }).run();
//}

// Hero carousel — wire pagination tabs as indicators
document.addEventListener('DOMContentLoaded', () => {
  const carousel   = document.getElementById('heroCarousel');
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
