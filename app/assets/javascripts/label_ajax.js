$(document).on('turbolinks:load', function () {
  $(function () {
    $('#item-tags').tagit({
      fieldName: 'item[tag_list]',
      singleField: true,
      placeholderText: '例)動画'
    });
  });
});