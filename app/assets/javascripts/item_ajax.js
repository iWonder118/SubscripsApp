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
                    <p data-description="${item.id}">
                      ${item.description}
                    </p>
                    <a class="edit_item" href="/users/${item.uid}/items/${item.id}/edit">編集</a>
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
      let url = $(this).attr('action');

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
      let url = $(this).attr('href');
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
      let url = $(this).attr('href');
      let edit_id = $(this)[0].dataset['edit'];

      edit_id
    });
  });
});