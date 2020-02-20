$(document).on('turbolinks:load', function () {
  $(function () {
    $('#item_form').validationEngine({
      promptPosition: "bottomLeft"
    });
    $('#item_form_edit').validationEngine({
      promptPosition: "bottomLeft"
    });
    $('#new_user').validationEngine({
      promptPosition: "bottomLeft"
    });
  });
});