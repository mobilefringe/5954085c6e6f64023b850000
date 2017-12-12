function init(e){
    $('<div class="modal-backdrop custom_backdrop"><img src="//codecloud.cdn.speedyrails.net/sites/590c90106e6f641052010000/image/gif/1493992574000/loading.gif" class="" alt=""></div>').appendTo(document.body);
    $('.open_menu').click(function(e){
        $('body').addClass('no_scroll');
        $('.mobile_menu_container').fadeIn();
    });
    $('#close_menu').click(function(e){
        $('body').removeClass('no_scroll');
        $('.mobile_menu_container').fadeOut();
    });
    
    $('#mobile_alpha_list').change(function(){
        window.location.href = "#" + $(this).val().toUpperCase();
    })
    
    $('#mobile_cat_list').change(function(){
        $('#mobile_alpha_list').hide();
        var v = $(this).val();
        if(v == "all"){
            $('#mobile_alpha_list').show();
            $('#mobile_alpha_list').val($("#mobile_alpha_list option:first").val())
            $('.show_all_stores').click();
       }
       else{
           $('a[data-id="' + v + '"]').click();
       }
     
    })
    
    $('.locate_store').click(function(e){
        e.preventDefault();
        $('.stores_table').show()
    })
    site_search();
    $('.search_btn').click(function(){
        $('.mobile_search').fadeIn();
        $('#site_search').focus()
    })
    $('.close_search').click(function(){
        $('.mobile_search').fadeOut();
        $('.search_results_container').fadeOut();
        $('#site_search').val('')
    })
    
    $('.popup-close').click(function(){
        $('.hidden-popup-bg').hide()
        $('body').removeClass('no_scroll');
    })
    
    //dynamically changing copyright year
    var current_year = moment().year();
    $("#current_year").text(current_year);

}

function show_content(){
    $('.yield').fadeIn();
    $(".modal-backdrop").remove();
}


function show_cat_stores(){
    $('.show_cat_stores').click(function(e){
        var cat_id = $(this).attr('data-id');
        $('.active_cat').removeClass('active_cat');
        $(this).addClass('active_cat');
        var rows = $('.cats_row');
        rows.hide();
        $('.store_initial').hide();
        $('#cat_name_header').text($(this).text());
        $('#cat_name_header').css('display', 'block');
        $.each(rows, function(i, val){
            var cat_array = val.getAttribute('data-cat').split(',');
            if ($.inArray(cat_id, cat_array) >= 0){
                $(val).show();
            }
        });
        
        e.preventDefault();
    });
    $('.show_all_stores').click(function(e){
        $('.active_cat').removeClass('active_cat');
        $(this).addClass('active_cat');
        var rows = $('.cats_row');
        rows.show();
        $.each($('.store_initial'), function(i, val){
           if ($(val).text().length > 0){
               $(val).show();
           } 
        });
        $('#cat_name_header').hide();
        e.preventDefault();
    });
    
}

function show_pin(param){
	store_id = $(param).attr('store_id');
	if($("#"+store_id).is(":visible")){
		$("."+store_id).hide();				
		$("#"+store_id).hide();
		$("#no_pin_"+store_id).show();
		$("#show_pin_"+store_id).hide();
		$("#m_no_pin_"+store_id).show();
		$("#m_show_pin_"+store_id).hide();
	}else{
		$(".marker").hide();
		$("#"+store_id).show();
		$("#"+store_id).click();
		$("#no_pin_"+store_id).hide();
		$("#show_pin_"+store_id).show();
		$("#m_no_pin_"+store_id).hide();
		$("#m_show_pin_"+store_id).show();
	}
	$('.stores_table').hide()
	
	return false;
}


function get_day(id){
    switch(id) {
        case 0:
            return ("Sunday");
            break;
        case 1:
            return ("Monday");
            break;
        case 2:
            return ("Tuesday");
            break;
        case 3:
            return ("Wednesday");
            break;
        case 4:
            return ("Thursday");
            break;
        case 5:
            return ("Friday");
            break;
        case 6:
            return ("Saturday");
            break;
    }
}


function convert_hour(d){
    var h = (d.getUTCHours());
    var m = addZero(d.getUTCMinutes());
    var s = addZero(d.getUTCSeconds());
    if (h >= 12) {
        if ( h != 12) {
            h = h - 12;    
        }
        
        i = "pm"
    } else {
        i = "am"
    }
    return h+":"+m+i;
}



function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function get_month (id){
    var month = "";
    switch(id) {
        case 0:
            month = "Jan";
            break;
        case 1:
            month = "Feb";
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Apr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "Jun";
            break;
        case 6:
            month = "Jul";
            break;
        case 7:
            month = "Aug";
            break;
        case 8:
            month = "Sep";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dec";
            break;
            
    }
    return month;
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


function site_search(){
    $('.search_results_container').hover(
           function(){ $('body').addClass('no_scroll') },
           function(){ $('body').removeClass('no_scroll') }
    )
    $('.site_search').keyup(function(){
        if ($(this).val() == ""){
            $('#search_results_stores').html('');
            $('#search_results_events').html('');
            $('#search_results_promotions').html('');
            $('.search_results_container').hide();
            $('#close_search').hide();
        }
        else{
            $('#close_search').show();
            $('#search_results_stores').html('');
            $('#search_results_events').html('');
            $('#search_results_promotions').html('');
            
            var val = $(this).val().toLowerCase();
            results = getSearchResults(val);
            var s_stores = results.stores;
            var s_events = results.events;
            var s_promos = results.promotions;
            
            if(s_stores !=undefined && s_stores.length > 0){
                var h2_stores = "<h2 id='open_stores' class='li_open'>(" +s_stores.length + ") Stores<i class='pull-right fa fa-chevron-down'></i></h2>";
                $('#search_results_stores').append(h2_stores);
                $.each(s_stores, function(i, v){
                    var div_stores = "<div class='blog_search_results collapse_open_stores'>";
                    div_stores = div_stores + "<h4><a href='/stores/" + v.slug + "'>" + v.name + "</a></h4>";
                    div_stores = div_stores + "</div>";
                    $('#search_results_stores').append(div_stores);
                    $('.search_results_container').show();
                });
            }
            if(s_promos != undefined && s_promos.length > 0){
                var h2_promotions = "<h2 id='open_promotions' class='li_open'>(" +s_promos.length + ") Promotions<i class='pull-right fa fa-chevron-down'></i></h2>";
                $('#search_results_promotions').append(h2_promotions);
                $.each(s_promos, function(i, v){
                    var div = "<div class='blog_search_results collapse_open_promotions'>";
                    div = div + "<h4><a href='/promotions/" + v.slug + "'>" + v.name + "</a></h4>";
                    div = div + "</div>";
                    $('#search_results_promotions').append(div);
                    $('.search_results_container').show();
                });
            }   
            if(s_events != undefined && s_events.length > 0){
                var h2_events = "<h2 id='open_events' class='li_open'>(" +s_events.length + ") Events<i class='pull-right fa fa-chevron-down'></i></h2>";
                $('#search_results_stores').append(h2_events);
                $.each(s_events, function(i, v){
                    var div = "<div class='blog_search_results collapse_open_events'>";
                    div = div + "<h4><a href='/events/" + v.slug + "'>" + v.name + "</a></h4>";
                    div = div + "</div>";
                    $('#search_results_stores').append(div);
                    $('.search_results_container').show();
                });
            }
            
            
            
            $('.li_open').click(function(){
                var collapse = ".collapse_" + $(this).attr('id');
                if($(this).hasClass('open')){
                    $(collapse).slideUp('fast');
                    $(this).removeClass('open');
                }
                else{
                    $(this).addClass('open');
                    $(collapse).slideDown('fast');
                }
                
            })
            
        }
    });
}

function submit_contest(data) {
    var propertyDetails = getPropertyDetails();
    var host = propertyDetails.mm_host;
    var email = $("#email").val();
    var name = $("#first_name").val() + " " + $("#last_name").val();
    $.ajax({
        url: host+"/newsletter_no_captcha",
        type: "POST",
        data: data,
        success: function(data) {
            $("#success_subscribe").fadeIn();
            $('#contest_form').trigger('reset');
        }
    });
    $('#submit_btn').prop( "disabled", false );
    
}



function renderSitePopup(){
    var pp = getPopups()[0];
    if (pp != undefined){
        if (pp.contest.name != undefined && pp.contest.name.length > 0){
            $('.popup-body').append('<img id="pp_img" class="pp_img_bg" src="//mallmaverick.cdn.speedyrails.net' + pp.photo_url + '" alt="pop up">');
            $('.hidden-popup-form').css('height', '600px')
            $('.popup-close-form').click(function(){
                $('.popup-close').click();
            });
            $('#newsletter_form_pp').submit(function(e){
                e.preventDefault();
                $.getJSON(
                    this.action + "?callback=?",
                    $(this).serialize(),
                    function (data) {
                        if (data.Status === 400) {
                            alert("Please try again later.");
                        } else { // 200
                            $("#success_subscribe").fadeIn();
                            $('#newsletter_form_pp').trigger('reset')
                            $(".hidden-popup-bg").delay(2000).fadeOut();
                            
                        }
                    }
                );
            });
        }
        else{
            if (pp.photo_link.length > 0){
                $('.popup-body').html('<a id="pp_url" href="' + pp.photo_link +'"><img id="pp_img" src="//mallmaverick.cdn.speedyrails.net' + pp.photo_url + '" alt="pop up"></a>')
            }
            else{
                $('.popup-body').html('<img id="pp_img" src="//mallmaverick.cdn.speedyrails.net' + pp.photo_url + '" alt="pop up">')
            }
        }
    
        if( getCookie('popup_viewed') != 'true'){
            document.cookie = "popup_viewed=true";
            $(".hidden-popup-bg").show();
            $('body').addClass('no_scroll');
        }
        
        $(".hidden-popup-bg").click(function(event){
            if( !$( event.target).is('.hidden-popup-form') ) {
                $(".hidden-popup-bg").fadeOut();
            } else {
                event.stopPropagation();
            }
        });
        
        
        $(".hidden-popup-bg .hidden-popup-form").click(function(event){
            event.stopPropagation();
        }); 
    }
}



function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}