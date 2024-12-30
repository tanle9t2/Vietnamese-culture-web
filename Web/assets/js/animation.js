$(function() {
    $(window).scroll(function() {
        if($(this).scrollTop()) {
            $('#backtop').fadeIn() 
            $('#backtop').css("display","flex")
        }
        else {
            $('#backtop').fadeOut()
        }
    })
    $('#backtop').click(function() {
        $('html').animate({
            scrollTop:0
        },1000)
    })
})