$(document).on('turbolinks:load', function () {
  $(function () {
    function buildHTML(item) {
      let html = `<li id="item-${item.id}"> 
                    <p data-title="${item.id}">${item.title}</p>
                    <p data-link="${item.id}">${item.link}</p>
                    <p data-color="${item.id}">${item.color}</p>
                    <p data-plan="${item.id}">${item.plan}</p>
                    <p data-price="${item.id}">${item.price}</p>
                    <p data-release="${item.id}">${item.release}</p>
                    <p data-period_long="${item.id}">${item.period_long}</p>
                    <p data-period_unit="${item.id}">${item.period_unit}</p>
                    <p data-first_payment="${item.id}">${item.first_payment}</p>
                    <p data-pay_method="${item.id}">${item.pay_method}</p>
                    <p data-description="${item.id}">${item.description}</p>
                    <a class="edit_item" data-edit="${item.id}" href="/users/${item.uid}/items/${item.id}">編集</a>
                    <a class="delete_item" data-delete="${item.id}" href="/users/${item.uid}/items/${item.id}">削除</a>
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