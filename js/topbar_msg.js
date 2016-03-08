(function ($) {
    var seconds = false,
      debug = false;

    Drupal.behaviors.topbarMsg = {
        setting_timeout: function($body, seconds) {
            if (debug) {
                console.log('setting_timeout');
            }

            return setTimeout(function() {
                Drupal.behaviors.topbarMsg.close_topbar($body, true);
            }, seconds);
        },

        close_topbar: function($body, animate) {
            if (debug) {
                console.log('close_topbar');
            }

            $body.removeClass('topbar-message-opened');

            if(animate) {
                $body.addClass('topbar-message-transition');
            }
        },

        open_topbar: function($body, animate) {
            if (debug) {
                console.log('open_topbar');
            }

            $body.addClass('topbar-message-opened');

            if(animate) {
                $body.addClass('topbar-message-transition');
            }

            if (seconds) {
                Drupal.behaviors.topbarMsg.setting_timeout($body, seconds);
            }
        },

        attach: function(context, settings) {
            var $body = $('body', context);

            $body.once('topbarMsg', function() {
                var text = '<div id="topbar-message"><div id="topbar-message-wrapper">',
                  link = settings.topbarMsg.link ? '<a href="'+ settings.topbarMsg.link +'" title="'+ settings.topbarMsg.link_text +'" target="'+ settings.topbarMsg.link_target +'" id="topbar-message-link">'+ settings.topbarMsg.link_text +'</a>' : '';

                text += '<div id="topbar-message-content">' + settings.topbarMsg.message + link + '</div>';
                text += '<a id="topbar-message-close">Close</a>';
                text += '</div><a id="topbar-message-open">Open</a>';
                text += '</div>';

                $body.prepend(text);

                $('#topbar-message', $body).css({'color' : settings.topbarMsg.color_text});
                $('#topbar-message-wrapper, #topbar-message-open, #topbar-message-close', $body).css({'background-color' : settings.topbarMsg.color_bg});
                $('#topbar-message-content #topbar-message-link', $body).css({'color' : settings.topbarMsg.color_link});

                if (settings.topbarMsg.autohide) {
                    seconds = !isNaN(settings.topbarMsg.autohide_seconds) ? settings.topbarMsg.autohide_seconds * 1000 : 5000;
                }

                if (settings.topbarMsg.cookie) {
                    if($.cookie('topbar') === null) {
                        $.cookie('topbar', 'open', {
                            expires: parseInt(settings.topbarMsg.cookie_expire),
                            path:'/'
                        });

                        Drupal.behaviors.topbarMsg.open_topbar($body, true);
                    }
                    else if($.cookie('topbar') == 'open') {
                        Drupal.behaviors.topbarMsg.open_topbar($body);
                    }
                    else if($.cookie('topbar') == 'close') {
                        Drupal.behaviors.topbarMsg.close_topbar($body);
                    }
                }
                else {
                    Drupal.behaviors.topbarMsg.open_topbar($body);
                }

                $('#topbar-message-open').click(function(event) {
                    event.preventDefault();

                    if (settings.topbarMsg.cookie) {
                        $.cookie('topbar', 'open', {
                            path:'/'
                        });
                    }

                    Drupal.behaviors.topbarMsg.open_topbar($body, true);
                });

                $('#topbar-message-close').click(function(event) {
                    event.preventDefault();

                    if (settings.topbarMsg.cookie) {
                        $.cookie('topbar', 'close', {
                            path:'/'
                        });
                    }

                    Drupal.behaviors.topbarMsg.close_topbar($body, true);
                });
            });
        }
    }
})(jQuery);