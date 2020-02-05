//テストアカウントでログインするボタンを押した際の処理
$(document).on('turbolinks:load', function () {
  $(function () {
    $(document).on('click', '#test-login', function (e) {
      e.preventDefault();
      $("#user_email").val("test-girl@gmail.com");
      $("#user_password").val("password123");
      document.forms["new_user"].submit();
    });
  });
});