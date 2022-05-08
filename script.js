// 漢堡開啟的JQuery
$(document).ready(function () {

  $('#ham').click(function () {
    $('.block-1').toggle(300);
  })
})

// 這是放大鏡效果的JS寫法
function zoom_in(e){
  // console.log(e);
  let overlay_el = document.getElementById("overlay");
  let img_zoom_el = document.getElementById("img_zoom");
  
  if (overlay_el.style.backgroundImage == "") {
    overlay_el.style.backgroundImage = `url("${img_zoom_el.src}")`;
  }

  overlay_el.style.backgroundPosition = `${overlay_el.clientWidth / 2 - e.offsetX * 2}px ${overlay_el.clientHeight / 2 - e.offsetY * 2}px`;

  overlay_el.classList.add("-on");
  overlay_el.style.left = e.offsetX + "px";
  overlay_el.style.top = e.offsetY + "px";
}

function zoom_out() {
  document.getElementById("overlay").classList.remove("-on");
}

function zoom_event() {
  let img_zoom_el = document.getElementById("img_zoom");

  img_zoom_el.removeEventListener("mousemove", zoom_in);
  img_zoom_el.removeEventListener("mouseout", zoom_out);
  if (window.innerWidth >= 768) {
      img_zoom_el.addEventListener("mousemove", zoom_in);
      img_zoom_el.addEventListener("mouseout", zoom_out);
  }

}

window.addEventListener("load", function () {
  zoom_event();
});

window.addEventListener("resize", function () {
  zoom_event();
});


// 置頂按鈕的js寫法(list頁面部分)
$(function(){
  var blockA = $('.tea-list1').offset().top;
  var blockB = $('.tea-list2').offset().top;
  var blockC = $('.tea-list3').offset().top;

  $('.scroll-1').click(function() {
    $('html,body').animate({scrollTop: blockA}, 500)
    return false;
  })

  $('.scroll-2').click(function() {
    $('html,body').animate({scrollTop: blockB}, 500)
    return false;
  })

  $('.scroll-3').click(function() {
    $('html,body').animate({scrollTop: blockC}, 500)
    return false;
  })

  $('.toTop').click(function(){
    $('html,body').animate({scrollTop:0}, 500)
    return false
  })
})



// 其他頁面的置頂按鈕
$(function(){
  $('.toTop').click(function(){
    $('html,body').animate({scrollTop:0}, 500)
    return false
  })
})
// 捲動整個網頁，要用html和body，不是用window，因為這兩項標籤是網頁的最外層。
// 由於jq特效是動畫，所以寫上animate({},1000)  1000代表一秒的時間
// scrolltop是動畫屬性，值得議題得是該屬性不在css內
// scrolltop:100，表示移動到100的位置，200表示移動到200的位置。


AOS.init();



// 圖片輪播的jquery
$(function () {
  let divWidth = $('#sliderBoard').width();
  let imgCount = $('#content li').length;  

  for(let i = 0; i < imgCount; i++){
      $('#contentButton').append('<li></li>')
  }
  $('#contentButton li:nth-child(1)').addClass('clickMe')

  $('#content').width(divWidth * imgCount)
  $('#content li').width(divWidth)

  let index;
  $('#contentButton li').click(function(){
      // alert($(this).index())
      index = $(this).index()

      $('#content').animate({
          left: divWidth * index * -1,
      })

      $(this).addClass('clickMe')
      $('#contentButton li').not(this).removeClass('clickMe')
  })
});

