'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Offcanvas Menu
    $(".canvas-open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".canvas-close, .offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
    $(".hero-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false
    });

    /*------------------------
		Testimonial Slider
    ----------------------- */
    $(".testimonial-slider").owlCarousel({
        items: 1,
        dots: false,
        autoplay: true,
        loop: true,
        smartSpeed: 1200,
        nav: true,
        navText: ["<i class='arrow_left'></i>", "<i class='arrow_right'></i>"]
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
		Date Picker
	--------------------*/
    $(".date-input").datepicker({
        minDate: 0,
        dateFormat: 'dd MM, yy'
    });

    /*------------------
		Nice Select
	--------------------*/
    $("select").niceSelect();

})(jQuery);

function listenForm() {
    const formElement = document.getElementById('form'); // извлекаем элемент формы
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(formElement); // создаём объект FormData, передаём в него элемент формы
        // теперь можно извлечь данные
        const name = formData.get('name');
        const surname = formData.get('surname');
        const phone = formData.get('phone');
        const notes = formData.get('notes');
        sendTelegram(name, surname, phone, notes);
        e.target.reset();


    });
}

function sendTelegram(clientName, surname, phone, notes="-") {

    var data = "У вас новая заявка с сайта:\n Imię: "+ clientName + ",\n Nazwisko: " + surname + ",\n Telefon: " + phone + ",\n Uwagi: " + notes
        + "\nНе забудь отметить"
    if(phone.length > 0) {
        return $.ajax({
            type: "POST",
            url: "https://api.telegram.org/bot6379152979:AAElV7Za4ALK1oeTITaAqAahrdcsGRjjSX4/sendMessage?chat_id=-1001976855282",
            data: "parse_mode=HTML&text=" + encodeURIComponent(data),

        })
    }
}
