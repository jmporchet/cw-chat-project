class Message {
  constructor (author, content, timestamp) {
    this.author = author;
    this.content = content;
    this.timestamp = timestamp;
  }

  buildDiv () {
    let $msgDiv = $('<div></div>');
    $msgDiv.addClass('box msg');
    let $msgContent = $('<div class="msg-content"></div>');
    $msgContent.text(this.content);
    $msgDiv.append($msgContent);
    let $msgInfo =  $('<div></div>');
    $msgInfo.addClass('msg-info');
    let $msgAuthor =  $('<div></div>');
    $msgAuthor.text(this.author);
    $msgAuthor.addClass('msg-author');
    let $msgTs =  $('<div></div>');
    $msgTs.text(moment(this.timestamp).format('LT'));
    $msgTs.addClass('time');
    $msgInfo.append($msgAuthor, $msgTs);
    $msgDiv.append($msgInfo);
    return $msgDiv;
  }

}

class Chat {
  constructor () {
    this.messages = [];
  }

  sendMessage (message, author = 'You') {
    const msg = new Message(author,message,Date.now());
    $('#message-container').append(msg.buildDiv().attr('id', 'msg-' + this.messages.length));
    if (author === 'You') {
      $('#msg-' + this.messages.length).addClass('me');
    } else {
      $('#msg-' + this.messages.length).addClass('someone-else');
    }
    var elem = document.getElementById('data');
    $('#message-container').animate({ scrollTop: $('#message-container').prop('scrollHeight')}, 1000);
    this.messages.push(msg);
  }

  getMessages () {

  }
}


$(document).ready(function () {
  chat = new Chat();
  chat.sendMessage('sup Don');

  $('#submit').click(function (e) {
    let content = $('#content').val();
    //   // console.log(JSON.stringify(postData));
    e.preventDefault();
    $.post('http://localhost:3000/messages', {'content': content, 'author': 'Me'});
    chat.sendMessage(content);
  });

  setInterval( function () {
    try {
      $.ajax('http://quotes.stormconsultancy.co.uk/random.json', {
        success: function (data) {
          $.post('http://localhost:3000/messages', {'content': data.quote, 'author': data.author});
          chat.sendMessage(data.author,data.quote);
        },
        dataType: 'jsonp'
      });
    } catch (e) {
      // console.log('Oops:',e);
    }
  }, Math.random() * (15000 - 5000) + 5000);
});
