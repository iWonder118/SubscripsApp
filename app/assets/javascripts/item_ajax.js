$(document).on('turbolinks:load', function () {
  $(function () {
    function buildHTML(item) {
      let html = `
                  </li>
                  <li id="item-${item.id}">
                    <div class='function-buttons'>
                      <a class="edit_item" data-edit="${item.id}" href="/users/${item.uid}/items/${item.id}">
                        <div aria-label='編集' class='tooltip' data-microtip-position='top' role='tooltip'> <i class='fas fa-edit'></i> </div>
                      </a>
                      <a class="delete_item"  data-delete="${item.id}" rel="nofollow" data-method="delete" href="/users/${item.uid}/items/${item.id}">
                        <div aria-label='削除' class='tooltip' data-microtip-position='top' role='tooltip'> <i class='fas fa-trash-alt'></i> </div>
                      </a>
                    </div>
                    <div class='content'>
                      <div class='content__header'>
                        <div class='header-survice'>
                          <p aria-label='サービス名' class='header-survice__title' data-microtip-position='top' data-title="${item.id}" role='tooltip'>${item.title}</p>
                          <p aria-label='プラン名' class='header-survice__plan' data-microtip-position='top' data-plan="${item.id}" role='tooltip'>${item.plan}</p>
                        </div>
                        <p aria-label='価格' class='header-price' data-microtip-position='top' data-price="${item.id}" role='tooltip'> ¥${item.price}</p>
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
                          <div class='body-release__label'> 公開設定 </div> <input data-release="${item.id}" type='hidden' ${item.release}>
                          ${item.release ? "<div class='body-release__display-on'> 公開中 </div>" : "<div class='body-release__display-off'> 非公開 </div>"}
                        </div>
                        <div class='body-description'>
                          <div class='body-description__label'> メモ </div>
                          <p data-description="${item.id}">
                            <p>${item.description}</p>
                          </p>
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
      $('#item_color').val("white");
      $('.item-skin-white').addClass('active');
      $('#release-public').prev('#release-private').removeClass('selecting');
      $('.item-skin-white').nextAll().removeClass('active');
      $('#release-public').addClass('selecting');
      $('#item_release').val(1);
    });

    //モーダルウィンドウの取り消しボタン
    $(document).on('click', '#modal-close', function (e) {
      e.preventDefault();
      $('#modal-window').css('display', 'none');
      $('#new_item').css('display', 'block');
    })

    // 作成時の非同期処理
    $(document).on('submit', '#item_form', function (e) {
      e.preventDefault();
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
          let html = buildHTML(data);
          $('#modal-window').css('display', 'none');
          $('#new_item').css('display', 'block');
          $('#result').append(html);
          $('#result').animate({ scrollTop: $("#result")[0].scrollHeight }, 1500);
        })

        .fail(function () {
          alert('投稿に失敗しました');
        })

        .always(function () {
          $('#item_button').prop("disabled", false);
          $('#item_form')[0].reset();
        })
    })

    // 削除時の非同期処理
    $(document).on('click', '.delete_item', function (e) {
      e.preventDefault();
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
          $("#item-" + data.delete_id).remove();
        })

        .fail(function () {
          alert('削除にに失敗しました');
        })
    });

    // 編集ボタンを押したときのプリセット処理とモーダルウィンドウ表示
    $(document).on('click', '.edit_item', function (e) {
      e.preventDefault();
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
      let edit_description = $("p[data-description=" + edit_id + "]").text();

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
      $('.item-skin').removeClass('active');
      $(".item-skin-" + edit_color).addClass('active');
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

          update_id.attr('id', 'item-' + data.id + '-remove');
          $('#modal-window').css('display', 'none');
          $('#new_item').css('display', 'block');
          $('#item-' + data.id + '-remove').after(html);
          $('#item-' + data.id + '-remove').remove();
          $('#result').animate({ scrollTop: update_id.scrollHeight }, 1500);
        })

        .fail(function () {
          alert('投稿に失敗しました');
        })

        .always(function () {
          $('#item_button').prop("disabled", false);
          $('#item_form_edit')[0].reset();
        })
    })
  });
});