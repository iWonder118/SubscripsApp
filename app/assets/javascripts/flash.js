$(document).on('turbolinks:load', function () {
  $(function () {
    $(document).on('change', '.flash-box', function () {
      setTimeout("$('.notice').fadeOut('slow')", 3000);
    });
    setTimeout("$('.alert').fadeOut('slow')", 3000);
  });
});
