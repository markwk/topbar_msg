(function ($) {
    var duration = 500;

    Drupal.behaviors.topbarMsg = {
        setting_timeout: function(seconds) {
            return setTimeout(function() {
                Drupal.behaviors.topbarMsg.close_topbar(true);
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

            $body.once('topbarMsg', function() {
                var text = '<div id="topbarmsg-wrapper"><div id="topbarmsg-container">',
                  link = settings.topbarMsg.link ? '<a href="'+ settings.topbarMsg.link +'" title="'+ settings.topbarMsg.link_text +'" target="'+ settings.topbarMsg.link_target +'" id="topbarmsg-logo">'+ settings.topbarMsg.link_text +'</a>' : '';

                text += '<div id="topbarmsg-content">' + settings.topbarMsg.message + link + '</div>';
                text += '<a id="topbarmsg-close">Close</a>';
                text += '<div id="topbarmsg-shadow"></div>';
                text += '</div></div>';
                text += '<a id="topbarmsg-open" style="">Open</a>';

                $body.prepend(text);

                $('#topbarmsg-wrapper', $body).hide();
                $('#topbarmsg-container', $body).css({'color' : settings.topbarMsg.color_text});
                $('#topbarmsg-container, #topbarmsg-open', $body).css({'background-color' : settings.topbarMsg.color_bg});
                $('#topbarmsg-container #topbarmsg-logo', $body).css({'color' : settings.topbarMsg.color_link});

                if (settings.topbarMsg.autohide) {
                    var seconds = !isNaN(settings.topbarMsg.autohide_seconds) ? settings.topbarMsg.autohide_seconds * 1000 : 5000;

                    Drupal.behaviors.topbarMsg.setting_timeout(seconds);
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

                $('#topbarmsg-open').click(function() {
                    if (settings.topbarMsg.cookie) {
                        $.cookie('topbar', 'open', {
                            path:'/'
                        });
                    }

                    Drupal.behaviors.topbarMsg.open_topbar($body, true);
                });

                $('#topbarmsg-close').click(function() {
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