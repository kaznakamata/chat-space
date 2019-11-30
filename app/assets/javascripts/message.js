$(function(){
  var buildHTML = function(message) {
      var image = message.image ? `<img class="group__contents__message__body__image" src="${message.image}">` : '' ;
      var message_message = message.body ? `<div class="group__contents__message__body__text">
                                              ${message.body}
                                            </div>` : '' ;  
      var html = `<div class="group__contents__message" data-message-id="${message.id}">
                    <div class="group__contents__message__info">
                      <div class="group__contents__message__info__who">
                        ${message.name}
                      </div>
                      <div class="group__contents__message__info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="group__contents__message__body">
                      ${image}
                      ${message_message}
                    </div>
                  </div>`
      return html;
  }
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){ 
      var last_message_id = $(".group__contents__message:last").data('message-id');
      $.ajax({
        url: location.href.replace(/messages/,'api/messages'),
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = ``;
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.group__contents').append(insertHTML);
        if (insertHTML) {
          $('.group__contents').animate({ scrollTop: $('.group__contents')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
    }
  };
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
  });
  setInterval(reloadMessages, 7000);
});