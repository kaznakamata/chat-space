$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="group__chat__contents__info">
                    <div class="group__chat__contents__info__who">
                      ${message.user_id}
                    </div>
                    <div class="group__chat__contents__info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="group__chat__contents__message">
                      ${message.body}
                      <img src="${message.image}">
                  </div>`//メッセージに画像が含まれる場合のHTMLを作る
    } else {
      var html = `<div class="group__chat__contents__info">
                    <div class="group__chat__contents__info__who">
                      ${message.user_id}
                    </div>
                    <div class="group__chat__contents__info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="group__chat__contents__message">
                      ${message.body}
                  </div>
      `//メッセージに画像が含まれない場合のHTMLを作る
    }
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.group__chat').append(html);
      console.log('どうなったかな');
    })
    .fail(function(){
      alert('error');
    })
  })
})