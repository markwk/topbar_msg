(function ($) {
    var duration = 500;

	Drupal.behaviors.topBarMsg = {
        setting_timeout: function(seconds) {
            return setTimeout(function() {
                Drupal.behaviors.topBarMsg.close_topbar(true);
            }, seconds);
        },

        close_topbar: function($body, animate) {
            $body.removeClass('topbarmsg-open');

            if(animate) {
                $body.addClass('topbarmsg-transition');
                $('#topbarmsg-wrapper').slideUp(duration);
                $('#topbarmsg-open').slideDown(duration);
            }
            else {
                $('#topbarmsg-wrapper').hide();
                $('#topbarmsg-open').show();
            }
        },

        open_topbar: function($body, animate) {
            $body.addClass('topbarmsg-open');

            if(animate) {
                $body.addClass('topbarmsg-transition');
                $('#topbarmsg-wrapper').slideDown(duration);
                $('#topbarmsg-open').slideUp(duration);
            }
            else {
                $('#topbarmsg-wrapper').show();
                $('#topbarmsg-open').hide();
            }
        },

		attach: function(context, settings) {
            var $body = $('body', context);

            $body.once('topbarmsg', function() {
				var text = '<div id="topbarmsg-wrapper"><div id="topbarmsg-container">',
                    link = settings.TopBarMsg.link ? '<a href="'+ settings.TopBarMsg.link +'" title="'+ settings.TopBarMsg.link_text +'" target="'+ settings.TopBarMsg.link_target +'" id="topbarmsg-logo">'+ settings.TopBarMsg.link_text +'</a>' : '';

				text += '<div id="topbarmsg-content">' + settings.TopBarMsg.message + link+ '</div>';
				text += '<a id="topbarmsg-close">Close</a>';
				text += '<div id="topbarmsg-shadow"></div>';
				text += '</div></div>';
                text += '<a id="topbarmsg-open" style="">Open</a>';

                $body.prepend(text);

				$('#topbarmsg-wrapper', $body).hide();
                $('#topbarmsg-container', $body).css({'color' : settings.TopBarMsg.color_text});
				$('#topbarmsg-container, #topbarmsg-open', $body).css({'background-color' : settings.TopBarMsg.color_bg});
				$('#topbarmsg-container #topbarmsg-logo', $body).css({'color' : settings.TopBarMsg.color_link});

				if (settings.TopBarMsg.autohide) {
					var seconds = !isNaN(settings.TopBarMsg.autohide_seconds) ? settings.TopBarMsg.autohide_seconds * 1000 : 5000;

                    Drupal.behaviors.topBarMsg.setting_timeout(seconds);
				}

                $('#topbarmsg-open').click(function() {
                    Drupal.behaviors.topBarMsg.open_topbar($body, true);
                });

                $('#topbarmsg-close').click(function() {
                    Drupal.behaviors.topBarMsg.close_topbar($body, true);
                });
			});
		}
	}
})(jQuery);