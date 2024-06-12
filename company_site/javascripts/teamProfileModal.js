/*
- Create a box with white background containing:
  - profile photo inline with their name
  - filler text underneath
  - close button in top right to close both modal and remove overlay

- When the box is up:
  - set a darken overlay on the rest of the page
  - prevent interaction with the rest of the page

Implementation
- div#modal for the box?
- listener on #team ul for anchor clicks using jQuery?
  - check if modal is up and skip logic if so
*/

$(() => {
  const profileModal = Handlebars.compile($('#profileModal').html());

  Handlebars.registerHelper('lowerCase', function(str) {
    return new Handlebars.SafeString(str?.toLowerCase() ?? '');
  });

  $('#team ul').on('click', 'a', (e) => {
    e.preventDefault();

    const name = e.target.tagName === 'IMG' 
      ? $(e.target).attr('alt') 
      : $(e.target).find('img').attr('alt');
    const [firstName, lastName] = name.split(' ');

    const person = {
      firstName,
      lastName,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    };
  
    $('#team > article > h2').after(profileModal(person));
    const overlay = $('#modalOverlay');

    setTimeout(() => {
      overlay.addClass('visible');
      $('#modal').addClass('visible');
    }, 0);
    
    $('#close').on('click', 'a', (e) => {
      e.preventDefault();
      overlay.removeClass('visible');
      $('#modal').removeClass('visible');
      
      setTimeout(() => $('#modal').remove(), 1000);
    });

    $(document).on('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        $('#close a').trigger('click');
      }
    });
  });
});
