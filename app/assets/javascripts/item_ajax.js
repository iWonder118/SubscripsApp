$(document).on('turbolinks:load', function(){
  $(function(){
    function buildHTML(item){
      let html = `<li data-delete-li="${item.id}"> 
                    <p data-title="${item.id}">
                      ${item.title}
                    </p>
                    <p data-link="${item.id}">
                      ${item.link}
                    </p>
                    <p data-color="${item.id}">
                      ${item.color}
                    </p>
                    <p data-plan="${item.id}">
                      ${item.plan}
                    </p>
                    <p data-price="${item.id}">
                      ${item.price}
                    </p>
                    <p data-private="${item.id}">
                      ${item.private}
                    </p>
                    <p data-period_long="${item.id}">
                      ${item.period_long}
                    </p>
                    <p data-period_unit="${item.id}">
                      ${item.period_unit}
                    </p>
                    <p data-first_payment="${item.id}">
                      ${item.first_payment}
                    </p>
                    <p data-pay_method="${item.id}">
                      ${item.pay_method}
                    </p>
                    <p data-description="${item.id}">
                      ${item.description}
                    </p>
                    <a class="edit_item" data-delete="${item.id}" href="/users/${item.uid}/items/${item.id}">編集</a>
                    <a class="delete_item" data-delete="${item.id}" href="/users/${item.uid}/items/${item.id}">削除</a>
                  </li>`
      return html;
    }
    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
      let token;
      if (!options.crossDomain) {
        token = $('meta[name="csrf-token"]').attr('content');
        if (token) {
            return jqXHR.setRequestHeader('X-CSRF-Token', token);
        }
      }
    });
    // 作成時の非同期処理
    $(document).on('submit', '#item_form', function(e){
      e.preventDefault();
      let formData = new FormData(this);
      let url      = $(this).attr('action');
      
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      

      .done(function(data){
        let html = buildHTML(data);
        $('#result').append(html);
        $('#result').animate({ scrollTop: $("#result")[0].scrollHeight }, 1500);
      })

      .fail(function(){
        alert('投稿に失敗しました');
      })

      .always(function () {
        $('#new_item_btn').prop("disabled", false);
        $('#item_form')[0].reset();
      })
      return false; 
    })

    // 削除時の非同期処理
    $(document).on('click', '.delete_item', function(e){
      e.preventDefault();
      let url       = $(this).attr('href');
      let delete_id = $(this)[0].dataset['delete'];

      $.ajax({
        url: url,
        type: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({delete_id: delete_id}),
        dataType: 'json',
        processData: false,
        contentType: false
      })

      .done(function(data){
        $("li[data-delete-li=" + data.delete_id + "]").remove();
      })

      .fail(function(){
        alert('削除にに失敗しました');
      })
      return false;
    });

    // 編集時の非同期処理
    $(document).on('click', '.edit_item', function(e){
      e.preventDefault();
      let url                   = $(this).attr('href');
      let edit_id               = $(this)[0].dataset['edit'];
      let edit_title            = $("p[data-title=" + edit_id + "]").text();
      let edit_link             = $("p[data-link=" + edit_id + "]").text();
      let edit_color            = $("p[data-color=" + edit_id + "]").text();
      let edit_plan             = $("p[data-plan=" + edit_id + "]").text();
      let edit_price            = $("p[data-price=" + edit_id + "]").text();
      let edit_private          = $("p[data-private=" + edit_id + "]").text();
      let edit_period_long      = $("p[data-period_long=" + edit_id + "]").text();
      let edit_period_unit      = Number($("p[data-period_unit=" + edit_id + "]").text());
      let edit_first_payment    = $("p[data-first_payment=" + edit_id + "]").text().match(/(\d+)-(\d+)-(\d+)/);
      let edit_pay_method       = $("p[data-pay_method=" + edit_id + "]").text();
      let edit_description      = $("p[data-description=" + edit_id + "]").text();
      console.log(edit_private);
      $("#item_title").val(edit_title);
      $("#item_link").val(edit_link);
      $("#item_color").val(edit_color);
      $("#item_plan").val(edit_plan);
      $("#item_price").val(edit_price);
      $("#item_private").prop("checked", edit_private);
      $("#item_payment_attributes_period_long").val(edit_period_long);
      $("#item_payment_attributes_period_unit").val(edit_period_unit);
      $("#item_payment_attributes_first_payment").val(edit_first_payment[0]);
      $("#item_payment_attributes_pay_method").val(edit_pay_method);
      $("#item_payment_attributes_description").val(edit_description);
      $("new_item_btn").val("変更する")
    });


  });
});