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

    //公開設定時の処理
    $(document).on('click', '#release-public', function (e) {
      e.preventDefault();
      $(this).prev('#release-private').removeClass('selecting');
      $(this).addClass('selecting');
      $('#item_release').val(1);
    });

    // 非 公開設定時の処理
    $(document).on('click', '#release-private', function (e) {
      e.preventDefault();
      $(this).next('#release-public').removeClass('selecting');
      $(this).addClass('selecting');
      $('#item_release').val(0);
    });
  });
});