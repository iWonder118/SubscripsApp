$(function(){
  function buildHTML(item){
    var html = `<li> 
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

  $('#new_item').submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    

    .done(function(data){
      var html = buildHTML(data);
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
});