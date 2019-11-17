$(function(){
  $('.group__chat__post__form').on("submit", function(e){
    e.preventDefault();
    console.log("ちゃんと発火してるよ！！");// console.logを用いてイベント発火しているか確認
  })
})