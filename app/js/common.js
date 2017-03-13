$(function() {

	$(".owl-carousel").owlCarousel({
		items : 1,
		nav : true,
		navText : "",
		loop : true,
		autoplay : true,
		autoplayHoverPause : true,
		fluidSpeed : 600,
		autoplaySpeed : 600,
		navSpeed : 600,
		dotsSpeed : 600,
		dragEndSpeed : 600
	});

	 $(".js-nav a").on("click", function(e){
        e.preventDefault();
        var currentBlock = $(this).attr("href"),
            currentBlockOffset = $(currentBlock).offset().top;

        $("html, body").animate({
            scrollTop: currentBlockOffset
        }, 500);
    });

	var menuIsOpen=false,
		$menu=$(".menu"),
		$menuItem=$(".menu-item"),
		$menuBg=$(".menu-bg"),
		$menuToggle=$(".menu-toggle"),

		menuWidth=300,
		menuItemOffset=150,
		menuBgSkew=-10,
		timeScale={v:1}
	;
	TweenMax.globalTimeScale(timeScale.v);

	TweenMax.set($menuItem,{
		x:-menuItemOffset
	});
	TweenMax.set($menuBg,{
		skewX:menuBgSkew
	})
	function setTimescale(v){
		TweenMax.to(timeScale,0.5,{
			v:v,
			ease:Quad.easeInOut,
			onUpdate:updateTimescale,
			onComplete:updateTimescale
		});
	}
	function updateTimescale(){
		TweenMax.globalTimeScale(timeScale.v);
	}
	
	function openMenu(){
		menuIsOpen=true;
		TweenMax.to($menu,0.55,{
			x:menuWidth,
			force3D:false,
			ease:Elastic.easeOut,
			easeParams:[1.01,0.8]
		});
		TweenMax.to($menuBg,0.55,{
			skewX:0,
			force3D:false,
			ease:Elastic.easeOut,
			easeParams:[1.01,0.8]
		});
		$menuItem.each(function(i){
			TweenMax.to($(this),0.7+(i*0.05),{
				delay:0.02*i,
				x:0,
				force3D:false,
				// ease:Quint.easeOut
				ease:Elastic.easeOut,
				easeParams:[1.1,0.6]
			});
		});
	}
	function closeMenu(){
		menuIsOpen=false;
		TweenMax.to($menu,0.2,{
			x:-100,
			ease:Quad.easeIn,
			force3D:false
		});
		TweenMax.set($menuBg,{
			delay:0.2,
			skewX:menuBgSkew,
			force3D:false
		});
		$menuItem.each(function(i){
			TweenMax.to($(this),0.3+(0.05*i),{
				x:-menuItemOffset,
				ease:Quad.easeIn,
				force3D:false
			});
		});
		
	}
	function toggleMenu(){
		if(menuIsOpen){
			$menuToggle.removeClass('menu-open');
			closeMenu();
		}else{
			$menuToggle.addClass('menu-open');
			openMenu();
		}
	}
	$menuToggle.click(function(){
		toggleMenu();
	});
	$(".loader").fadeOut();

});
