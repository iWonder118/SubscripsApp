$(document).on('turbolinks:load', function () {
  $(function () {
    let color_ids = new Array();
    let item_colors = {};

    //ページ読み込み時にイメージカラーへ変更する処理
    $('input[data-color]').each(function () {
      color_ids.push($(this).data('color'));
    });
    color_ids.forEach(function (color_id) {
      item_colors[color_id] = $('input[data-color=' + color_id + ']').val();
    })
    for (let id in item_colors) {
      if (item_colors[id] == 'grey') {
        $('li#item-' + id).children('.content').css('borderColor', '#eeeeee');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#eeeeee');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#eeeeee');
        $('a[data-link=' + id + ']').css('backgroundColor', '#eeeeee');
      }
      else if (item_colors[id] == 'red') {
        $('li#item-' + id).children('.content').css('borderColor', '#ef9a9a');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#ef9a9a');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#ef9a9a');
        $('a[data-link=' + id + ']').css('backgroundColor', '#ef9a9a');
      }
      else if (item_colors[id] == 'orange') {
        $('li#item-' + id).children('.content').css('borderColor', '#ffcc80');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#ffcc80');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#ffcc80');
        $('a[data-link=' + id + ']').css('backgroundColor', '#ffcc80');
      }
      else if (item_colors[id] == 'yellow') {
        $('li#item-' + id).children('.content').css('borderColor', '#fff59d');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#fff59d');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#fff59d');
        $('a[data-link=' + id + ']').css('backgroundColor', '#fff59d');
      }
      else if (item_colors[id] == 'green') {
        $('li#item-' + id).children('.content').css('borderColor', '#a5d6a7');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#a5d6a7');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#a5d6a7');
        $('a[data-link=' + id + ']').css('backgroundColor', '#a5d6a7');
      }
      else if (item_colors[id] == 'blue') {
        $('li#item-' + id).children('.content').css('borderColor', '#90caf9');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#90caf9');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#90caf9');
        $('a[data-link=' + id + ']').css('backgroundColor', '#90caf9');
      }
      else if (item_colors[id] == 'purple') {
        $('li#item-' + id).children('.content').css('borderColor', '#ce93d8');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#ce93d8');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#ce93d8');
        $('a[data-link=' + id + ']').css('backgroundColor', '#ce93d8');
      }
      else if (item_colors[id] == 'pink') {
        $('li#item-' + id).children('.content').css('borderColor', '#f48fb1');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#f48fb1');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#f48fb1');
        $('a[data-link=' + id + ']').css('backgroundColor', '#f48fb1');
      }
      else if (item_colors[id] == 'brown') {
        $('li#item-' + id).children('.content').css('borderColor', '#bcaaa4');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#bcaaa4');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#bcaaa4');
        $('a[data-link=' + id + ']').css('backgroundColor', '#bcaaa4');
      }
      else {
        $('li#item-' + id).children('.content').css('borderColor', '#ffffff');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#ffffff');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#ffffff');
        $('a[data-link=' + id + ']').css('backgroundColor', '#ffffff');
      }
    }

    //モーダルフォームでイメージカラー選択時にborderの色を変更する処理
    $(document).on('click', '.item-skin', function () {
      let border_color = $(this).data('item-skin');

      if (border_color == 'grey') {
        $('.modal-form').css('borderColor', '#eeeeee');
      }
      else if (border_color == 'red') {
        $('.modal-form').css('borderColor', '#ef9a9a');
      }
      else if (border_color == 'orange') {
        $('.modal-form').css('borderColor', '#ffcc80');
      }
      else if (border_color == 'yellow') {
        $('.modal-form').css('borderColor', '#fff59d');
      }
      else if (border_color == 'green') {
        $('.modal-form').css('borderColor', '#a5d6a7');
      }
      else if (border_color == 'blue') {
        $('.modal-form').css('borderColor', '#90caf9');
      }
      else if (border_color == 'purple') {
        $('.modal-form').css('borderColor', '#ce93d8');
      }
      else if (border_color == 'pink') {
        $('.modal-form').css('borderColor', '#f48fb1');
      }
      else if (border_color == 'brown') {
        $('.modal-form').css('borderColor', '#bcaaa4');
      }
      else {
        $('.modal-form').css('borderColor', '#ffffff');
      }
    });
  });
});