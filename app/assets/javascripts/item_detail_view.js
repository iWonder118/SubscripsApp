$(document).on('turbolinks:load', function () {
  $(function () {

    //アイテムの詳細表示処理
    $(document).on('click', '.show-on__button', function (e) {
      e.preventDefault();
      $(this).parent().css('display', 'none');
      $(this).parent().next(".content__body").css('display', 'flex');
      $(this).parent().nextAll('.show-off').css('display', 'block');
    });

    //アイテムの詳細 非 表示処理
    $(document).on('click', '.show-off__button', function (e) {
      e.preventDefault();
      $(this).parent().css('display', 'none');
      $(this).parent().prev(".content__body").css('display', 'none');
      $(this).parent().prevAll('.show-on').css('display', 'block');
    });

    //アイテムの全詳細 非 表示処理
    $(document).on('click', '#show_all_off', function (e) {
      e.preventDefault();
      $(".content__body").css('display', 'none');
      $('.show-off').css('display', 'none');
      $('.show-on').css('display', 'block');
    });
  });
});