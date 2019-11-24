$(function(){
  function buildHTML(message){
    var image = message.image ? `<img class:'group__contents__message__image' src=${message.image}>` : ''
      var html = `<div class="group__contents__info">
                    <div class="group__contents__info__who">
                      ${message.name}
                    </div>
                    <div class="group__contents__info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="group__contents__message">
                    ${image}
                    <div class="group__contents__message__body">
                      ${message.body}
                    </div>
                  </div>`
      return html;
    }
  $('#new_message').on('submit', function(e){
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
    .done(function(message){
      var html = buildHTML(message);
      $('.group__contents').append(html);
      $('.group__contents').animate({ scrollTop: $('.group__contents')[0].scrollHeight});
      $('.group__post__form__btn').prop('disabled', false);
      $('#new_message')[0].reset()
    })
    .fail(function() {
      alert("メッセージまたは画像をつけてください。");
      $('.group__post__form__btn').prop('disabled', false)
    });
  })
})