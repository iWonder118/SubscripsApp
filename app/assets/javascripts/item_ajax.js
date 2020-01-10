$(function(){
  function buildHTML(item){
    let html = `<li> 
                  <p>
                    ${item.id}
                    ${item.title}
                    ${item.link}
                    ${item.color}
                    ${item.price}
                    ${item.private}
                    ${item.period_long}
                    ${item.period_unit}
                    ${item.first_payment}
                    ${item.description}
                  </p>
                </li>`
    return html;
  }

  // 作成時の非同期処理
  $('#new_item').submit(function(e){
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
      $('#new_item')[0].reset();
    })
    return false; 
  })
  // 削除時の非同期処理
  $('.delete_item').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    let url = $(this).attr('href');
    let delete_id = $(this)[0].dataset['delete'];

    $.ajax({
      url: url,
      type: 'DELETE',
      dataType: 'json',
      data: JSON.stringify({delete_id: delete_id}),

      success: function(res) {
        $("a[data-delete=" + delete_id + "]").parent().append( `<span>削除しました</span>`);
        $("a[data-delete=" + delete_id + "]").remove();
        $("p[data-delete-p=" + delete_id + "]").remove();
        return false;
      },

      error: function(res) {
        return false;
      }
    })
  });
});