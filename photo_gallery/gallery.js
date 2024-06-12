$(() => {
  $('#thumbnails').on('click', 'img', (e) => {
    // deactive the currently active image
    const active = document.querySelectorAll('li.active');
    active.forEach((el) => el.classList.remove('active'));
    // set the active class on the selected thumbnail
    e.target.parentNode.classList.add('active');
    const imageSrc = e.target.getAttribute('src');
    $('figure').fadeOut(200, () => {
      document.querySelector('figure > img').setAttribute('src', imageSrc);
      $('figure').fadeIn(200);
    });
  })
});
