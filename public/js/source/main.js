(function(){
  'use strict';

  $(document).ready(init);

  var currentUser = 0;
  var currentRoll = 3;
  var frozen;
  var numDice;

  function init(){
    $('#add').click(add);
    $('.arrow').click(arrow);
    $('body').keydown(move);
    $('#add-score').click(addScore);
    $('#roll').click(roll);
    $('.dice').click(freeze);

    numDice =$('.dice').length;
    frozen = $('.frozen').length;
  }

  function freeze() {
    $(this).toggleClass('frozen');
  }


  function roll(){
    var $dice = $('.dice:not(.frozen)');
    var count = $dice.length;


    for(var i = 0; i < count; i++){
      var num = Math.floor(Math.random() *6) + 1;
      var dice = $dice[i];
    $(dice).attr('src', './media/dice' + num + '.png');
  }
}

  function addScore(event){
    var score = $('#score').val();
    $('.horizontal .vertical').text(score);
    event.preventDefault();
  }

  function move(event){
    switch(event.keyCode){
      case 38:
        currentUser--;
        break;
      case 40:
        currentUser++;
        break;
      case 37:
        currentRoll--;
        break;
      case 39:
        currentRoll++;
    }

    paintScreen();

    if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
      event.preventDefault();
    }
  }

  function arrow(){
    switch(this.id){
      case 'up':
        currentUser--;
        break;
      case 'down':
        currentUser++;
        break;
      case 'left':
        currentRoll--;
        break;
      case 'right':
        currentRoll++;
    }

    paintScreen();
  }

  function paintScreen(){
    $('.horizontal').removeClass();
    $('.vertical').removeClass();

    var $trs = $('#game > tbody > tr');
    var tr = $trs[currentUser];
    $(tr).addClass('horizontal');

    $('#game > tbody > tr > td:nth-child('+ currentRoll +')').addClass('vertical');
  }

  function add(event){
    var username = $('#username').val();
    var avatar = $('#avatar').val();
    createRow(username, avatar);
    event.preventDefault();
  }

  function createRow(username, avatar){
    var $tr = $('<tr>');
    var tds = [];

    for(var i = 0; i < 16; i++){
      tds.push('<td></td>');
    }

    $tr.append(tds);
    $('#game > tbody').append($tr);

    var count = $('#game > tbody > tr').length;
    if(count === 1){
      $tr.addClass('horizontal');
    }

    var $img = $('<img>');
    $img.addClass('avatar');
    $img.attr('src', avatar);

    $tr.children('td:nth-child(1)').append($img);
    $tr.children('td:nth-child(2)').text(username);
    $tr.children('td:nth-child(3)').addClass('vertical');
  }
})();