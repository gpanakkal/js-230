$(() => {
  $('ul').on('click', 'a', (e) => {
    e.preventDefault();
    const block = $(e.target).attr('data-block');
    $('article').css('visibility', 'visible');
    $('article').hide().filter(`[data-block=${block}]`).show();
  });
});