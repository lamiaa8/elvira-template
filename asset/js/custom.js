"use strict";
var custom_js = {
	init: function () {
		$('.introduce1').on('click', function () {
			$('.introduce').css('right', '0');
		});
		$('.search-header1').on('click', function () {
			$('.search-header').css('display', 'block');
			$('.header-right').css('display', 'none');
		})
		$('.close-introduce').on('click', function () {
			$('.introduce').css('right', '-700px');
		})
		$('.close-search').on('click', function () {
			$('.search-header').css('display', 'none');
			$('.header-right').css('display', 'block');
		})
		$('.lost-password').on('click', function () {
			$('.content-my-account-right').css('display', 'none');
			$('.content-my-account-left').css('display', 'none');
			$('.form-lost-password').css('display', 'block');
		})
		$('.reset-password').on('click', function () {
			$('.content-my-account-right').css('display', 'block');
			$('.content-my-account-left').css('display', 'block');
			$('.form-lost-password').css('display', 'none');
		})
		//click header mobile
		$('.click-mobile').on('click', function () {
			if ($('.click-mobile').hasClass('lnr-menu')) {
				$('.click-mobile').addClass('lnr-cross');
				$('.click-mobile').removeClass('lnr-menu');
				$('.menu-mobile').slideToggle(200, 'linear');

			} else {
				$('.click-mobile').addClass('lnr-menu');
				$('.click-mobile').removeClass('lnr-cross');
				$('.menu-mobile').slideToggle(200, 'linear');
			}
		})

		



		$('.drop-link').on('click', function (e) {
			$(this).siblings('.drop-menu').slideToggle(200, 'linear');
			$(this).toggleClass('clicked');
			e.stopPropagation();
		});

		// payment
		$('.showpayment').on('click', function (e) {
			$(this).parent().toggleClass('active')
		})


		//select product
		$('.prev').on('click', function (e) {
			e.stopImmediatePropagation();
			var btn_group_parent = $(this).closest('.btn-group');
			var number = 0;
			var show_number = btn_group_parent.find('.show-number');
			var a = show_number.text();
			a = parseInt(a);
			if (a > 1) {
				number = a - 1;
			}
			else {
				number = 1;
			}
			show_number.text(number);

		});

		$('.next').on('click', function (e) {
			e.stopImmediatePropagation();
			var btn_group_parent = $(this).closest('.btn-group');
			var number = 0;
			var show_number = btn_group_parent.find('.show-number');
			var a = show_number.text();
			a = parseInt(a);
			if (a > 0) {
				number = a + 1;
			}
			show_number.text(number);
		});


		// share
		$('.share').on('click', function (e) {
			$(this).parent().toggleClass('active')
		})


		// check out page
		$(".woocommerce-form-login").hide();
		$(".showlogin").on('click', function () {
			$(".woocommerce-form-login").slideToggle();
		});

		$(".checkout_coupon").hide();
		$(".showcoupon").on('click', function () {
			$(".checkout_coupon").slideToggle();
		});

	},



	generateCarousel: function () {
		if ($().owlCarousel) {
			$('.owl-carousel').owlCarousel({
				loop      : true,
				margin    : 10,
				nav       : false,
				responsive: {
					0   : {
						items: 1
					},
					600 : {
						items: 3
					},
					1000: {
						items: 5
					}
				}
			})
		}
	},

	singleSlider    : function () {
		if ($().flexslider) {
			$('#carousel').flexslider({
				animation    : "slide",
				controlNav   : false,
				animationLoop: false,
				slideshow    : false,
				itemWidth    : 120,
				itemMargin   : 20,
				asNavFor     : '#slider',
				directionNav : true,             //Boolean: Create navigation for previous/next navigation? (true/false)
				prevText     : "",           //String: Set the text for the "previous" directionNav item
				nextText     : ""               //String: Set the text for the "next" directionNav item
			});
			$('#slider').flexslider({
				animation    : "slide",
				controlNav   : false,
				animationLoop: false,
				slideshow    : false,
				sync         : "#carousel",
				directionNav : false,             //Boolean: Create navigation for previous/next navigation? (true/false)
				start        : function (slider) {
					$('body').removeClass('loading');
				}
			});
			$('#flex-slider').flexslider({
				animation: "slide",
				controlNav: false,
				animationLoop: false,
				slideshow: false,
				sync: "#flex-carousel"
			});
			$('#flex-carousel').flexslider({
				animation: "slide",
				controlNav: false,
				animationLoop: false,
				slideshow: false,
				itemWidth: 114,
				itemMargin: 20,
				asNavFor: '#flex-slider'
			});
		}
	}
};

$(document).ready(function () {
	custom_js.init();
	custom_js.generateCarousel();
	custom_js.singleSlider();

});


// Set the date we're counting down to
var countDownDate =  new Date(Date.parse(new Date()) + 6 * 24 * 60 * 60 * 1000);

// Update the count down every 1 second
var x = setInterval(function () {

	// Get todays date and time
	var now = new Date().getTime();

	// Find the distance between now and the count down date
	var distance = countDownDate - now;

	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);


	// Display the result in the element with id="demo"


	var dealday = document.getElementById('dealday');
	if (dealday != null) {
		document.getElementById("dealdays").innerHTML = days;
		document.getElementById("dealhours").innerHTML = hours;
		document.getElementById("dealminutes").innerHTML = minutes;
		document.getElementById("dealseconds").innerHTML = seconds;
		// If the count down is finished, write some text
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("dealday").innerHTML = "EXPIRED";
		}
	}
}, 1000);
let arrow_top = document.getElementById("arrow_top")
let header = document.getElementById("Header");

window.onscroll = function() {


	if(scrollY >= 200) {
        header.classList.add("sticky-header")
    }
	else{
		header.classList.remove("sticky-header")
	}

    if(scrollY >= 400) {
        arrow_top.style.opacity = "1"
		arrow_top.style.visibility = "visible"
		header.classList.add("showNavScllor")
    }
    else 
    {
        arrow_top.style.opacity = "0"
		arrow_top.style.visibility = "hidden"
		header.classList.remove("showNavScllor")

    }
}
arrow_top.addEventListener("click" , function(){
    window.scroll({
        top: 0 ,
        left : 0 ,
        behavior : "smooth"
    })
})
$(document).ready(function(){

	$(".loading").fadeOut(2000 , function(){
		$("body").css("overflow" , "auto")
	})
})
