$(document).on('turbolinks:load', function () {
  $(function () {
    $(document).on('change', '.flash-box', function () {
      $('.notice').fadeOut(3000).queue(function () {
        this.remove();
      });
    });
    $('.notice').fadeOut(3000).queue(function () {
      this.remove();
    });
    $('.alert').fadeOut(3000).queue(function () {
      this.remove();
    });
  });
});
