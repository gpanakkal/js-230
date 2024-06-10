$(function() {
  let newBindField = $form.find('input[type="text"]');
  let toggler = $('a:contains("Toggle accordion")');

  $('form').on('submit', function(e) {
    e.preventDefault();
    console.log(`New keybind: ${newBindField.val()}`);
    let keybind = String(newBindField.val());
    
    $(document).off('keypress').on('keypress', function(e) {
      if (e.key === keybind && e.target !== newBindField[0]) {
        toggler.trigger('click');
      }
    });
  });

  toggler.on('click', function toggleAccordion(event) {
    event.preventDefault();
    $('#accordion').slideToggle();
  });
});