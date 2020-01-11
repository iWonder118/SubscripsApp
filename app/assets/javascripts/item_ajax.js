$(function(){
  function buildHTML(item){
    let html = `<li data-delete-li="${item.id}"> 
                  <p>
                    ${item.title}
                  </p>
                  <p>
                    ${item.link}
                  </p>
                  <p>
                    ${item.color}
                  </p>
                  <p>
                    ${item.price}
                  </p>
                  <p>
                    ${item.private}
                  </p>
                  <p>
                    ${item.period_long}
                  </p>
                  <p>
                    ${item.period_unit}
                  </p>
                  <p>
                    ${item.first_payment}
                  </p>
                  <p>
                    ${item.description}
                  </p>
                  <a class="edit_item" href="/users/${item.uid}/items/${item.id}/edit">編集</a>
                  <a class="delete_item" data-delete="${item.id}" rel="nofollow" data-method="delete" href="/users/${item.uid}/items/${item.id}">削除</a>
                </li>`
    return html;
  }

  let InlineEdit;
  let values = {
    id: "",
    content: "",
  }

  function reBuildHTML(item) {
    let html = `<div class="content__message__box"><p class="lower-message__content">${ item.content }</p></div>`

  InlineEdit.removeClass('InlineEdit-active').empty().append(html);
  }

  // 作成時の非同期処理
  $(document).on('submit', '#new_item', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');

    jqxhr = $.ajax({
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
      $('#new_item')[0].reset();
    })
    return false; 
  })

  // 削除時の非同期処理
  $(document).on('click', '.delete_item', function(e, xhr){
    e.preventDefault();
    let url = $(this).attr('href');
    let delete_id = $(this)[0].dataset['delete'];

    jqxhr = $.ajax({
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

    .done(function(){
      $("li[data-delete-li=" + delete_id + "]").remove();
    })

    .fail(function(){
      alert('削除にに失敗しました');
    })
    return false;
  });
});