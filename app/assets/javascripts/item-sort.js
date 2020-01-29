$(document).on('turbolinks:load', function () {
  $(function () {
    $('#result').sortable({
      handle: $('.sort_item'),
      start: function (event, ui) {
        let helper_item = ui.helper.first();
        helper_item.css('height', '90%');
        helper_item.find('.content').css('height', '15%');
        helper_item.find('.show-on').css('height', '58%');
      }
    });
  });
});
