$(function () {
    "use strict";
    TplEventGeneral.init();
});
const TplEventGeneral = {
    init: function () {
        Main_Event.init();
        Index_Event.init();
        Order_Event.init();
        Product_Event.init();
        Album_Event.init();
        News_Event.init();
        User_Event.init();
        Map_Event.init();
    },
};

const Main_Event = {
    init: function () {
        this.header_mobile();
        this.progress_Bar();
        this.navMenu_Tab();
    }, header_mobile: function () {
        $(".header_tim_kiem .search-bar input.input-group-field, .search-mobile .search-bar input.input-group-field").focus(function (eventClick) {
            eventClick.stopPropagation();
            $(".search-suggest").addClass("open");
        });
        $(document).click(function (eventClick) {
            if (!$(eventClick.target).closest(".header_tim_kiem .search-bar, .search-mobile .search-bar").length) {
                $(".search-suggest").removeClass("open");
            }
        });
    }, progress_Bar: function () {
        let progressBarInterval;

        function initProgressBar() {
            const progressBar = document.querySelector(".progress-bar__inner");
            if (progressBar) {
                progressBar.style.width = "0%";
            }
        }

        function startProgressBar() {
            const progressBar = document.querySelector(".progress-bar__inner");
            if (progressBar) {
                const duration = 8000; // Thời gian chạy của slider
                clearInterval(progressBarInterval); // Đảm bảo không có interval nào chạy trước đó
                progressBarInterval = setInterval(function () {
                    let progress = parseFloat(progressBar.style.width) || 0;
                    progress += (100 / duration) * (1000 / 60);
                    progressBar.style.width = Math.min(progress, 100) + "%";
                    if (progress >= 100) {
                        clearInterval(progressBarInterval);
                    }
                }, 1000 / 60);
            }
        }

        function resetProgressBar() {
            clearInterval(progressBarInterval);
            initProgressBar();
            startProgressBar();
        }

        function checkSliderPresence() {
            return document.querySelector(".slick-wiper") !== null;
        }

        if (checkSliderPresence()) {
            $(".slick-wiper").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
                resetProgressBar();
            });

            $(".slick-wiper").on("afterChange", function (event, slick, currentSlide) {
                startProgressBar();
            });

            startProgressBar();
        }
    }, navMenu_Tab: function () {
        $(".header-menu .title_menu .close-mb-menu").on("click", function () {
            $(this).closest(".header-menu").removeClass("current");
            $(".mobile-nav-overflow").toggleClass("open");
        });
        $(".mobile-nav-overflow").on("click", function () {
            $(".header-menu").removeClass("current");
            $(this).toggleClass("open");
        });

        $(".menu-bar").on("click", function () {
            $(".opacity_menu").addClass("current");
        });
        $(".opacity_menu").on("click", function () {
            $(".opacity_menu").removeClass("current");
        });
        $(".header-action-item.search-mobile").click(function (e) {
            e.preventDefault();
            $(".search-mobile.search_form").toggleClass("open");
        });
        $(".input-group-btn .search-close").click(function (e) {
            e.preventDefault();
            $(".search-mobile.search_form").toggleClass("open");
        });

        $("#btn-menu-mobile").on("click", function () {
            var template_nav_cate = $('script[data-template="header_nav_cate"]').html();
            if (template_nav_cate) {
                $('div[data-section="header_nav_cate"]').html(template_nav_cate);
            }
            $('script[data-template="header_nav"]').each(function () {
                var template_nav = $(this).html();
                var section = $(this).closest('li[data-section="header_nav"]');
                if (template_nav) {
                    $(this).replaceWith(template_nav);
                }
            });

            $("#nav li > .open_mnu")
                .off()
                .click(function (e) {
                    $(this).closest("li").find("> .dropdown-menu").slideToggle("fast");
                    $(this).closest("li").toggleClass("current");
                    $(this).closest("li").find("> .dropdown-menu").toggleClass("current");
                    $(this).toggleClass("current");
                    return false;
                });
            $(".sudes-main-cate li > .open_mnu")
                .off()
                .click(function (e) {
                    $(this).closest("li").find("> .menu-child").slideToggle("fast");
                    $(this).closest("li").toggleClass("current");
                    $(this).closest("li").find("> .menu-child").toggleClass("current");
                    $(this).toggleClass("current");
                    return false;
                });
            $(".header-menu").addClass("current");
            $(".mobile-nav-overflow").toggleClass("open");
        });

        const header = document.querySelector("header.header");
        let headerHeight = header ? header.offsetHeight : 0;
        let resizeWindow = window.innerWidth;
        let offsetStickyHeader = header ? header.offsetHeight : 0;
        let offsetStickyDown = 0;
        let resizeTimer;

        const tabLinks = document.querySelectorAll(".tab-link");
        const tabContents = document.querySelectorAll(".tab-content-mb");

        const handleResize = () => {
            if (resizeTimer) clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                const newWidth = window.innerWidth;

                if (header && resizeWindow !== newWidth) {
                    header.classList.remove("hSticky");
                    header.style.minHeight = "";

                    headerHeight = header.offsetHeight;
                    header.style.minHeight = `${headerHeight}px`;

                    resizeWindow = newWidth;
                }
            }, 200);
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY;

            if (header) {
                if (scrollTop > offsetStickyHeader && scrollTop > offsetStickyDown) {
                    header.classList.add("hSticky");
                }

                if (scrollTop <= offsetStickyDown && scrollTop <= offsetStickyHeader) {
                    header.classList.remove("hSticky");
                }
            }

            offsetStickyDown = scrollTop;
        };

        const handleTabClick = (tabLink) => {
            const tabId = tabLink.dataset.tab;

            tabLinks.forEach((link) => link.classList.remove("active"));
            tabLink.classList.add("active");

            tabContents.forEach((tabContent) => tabContent.classList.remove("active"));
            document.getElementById(tabId).classList.add("active");
        };

        const initializeTabs = () => {
            if (window.innerWidth <= 991) {
                const tabMenu1 = document.getElementById("tab-menu-1");
                const tabLinkMenu1 = document.querySelector('.tab-link[data-tab="tab-menu-1"]');

                tabMenu1.classList.add("active");
                tabLinkMenu1.classList.add("active");

                tabLinks.forEach((tabLink) => {
                    tabLink.addEventListener("click", () => handleTabClick(tabLink));
                });
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        tabLinks.forEach((tabLink) => {
            tabLink.addEventListener("click", () => handleTabClick(tabLink));
        });
        document.addEventListener("DOMContentLoaded", initializeTabs);
    },
};
const Index_Event = {
    init: function () {
        this.slider_main();
        this.slider_product();
        this.slider_brand();
        this.fancy_Box();
    },

    slider_main: function () {
        if ($(".slick-wiper").length) {
            $(".slick-wiper").slick({
                lazyLoad: 'ondemand',
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 8000,
                dots: true,
                fade: true,
                arrows: true,
                prevArrow: '<div class=\'prev slick_arrow\'><svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '\t\t\t\t<rect x="2.13003" y="29" width="38" height="38" transform="rotate(-45 2.13003 29)" stroke="black" fill="#fff" stroke-width="2"></rect>\n' + '\t\t\t\t<rect x="8" y="29.2133" width="30" height="30" transform="rotate(-45 8 29.2133)" fill="black"></rect>\n' + '\t\t\t\t<path d="M18.5 29H39.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>\n' + '\t\t\t\t<path d="M29 18.5L39.5 29L29 39.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>\n' + "\t\t\t</svg></div>",
                nextArrow: '<div class="next slick_arrow"><svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '\t\t\t\t<rect x="2.13003" y="29" width="38" height="38" transform="rotate(-45 2.13003 29)" stroke="black" fill="#fff" stroke-width="2"></rect>\n' + '\t\t\t\t<rect x="8" y="29.2133" width="30" height="30" transform="rotate(-45 8 29.2133)" fill="black"></rect>\n' + '\t\t\t\t<path d="M18.5 29H39.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>\n' + '\t\t\t\t<path d="M29 18.5L39.5 29L29 39.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>\n' + "\t\t\t</svg></div>",
                responsive: [{
                    breakpoint: 768, settings: {
                        arrows: false,
                    },
                },],
            });
        }
    }, slider_product: function () {
        if ($(".slick-wrapper").length) {
            var $slider = $(".slick-wrapper");

            $slider.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: true,
                infinite: false,
                autoplay: false,
                variableWidth: true,
                prevArrow: '<div class=\'prev slick_arrow\'><svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '\t\t\t\t<rect x="2.13003" y="29" width="38" height="38" transform="rotate(-45 2.13003 29)" stroke="black" fill="#fff" stroke-width="2"></rect>\n' + '\t\t\t\t<rect x="8" y="29.2133" width="30" height="30" transform="rotate(-45 8 29.2133)" fill="black"></rect>\n' + '\t\t\t\t<path d="M18.5 29H39.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>\n' + '\t\t\t\t<path d="M29 18.5L39.5 29L29 39.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>\n' + "\t\t\t</svg></div>",
                nextArrow: '<div class="next slick_arrow"><svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '\t\t\t\t<rect x="2.13003" y="29" width="38" height="38" transform="rotate(-45 2.13003 29)" stroke="black" fill="#fff" stroke-width="2"></rect>\n' + '\t\t\t\t<rect x="8" y="29.2133" width="30" height="30" transform="rotate(-45 8 29.2133)" fill="black"></rect>\n' + '\t\t\t\t<path d="M18.5 29H39.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>\n' + '\t\t\t\t<path d="M29 18.5L39.5 29L29 39.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>\n' + "\t\t\t</svg></div>",
                responsive: [{
                    breakpoint: 768, settings: {
                        slidesToShow: 1, slidesToScroll: 1, variableWidth: true, arrows: false, centerMode: true,
                    },
                },],
            });
        }
    }, slider_brand: function () {
        if ($(".slick-wrapper-brands").length) {
            $(".slick-wrapper-brands").slick({
                slidesToShow: 8,
                slidesToScroll: 1,
                infinite: false,
                arrows: false,
                autoplay: false,
                swipeToSlide: true,
                touchThreshold: 5,
                responsive: [{
                    breakpoint: 768, settings: {
                        slidesToShow: 3, slidesToScroll: 1, variableWidth: true, arrows: false,
                    },
                },],
            });
        }
    }, fancy_Box: function () {
        if ($(".slick-container-top").length) {
            $(".slick-container-top").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: ".slick-container-thumb",
                arrows: false,
                fade: true,
                swipe: true,
                adaptiveHeight: true,
                infinite: false,
            });
        }

        if ($(".slick-container-thumb").length) {
            $(".slick-container-thumb").slick({
                slidesToShow: 5,
                slidesToScroll: 3,
                asNavFor: ".slick-container-top",
                focusOnSelect: true,
                vertical: true,
                verticalSwiping: true,
                arrows: false,
                swipe: true,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            vertical: false,
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            vertical: false,
                            slidesToShow: 2,
                        },
                    },
                ],
            });
        }

        Fancybox.bind(".slick-container-top a", {
            loop: true,
            buttons: ["zoom", "close", "next", "prev"],
            groupAll: true,
        });
    }
};
const Order_Event = {
    init: function () {
        this.copy_voucher()
    },
    copy_voucher: function () {
        $(document).on('click', '.js-copy', function (e) {
            e.preventDefault();

            var $this = $(this);
            var copyText = $this.closest('.box-coupon').find('.coupon-codes').text().trim();

            if (!copyText) {
                alert("Không tìm thấy mã coupon.");
                return;
            }

            var copyTextarea = document.createElement("textarea");
            copyTextarea.value = copyText;
            copyTextarea.style.position = "fixed";
            document.body.appendChild(copyTextarea);
            copyTextarea.select();

            var successful = false;
            try {
                successful = document.execCommand("copy");
            } catch (err) {
                console.error('Lỗi khi sao chép:', err);
            }

            document.body.removeChild(copyTextarea);

            if (successful) {
                var cur_text = $this.text();
                $this.addClass("iscopied").text("Đã lưu");
                setTimeout(function () {
                    $this.removeClass("iscopied").text(cur_text);
                }, 1500);
            } else {
                alert("Có lỗi xảy ra khi sao chép.");
            }
        });

        $('.info-button').click(function () {
            var code = $(this).attr('data-coupon'),
                time = $(this).attr('data-time'),
                decs = $(this).attr('data-desc');
            $('.popup-coupon .code').html(code);
            $('.popup-coupon .time').html(time);
            $('.popup-coupon .dieukien').html(decs);
            $('.popup-coupon, .body-backdrop').addClass('active');

        });
        $(document).on('click', '.body-backdrop, .close-popup-coupon', function () {
            $('.body-backdrop,.popup-coupon').removeClass('active');
            return false;
        })
    }
};
const Product_Event = {
    init: function () {
        this.tab_ProductDetails();
        this.delete_Cart();
        this.addMoreProductCartQuantity();
        this.same_Product();
        this.categoryEvent();
    }, tab_ProductDetails: function () {
        $(".tab-linke").click(function () {
            $(".tab-linke").removeClass("active");
            $(".tab-content-view").removeClass("active");
            $(this).addClass("active");
            var tabContentId = $(this).data("tab");
            $(tabContentId).addClass("active");
        });
    }, delete_Cart: function () {
        $(".cart__btn-remove").on("click", function () {
            let id = $(this).attr("data-id"), check = confirm("Bạn có muốn xóa sản phẩm?");
            if (check) {
                CheckEvent.removeCart(id, true);
            }
        });
    }, addMoreProductCartQuantity: function () {
        $("._subtract").on("click", function () {
            let id = $(this).attr("data-id"), qttElement = $("._productQtt_" + id),
                m = parseInt(qttElement.attr("data-max")), v = parseInt(qttElement.attr("value")), products = [],
                ps = {};
            if (m < v) {
                qttElement.attr("val", v - 1);
                // $('.qnt').html(v - 1);
            } else {
                if (m > v && v > 1) {
                    qttElement.attr("val", v - 1);
                    qttElement.html(v - 1);
                } else if (m > v && v < 1) {
                    qttElement.html("0");
                }
            }
            ps["id"] = id;
            ps["quantity"] = v - 1;
            if ($(this).attr("data-unit") !== "") {
                ps["unitId"] = $(this).attr("data-unit");
            }
            products.push(ps);
            CheckEvent.addToCart(products, 2, function (rs) {
                location.reload();
            });
        });
        $("._plus").on("click", function () {
            let id = $(this).attr("data-id"), qttElement = $("._productQtt_" + id),
                m = parseInt(qttElement.attr("data-max")), v = parseInt(qttElement.attr("value")), products = [],
                ps = {};
            if (v < m) {
                qttElement.attr("val", v + 1);
                qttElement.html(v + 1);
            } else {
                qttElement.attr("val", v + 1);
                qttElement.html(v + 1);
            }
            ps["id"] = id;
            ps["quantity"] = v + 1;
            if ($(this).attr("data-unit") !== "") {
                ps["unitId"] = $(this).attr("data-unit");
            }
            products.push(ps);
            CheckEvent.addToCart(products, 2, function (rs) {
                location.reload();
            });
        });

        $(".rte").click(function () {
            $(this).toggleClass("expanded");
            $(".btn--view-more").toggleClass("active");
        });

        $(".plus").on("click", function () {
            let oldValue = $(this).prev("input").val();
            oldValue = oldValue ? oldValue : 1;
            let newVal = parseFloat(oldValue) + 1;
            $(this).prev("input").val(newVal);
        });

        $(".subtract").on("click", function () {
            let oldValue = $(this).next("input").val();
            oldValue = oldValue > 1 ? parseFloat(oldValue) : 2;
            let newVal = oldValue - 1;
            $(this).next("input").val(newVal);
        });
    }, same_Product: function () {
        if ($(".slider_same_product").length) {
            $(".slider_same_product").slick({
                slidesToShow: 4, slidesToScroll: 1, arrows: true, autoplay: true, autoplaySpeed: 3000, responsive: [{
                    breakpoint: 768, settings: {
                        slidesToScroll: 2, slidesToShow: 2,
                    },
                },],
            });
        }
    }, categoryEvent: function () {
        $(".form-check.filter-item").click(function () {
            window.location.href = $(this).find('input').attr('value');
        })
    }
};
const Album_Event = {
    init: function () {
    },
};
const News_Event = {
    init: function () {
        this.countDown_Sale();
        this.countDown_Sold();
    }, countDown_Sale: function () {
        $(".count-down").each(function (e) {
            countdowwn($(this));
        });

        function countdowwn(element) {
            let x = setInterval(function () {
                let end = new Date(element.find(".timer-view").attr("data-date")).getTime();
                let now = new Date().getTime();
                let distance = end - now;

                if (distance < 0) {
                    clearInterval(x);
                    element.html("Đã hết khuyến mại");
                    return;
                }

                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                element.find(".days").text(days);
                element.find(".hours").text(hours);
                element.find(".minutes").text(minutes);
                element.find(".seconds").text(seconds);
            }, 1000);
        }
    },
    countDown_Sold: function () {
        setTimeout(() => {
            $('._productItem').each(function () {
                let t = $(this);
                const totalCustomerBuy = t.attr('data-totalcustomerbuy');

                if (totalCustomerBuy) {
                    t.find('.countdown').css('width', totalCustomerBuy + '%');
                    t.find('.a-center .numberSold').text(totalCustomerBuy);
                } else {
                    t.find('.countdown').css('width', '100%');
                    t.find('.a-center').text("Đã bán hết");
                }
            })
        }, 1000);
    }

};
const User_Event = {
    init: function () {
    },
};
const Map_Event = {
    init: function () {
        this.section_Tabs();
        this.tab_Links();
        this.backTop_Button();
        this.togglemenu_Footer();
        this.control_Menu();
        this.toggle_Filter();
    }, section_Tabs: function () {
        var tabs = [".section_product_tab_2"];

        tabs.forEach(function (tab) {
            var tabUl = $(tab + " .tab_ul ul");
            var prevBtn = $(tab + " .tab_ul .prev");
            var nextBtn = $(tab + " .tab_ul .next");

            function checkOverflow() {
                var tabUlElement = tabUl.get(0);
                if (tabUlElement) {
                    if (tabUlElement.scrollWidth > tabUlElement.clientWidth) {
                        prevBtn.show();
                        nextBtn.show();
                    } else {
                        prevBtn.hide();
                        nextBtn.hide();
                    }
                }
            }

            prevBtn.click(function () {
                var leftPos = tabUl.scrollLeft();
                tabUl.animate({scrollLeft: leftPos - 345}, 500);
            });

            nextBtn.click(function () {
                var leftPos = tabUl.scrollLeft();
                tabUl.animate({scrollLeft: leftPos + 150}, 500);
            });

            checkOverflow();
            $(window).resize(checkOverflow);
        });
    }, tab_Links: function () {
        $(".tab-links").click(function () {
            var $wrapTabIndex = $(this).closest(".wrap_tab_index");

            var tab_id = $(this).attr("data-tab");

            $wrapTabIndex.find(".tab-links").removeClass("current");
            $wrapTabIndex.find(".tab-content-view").removeClass("current");

            $(this).addClass("current");
            $wrapTabIndex.find("." + tab_id).addClass("current");
        });
    }, backTop_Button: function () {
        $(window).scroll(function () {
            $(this).scrollTop() > 200 ? $(".backtop").addClass("show") : $(".backtop").removeClass("show");
        });
        $(".backtop").click(function () {
            return ($("body,html").animate({
                scrollTop: 0,
            }, 800), !1);
        });
    }, togglemenu_Footer: function () {
        var wDWs = $(window).width();

        if (wDWs < 767) {
            $(".footer-click h4").click(function (e) {
                $(this).toggleClass("cls_mn").next().slideToggle();
                $(this).next("ul").toggleClass("current");
            });

            $(".footer-info h4").click(function (e) {
                $(this).toggleClass("cls_mn").next().slideToggle();
                $(this).next("ul").toggleClass("current");
            });
        }
    }, control_Menu: function () {
        var wDWs = $(window).width();
        if (wDWs > 992) {
            function horizontalNav() {
                return {
                    wrapper: $(".navigation-horizontal"),
                    navigation: $(".navigation-horizontal .nav"),
                    item: $(".navigation-horizontal .nav .nav-item"),
                    totalStep: 0,
                    onCalcNavOverView: function () {
                        let itemHeight = this.item.eq(0).outerWidth(), lilength = this.item.length, total = 0;
                        for (var i = 0; i < lilength; i++) {
                            itemHeight = this.item.eq(i).outerWidth();
                            total += itemHeight;
                        }
                        return Math.ceil(total);
                    },
                    onCalcTotal: function () {
                        let navHeight = this.navigation.width();
                        return Math.ceil(navHeight);
                    },
                    init: function () {
                        this.totalStep = this.onCalcNavOverView();
                        this.totalTo = this.onCalcTotal();
                        if (this.totalStep > this.totalTo) {
                            this.wrapper.addClass("overflow");
                        }
                    },
                };
            }
        }

        if (window.matchMedia("(min-width: 992px)").matches) {
            horizontalNav().init();
            $(window).on("resize", () => horizontalNav().init());
            var margin_left = 0;
            $("#prev").on("click", function (e) {
                e.preventDefault();
                animateMargin(190);
            });
            $("#next").on("click", function (e) {
                e.preventDefault();
                animateMargin(-190);
            });
            const animateMargin = (amount) => {
                margin_left = Math.min(0, Math.max(getMaxMargin(), margin_left + amount));
                $("ul.nav").animate({
                    "margin-left": margin_left,
                }, 300);
            };
            const getMaxMargin = () => $("ul.nav").parent().width() - $("ul.nav")[0].scrollWidth;
        }
    },
    toggle_Filter: function () {
        $('.sort-cate .btn-filter').click(function () {
            $(".layout-collection .left-content").toggleClass('active');
            $(".backdrop__body-backdrop___1rvky").toggleClass('active');
        });
        $('.backdrop__body-backdrop___1rvky').click(function () {
            $(".layout-collection .left-content").removeClass('active');
            $(this).toggleClass('active');
        });
        $('.close-filters').click(function () {
            $(".layout-collection .left-content").removeClass('active');
            $('.backdrop__body-backdrop___1rvky').removeClass('active');
        });
        $('.aside-filter .aside-hidden-mobile .aside-item .aside-title').on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.parents('.aside-filter .aside-hidden-mobile .aside-item').find('.aside-content').stop().slideToggle();
            $(this).toggleClass('active')
            return false;
        });
        if ($(window).width() <= 991) {
            $('.sort-cate-right h3').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                $this.parents('.sort-cate-right').find('ul').stop().slideToggle();
                $(this).toggleClass('active');
                return false;
            });
        }
    }
};
