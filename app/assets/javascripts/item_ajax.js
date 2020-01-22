$(document).on('turbolinks:load', function () {
  $(function () {
    //非同期時に追加するHTML
    function buildHTML(item) {
      let html = `
                  </li>
                  <li class="item" id="item-${item.id}">
                    <div class='function-buttons'>
                      <a class="edit_item" data-edit="${item.id}" href="/users/${item.uid}/items/${item.id}">
                        <div aria-label='編集' class='tooltip' data-microtip-position='top' role='tooltip'> <i class='fas fa-edit'></i> </div>
                      </a>
                      <a class="delete_item"  data-delete="${item.id}" href="/users/${item.uid}/items/${item.id}">
                        <div aria-label='削除' class='tooltip' data-microtip-position='top' role='tooltip'> <i class='fas fa-trash-alt'></i> </div>
                      </a>
                    </div>
                    <div class='content'>
                      <div class='content__header'>
                        <div class='header-survice'>
                          <p aria-label='サービス名' class='header-survice__title' data-microtip-position='top' data-title="${item.id}" role='tooltip'>${item.title}</p>
                          <p aria-label='プラン名' class='header-survice__plan' data-microtip-position='top' data-plan="${item.id}" role='tooltip'>${item.plan}</p>
                        </div>
                        <p aria-label='価格' class='header-price' data-microtip-position='top' data-price="${item.id}" role='tooltip'>¥ ${item.price}</p>
                      </div>
                      <div class='show-on'>
                        <a class="show-on__button" href="">
                          <div aria-label='詳細を表示' class='tooltip' data-microtip-position='top' role='tooltip'> <i class='fas fa-chevron-down'></i> </div>
                        </a>
                      </div>
                      <div class='content__body'> <input data-color="${item.id}" type='hidden' value="${item.color}">
                        <div class='body-link'>
                          <div class='body-link__label'> 登録したリンク </div> <a class="body-link__button" data-link="${item.id}" href="${item.link}">登録したサービスサイトを確認する</a> </div>
                        <div class='body-period'>
                          <div class='body-period__label'> 支払いタイミング </div>
                          <p data-period_long="${item.id}">${item.period_long}ヶ月ごと </p> <input data-period_unit="${item.id}" type='hidden' value="${item.period_unit}"> </div>
                        <div class='body-firstpayment'>
                          <div class='body-firstpayment__label'> 初回支払日 </div> <input data-first_payment="${item.id}" type='hidden' value=${item.first_payment}>
                          <p>${item.first_payment}</p>
                        </div>
                        <div class='body-paymethod'>
                          <div class='body-paymethod__label'> 支払い方法 </div>
                          <p data-pay_method="${item.id}">${item.pay_method}</p>
                        </div>
                        <div class='body-release'>
                          <div class='body-release__label'> 公開設定 </div> <input data-release="${item.id}" type='hidden' value="${item.release}">
                          ${item.release ? "<div class='body-release__display-on'> 公開中 </div>" : "<div class='body-release__display-off'> 非公開 </div>"}
                        </div>
                        <div class='body-description'>
                          <div class='body-description__label'> メモ </div>
                          <input data-description="${item.id}" type='hidden' value="${item.description}">
                          <p>${item.description}</p>
                        </div>
                      </div>
                      <div class='show-off'>
                        <a class="show-off__button" href="">
                          <div aria-label='詳細をしまう' class='tooltip' data-microtip-position='top' role='tooltip'> <i class='fas fa-chevron-up'></i> </div>
                        </a>
                      </div>
                    </div>
                  </li>`
      return html;
    }

    function buildShare(item) {
      let share = `<a title="Twitter" target="_blank" class="twitter" href="https://twitter.com/share?url=https://${location.host}/users/${item.uid}/items/${item.id}&text=${item.description}%0aサービス名:${item.title}%0aサービス名:${item.plan}%0a%20%23SubscripS%20">
                    <div aria-label='Twitterでツイート' class='tooltip' data-microtip-position='top' role='tooltip'>
                      <i class='fab fa-twitter'></i>
                    </div>
                  </a>
                  <a title="Facebook" target="_blank" class="facebook" href="https://www.facebook.com/sharer/sharer.php?u=https://${location.host}/users/${item.uid}/items/${item.id}&text=${item.description}%0aサービス名:${item.title}%0aサービス名:${item.plan}%0a%20%23SubscripS%20">
                    <div aria-label='Facebookでシェア' class='tooltip' data-microtip-position='top' role='tooltip'>
                      <i class='fab fa-facebook'></i>
                    </div>
                  </a>
                  <a title="LINE" target="_blank" class="line" href="http://line.me/R/msg/text/?https://${location.host}/users/${item.uid}/items/${item.id}&text=${item.description}%0aサービス名:${item.title}%0aサービス名:${item.plan}%0a%20%23SubscripS%20">
                    <div aria-label='Lineでシェア' class='tooltip' data-microtip-position='top' role='tooltip'>
                      <i class='fab fa-line'></i>
                    </div>
                  </a>
                  <a title="Slack" target="_blank" class="slack" href="http://slackbutton.herokuapp.com/post/new/?url=https://${location.host}/users/${item.uid}/items/${item.id}&text=${item.description}%0aサービス名:${item.title}%0aサービス名:${item.plan}%0a%20%23SubscripS%20">
                    <div aria-label='Slackでシェア' class='tooltip' data-microtip-position='top' role='tooltip'>
                      <i class='fab fa-slack'></i>
                    </div>`
      return share;
    }

    //非同期で追加されたアイテムにイメージカラーへ変更する処理
    function changeItemColor(id) {
      let change_item_color = $('input[data-color=' + id + ']').val();
      if (change_item_color == 'grey') {
        $('li#item-' + id).children('.content').css('borderColor', '#eeeeee');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#eeeeee');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#eeeeee');
        $('a[data-link=' + id + ']').css('backgroundColor', '#eeeeee');
      }
      else if (change_item_color == 'red') {
        $('li#item-' + id).children('.content').css('borderColor', '#ef9a9a');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#ef9a9a');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#ef9a9a');
        $('a[data-link=' + id + ']').css('backgroundColor', '#ef9a9a');
      }
      else if (change_item_color == 'orange') {
        $('li#item-' + id).children('.content').css('borderColor', '#ffcc80');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#ffcc80');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#ffcc80');
        $('a[data-link=' + id + ']').css('backgroundColor', '#ffcc80');
      }
      else if (change_item_color == 'yellow') {
        $('li#item-' + id).children('.content').css('borderColor', '#fff59d');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#fff59d');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#fff59d');
        $('a[data-link=' + id + ']').css('backgroundColor', '#fff59d');
      }
      else if (change_item_color == 'green') {
        $('li#item-' + id).children('.content').css('borderColor', '#a5d6a7');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#a5d6a7');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#a5d6a7');
        $('a[data-link=' + id + ']').css('backgroundColor', '#a5d6a7');
      }
      else if (change_item_color == 'blue') {
        $('li#item-' + id).children('.content').css('borderColor', '#90caf9');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#90caf9');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#90caf9');
        $('a[data-link=' + id + ']').css('backgroundColor', '#90caf9');
      }
      else if (change_item_color == 'purple') {
        $('li#item-' + id).children('.content').css('borderColor', '#ce93d8');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#ce93d8');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#ce93d8');
        $('a[data-link=' + id + ']').css('backgroundColor', '#ce93d8');
      }
      else if (change_item_color == 'pink') {
        $('li#item-' + id).children('.content').css('borderColor', '#f48fb1');
        $('li#item-' + id).children().children('.content__header').css('backgroundColor', '#f48fb1');
        $('li#item-' + id).children().children('.show-on').css('backgroundColor', '#f48fb1');
        $('a[data-link=' + id + ']').css('backgroundColor', '#f48fb1');
      }
      else if (change_item_color == 'brown') {
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

    //数字から円表記の文字列に変換
    function changeYen(num) {
      return '¥' + String(num).split("").reverse().join("").match(/\d{1,3}/g).join(",").split("").reverse().join("");
    }

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      let token;
      if (!options.crossDomain) {
        token = $('meta[name="csrf-token"]').attr('content');
        if (token) {
          return jqXHR.setRequestHeader('X-CSRF-Token', token);
        }
      }
    });

    // 作成ボタンを押したときのリセット処理とモーダルウィンドウ表示
    $(document).on('click', '#new_item', function (e) {
      e.preventDefault();
      let create_href = $('#new_item').attr('href').match(/\/users\/\d+\/items/);

      $('form').attr('action', create_href[0]);
      $('form').attr('id', 'item_form');
      $('#item_form')[0].reset();
      $("#item_button").val("登録");
      $('#modal-window').css('display', 'flex');
      $('#new_item').css('display', 'none');
      $('#show_all_off').css('display', 'none');
      $('#item_color').val("white");
      $('.item-skin-white').addClass('active');
      $('#release-public').prev('#release-private').removeClass('selecting');
      $('.item-skin-white').nextAll().removeClass('active');
      $('.modal-form').css('borderColor', '#ffffff');
      $('#release-public').addClass('selecting');
      $('#item_release').val(1);
    });

    //モーダルウィンドウの取り消しボタン
    $(document).on('click', '#modal-close', function (e) {
      e.preventDefault();
      $('#modal-window').css('display', 'none');
      $('#new_item').css('display', 'block');
      $('#show_all_off').css('display', 'block');
    });

    // 作成時の非同期処理
    $(document).on('submit', '#item_form', function (e) {
      e.preventDefault();
      e.stopPropagation();
      let formData = new FormData(this);
      let create_url = $(this).attr('action');

      $.ajax({
        url: create_url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })

        .done(function (data) {
          let now_fee = Number($('#total_fee').text().replace(/[^0-9]/g, ''));
          let html = buildHTML(data);
          $('#result').append(html);
          if (data.release == 'true') {
            let share = buildShare(data);
            $('#item-' + data.id).children('.function-buttons').prepend(share);
          }
          changeItemColor(data.id);
          $('#total_fee').text(changeYen(now_fee + Number(data.price)));
          $('#total_service').text($('.item:visible').length);
          $('#result').animate({ scrollTop: $("#result")[0].scrollHeight }, 1500);
        })

        .fail(function () {
          alert('投稿に失敗しました');
        })

        .always(function () {
          $('#modal-window').css('display', 'none');
          $('#new_item').css('display', 'block');
          $('#show_all_off').css('display', 'block');
          $('#item_button').prop("disabled", false);
          $('#item_form')[0].reset();
        })
      return false;
    });

    // 削除時の非同期処理
    $(document).on('click', '.delete_item', function (e) {
      e.preventDefault();
      e.stopPropagation();
      let delete_url = $(this).attr('href');
      let delete_id = $(this)[0].dataset['delete'];

      $.ajax({
        url: delete_url,
        type: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ delete_id: delete_id }),
        dataType: 'json',
        processData: false,
        contentType: false
      })

        .done(function (data) {
          let now_fee = Number($('#total_fee').text().replace(/[^0-9]/g, ''));
          $("#item-" + data.delete_id).remove();
          $('#total_fee').text(changeYen(now_fee - Number(data.price)));
          $('#total_service').text($('.item:visible').length);
        })

        .fail(function () {
          alert('削除にに失敗しました');
        })
      return false;
    });

    // 編集ボタンを押したときのプリセット処理とモーダルウィンドウ表示
    $(document).on('click', '.edit_item', function (e) {
      e.preventDefault();
      e.stopPropagation();
      let edit_href = $(this).attr('href');

      $('form').attr('action', edit_href);
      $('form').attr('id', 'item_form_edit');
      $('#item_form_edit')[0].reset();

      let edit_id = $(this)[0].dataset['edit'];
      let edit_title = $("p[data-title=" + edit_id + "]").text();
      let edit_plan = $("p[data-plan=" + edit_id + "]").text();
      let edit_price = $("p[data-price=" + edit_id + "]").text().match(/\d+/);
      let edit_link = $("a[data-link=" + edit_id + "]").attr("href");
      let edit_color = $("input[data-color=" + edit_id + "]").val();
      let edit_period_long = $("p[data-period_long=" + edit_id + "]").text().match(/\d+/);;
      let edit_period_unit = Number($("input[data-period_unit=" + edit_id + "]").val());
      let edit_first_payment = $("input[data-first_payment=" + edit_id + "]").val();
      let edit_pay_method = $("p[data-pay_method=" + edit_id + "]").text();
      let edit_release = String($("input[data-release=" + edit_id + "]").val().match(/[A-Z]{4,5}/i));
      let edit_description = $("input[data-description=" + edit_id + "]").val();

      $("#item_title").val(edit_title);
      $("#item_link").val(edit_link);
      $("#item_color").val(edit_color);
      $("#item_plan").val(edit_plan);
      $("#item_price").val(edit_price);
      $("#item_payment_attributes_period_long").val(edit_period_long);
      $("#item_payment_attributes_period_unit").val(edit_period_unit);
      $("#item_payment_attributes_first_payment").val(edit_first_payment);
      $("#item_payment_attributes_pay_method").val(edit_pay_method);
      $("#item_payment_attributes_description").val(edit_description);
      $("#item_button").val("更新");
      $('#modal-window').css('display', 'flex');
      $('#new_item').css('display', 'none');
      $('#show_all_off').css('display', 'none');
      $('.item-skin').removeClass('active');
      $(".item-skin-" + edit_color).addClass('active');
      if (edit_color == 'grey') {
        $('.modal-form').css('borderColor', '#eeeeee');
      }
      else if (edit_color == 'red') {
        $('.modal-form').css('borderColor', '#ef9a9a');
      }
      else if (edit_color == 'orange') {
        $('.modal-form').css('borderColor', '#ffcc80');
      }
      else if (edit_color == 'yellow') {
        $('.modal-form').css('borderColor', '#fff59d');
      }
      else if (edit_color == 'green') {
        $('.modal-form').css('borderColor', '#a5d6a7');
      }
      else if (edit_color == 'blue') {
        $('.modal-form').css('borderColor', '#90caf9');
      }
      else if (edit_color == 'purple') {
        $('.modal-form').css('borderColor', '#ce93d8');
      }
      else if (edit_color == 'pink') {
        $('.modal-form').css('borderColor', '#f48fb1');
      }
      else if (edit_color == 'brown') {
        $('.modal-form').css('borderColor', '#bcaaa4');
      }
      else {
        $('.modal-form').css('borderColor', '#ffffff');
      }
      if (edit_release == 'true') {
        $('#release-public').prev('#release-private').removeClass('selecting');
        $('#release-public').addClass('selecting');
        $('#item_release').val(1);
      }
      else {
        $('#release-private').next('#release-public').removeClass('selecting');
        $('#release-private').addClass('selecting');
        $('#item_release').val(0);
      }
    });

    // 編集時の非同期処理
    $(document).on('submit', '#item_form_edit', function (e) {
      e.preventDefault();
      let formData = new FormData(this);
      let edit_url = $(this).attr('action');

      $.ajax({
        url: edit_url,
        type: "PATCH",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })

        .done(function (data) {
          let html = buildHTML(data);
          let update_id = $('#item-' + data.id);
          let now_fee = Number($('#total_fee').text().replace(/[^0-9]/g, ''));

          update_id.attr('id', 'item-' + data.id + '-remove');
          $('#item-' + data.id + '-remove').after(html);
          let before_price = Number($('#item-' + data.id + '-remove').children().children().children('p[data-price=' + data.id + ']').text().replace(/[^0-9]/g, ''));
          $('#item-' + data.id + '-remove').remove();
          if (data.release == 'true') {
            let share = buildShare(data);
            $('#item-' + data.id).children('.function-buttons').prepend(share);
          }
          changeItemColor(data.id);
          $('#total_fee').text(changeYen(now_fee + Number(data.price) - before_price));
          $('#result').animate({ scrollTop: update_id.scrollHeight }, 1500);
        })

        .fail(function () {
          alert('投稿に失敗しました');
        })

        .always(function () {
          $('#modal-window').css('display', 'none');
          $('#new_item').css('display', 'block');
          $('#show_all_off').css('display', 'block');
          $('#item_button').prop("disabled", false);
          $('#item_form_edit')[0].reset();
        })
      return false;
    });
  });
});