$(document).on('turbolinks:load', function () {
  $(function () {
    $('#item_form').validationEngine({
      promptPosition: "bottomLeft"
    });
  });
});