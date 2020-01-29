$(document).on('turbolinks:load', function () {
  $(function () {
    $(document).on('mousedown', '.sort_item', function () {
      let sort_item = $(this).parent().parent().parent();
      $(sort_item).sortable({
        handle: $('.sort_item'),
        cursor: "row-resize",
        axis: "y",
        start: function (event, ui) {
          let helper_item = ui.helper.first();
          helper_item.css('height', '90%');
          helper_item.find('.content').css('height', '15%');
          helper_item.find('.show-on').css('height', '58%');
        },

        update: function (e, ui) {
          let item = ui.item;
          let sort_url = item.find('.sort_item').attr('href');
          let item_data = item.index();
          console.log(item_data)
          $.ajax({
            type: 'PATCH',
            url: sort_url,
            dataType: 'json',
            data: { item: { row_order_position: item_data } },
          });
        }
      });
    });
  });
});
