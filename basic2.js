// ----- b a s i c 2 ------------------------------------------------------------
// ------Ergänzung von Bernd Gewehr--------------------------------------------
	
// ----- basic.pager ----------------------------------------------------------
$(document).delegate('div[data-widget="basic.pager"]', {
	'update': function (event, response) {
		var prog = response[0].match(/prog[123]/g);
		$('#' + $(this).attr('data-val')).css("visibility", "hidden");
		$(this).attr('data-val', prog);
		$('#' + $(this).attr('data-val')).css("visibility", "visible");
	}
});


// ----- basic.httpcmd ----------------------------------------------------------
$(document).delegate('a[data-widget="basic.httpcmd"]', {
	'click': function (event) {
		$.ajax($(this).attr('data-val'));
	}
});

// ----- basic.textrpl ----------------------------------------------------------
$(document).delegate('span[data-widget="basic.textrpl"]', {
	'update': function (event, response) {
		var UTF8response=response[0].replace(/ÃÂ¼/g, "ü");
		UTF8response=UTF8response.replace(/ÃÂ¤/g, "ä");
		UTF8response=UTF8response.replace(/ÃÂ¶/g, "ö");
		UTF8response=UTF8response.replace(/Ã¢ÂÂ¬/g, "€");		
		$('#' + this.id).html(UTF8response);
	}
});


	// ----- basic.timecounter-----------------------------------------------------
$(document).delegate('span[data-widget="basic.timecounter"]', {
	'init': function (event) {
	},
	'update': function (event, response) {
		$(this).html(ZeitAnzeigen($(this).attr('id'), $(this).attr('data'), response));
	}
});
	
	
	// ----- basic.textinput ------------------------------------------------------
$(document).delegate('input[data-widget="basic.textinput"]', {
	'update': function (event, response) {
		// DEBUG: console.log("[basic.textinput] update '" + this.id + "':", response); 
		$(this).val(response);
	},

	'change': function (event) {
		// DEBUG: console.log("[basic.textinput] change '" + this.id + "':", $(this).val()); 
		io.write($(this).attr('data-item'), $(this).val());
	}
});

	// ----- basic.select_single -------------------------------------------------------
$(document).delegate('select[data-widget="basic.selectmenu"]', {
	'update': function (event, response) {
		var prog = response[0].match(/prog[123]/g);
		$(this).val(prog).selectmenu().selectmenu('refresh');
		// DEBUG: console.log("[basic.selectmenu] update '" + this.id + "': aktuell: " +  $(this).attr('selected'), response); 
	},

	'change': function (event) {
		io.write($(this).attr('data-item'), $(this).val());
		// DEBUG: console.log("[basic.selectmenu] change '" + this.id + "':", $(this).prop('selected')); 
	}
});

	// ----- basic.img ----------------------------------------------------------
$(document).delegate('img[data-widget="basic.img"]', {
	'update': function (event, response) {
	if ($('#' + this.id).attr('alt') == '') {
		$('#' + this.id).attr('src',response);
	}
	else {
		$('#' + this.id).attr('src',$('#' + this.id).attr('src') + response[0].match(new RegExp($('#' + this.id).attr('alt'),'gi')));
	}
	$('#' + this.id).attr('style',"visibility:'display'; width: 100px");	
		// DEBUG: console.log("[basic.img] '" + this.id + "'", response);console.log("[basic.img] '" + this.id + "'", response[0].match(/\d+\-\d\.jpg/gi));
	}
});

// ----- visu.lbutton ----------------------------------------------------------
$(document).delegate('[data-widget="basic.lbutton"]', {
        'vmousedown': function(event) { // Short/Long Button
            event.preventDefault();
	    var items = widget.explode($(this).attr('data-item'));
            var obj = this;
            $(obj).attr('data-timer',
                setTimeout(function() {
                    $(obj).attr('data-long', true);
                    io.write(items[1], $(obj).attr('data-val'));
                }, 400)
            );
        },
        'vmouseup': function() { // Short/Long Button
            clearTimeout($(this).attr('data-timer'))
	    var items = widget.explode($(this).attr('data-item'));
            if ($(this).attr('data-long') == 'true') {
                $(this).attr('data-long', false);
            } else {
	        io.write(items[0], $(this).attr('data-val'));
            }
        },
        'click': function(event) {
        
	}
});

// ----- basic.lbutton ---------------------------------------------------------
$(document).delegate('a[data-widget="basic.lbutton"]', {
	'click': function (event) {
		if ($(this).attr('data-val') != '') {
			io.write($(this).attr('data-item'), $(this).attr('data-val'));
		}
	}
});

    
// ----- basic.hider-----------------------------------------------------
$(document).delegate('div[data-widget="basic.hider"]', {
	'init': function (event) {
	},
		
	'update': function (event, response) {
if (response == '') {
		$(this).html("");
//css("visibility", "hidden");
	}
}
});
	

// ----- basic.auth_switch ---------------------------------------------------------
// ---------------------------------------------------------------------------------

$(document).delegate('span[data-widget="basic.auth_switch"]', {
	'update': function (event, response) {
		$('#' + this.id + ' img').attr('src', (response == $(this).attr('data-val-on') ? $(this).attr('data-pic-on') : $(this).attr('data-pic-off')));
	},
	'click': function (event) {
    
    		// öffnen des popups bei clicken des icons und ausführung der eingabefunktion
    		$('#' + this.id + '-popup').popup( "open" );
	}
});
