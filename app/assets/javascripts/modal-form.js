$(document).on('turbolinks:load', function () {
  $(function () {

    //色選択時の処理
    $(document).on('click', '.item-skin', function () {
      let color_name = $(this).data("item-skin");

      $(this).prevAll().removeClass('active');
      $(this).nextAll().removeClass('active');
      $(this).addClass('active');
      $('#item_color').val(color_name);
    });
  });
});