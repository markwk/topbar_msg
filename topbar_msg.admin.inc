<?php

/**
 * @file
 * Topbar Message settings UI.
 */

/**
 * Form constructor for the Topbar Message settings form.
 */
function topbar_msg_settings_form() {
  $form = array();

  $form['topbar_msg_enable'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable'),
    '#default_value' => variable_get('topbar_msg_enable', 0),
  );
  $form['topbar_msg_display'] = array(
    '#type' => 'radios',
    '#title' => t('Display'),
    '#default_value' => variable_get('topbar_msg_display', 0),
    '#options' => array(
      t('Everywhere'),
      t('Just Homepage'),
      t('Everywhere but Homepage'),
    ),
  );
  $form['topbar_msg_message'] = array(
    '#type' => 'textfield',
    '#title' => t('Message'),
    '#default_value' => variable_get('topbar_msg_message', 'No message added yet'),
    '#maxlength' => '100',
    '#description' => 'Max length: 100 characters.',
  );
  $form['topbar_msg_link_text'] = array(
    '#type' => 'textfield',
    '#title' => t('Link Text'),
    '#default_value' => variable_get('topbar_msg_link_text', 'Modify Settings'),
    '#maxlength' => '15',
    '#description' => 'Max length: 15 characters.',
  );
  $form['topbar_msg_link'] = array(
    '#type' => 'textfield',
    '#title' => t('Link'),
    '#default_value' => variable_get('topbar_msg_link', 'admin/config/system/topbar-message'),
    '#description' => 'Prepend protocol (ie. http://) for external URLs.',
  );
  $form['topbar_msg_new_window_link'] = array(
    '#type' => 'checkbox',
    '#title' => t('Open Link in new window'),
    '#default_value' => variable_get('topbar_msg_new_window_link', TRUE),
  );
  $form['topbar_msg_autohide'] = array(
    '#type' => 'checkbox',
    '#title' => t('Autohide'),
    '#default_value' => variable_get('topbar_msg_autohide', FALSE),
  );
  $form['topbar_msg_autohide_seconds'] = array(
    '#type' => 'textfield',
    '#title' => t('Autohide seconds'),
    '#default_value' => variable_get('topbar_msg_autohide_seconds', 5),
    '#maxlength' => '5',
  );
  $form['topbar_msg_cookie'] = array(
    '#type' => 'checkbox',
    '#title' => t('Cookie'),
    '#default_value' => variable_get('topbar_msg_cookie', FALSE),
  );
  $form['topbar_msg_cookie_expire'] = array(
    '#type' => 'textfield',
    '#title' => t('Cookie expire (days)'),
    '#default_value' => variable_get('topbar_msg_cookie_expire', 1),
    '#maxlength' => '5',
  );

  if (module_exists('color')) {
    drupal_add_css('misc/farbtastic/farbtastic.css');
    drupal_add_js('misc/farbtastic/farbtastic.js');

    $form['topbar_msg_color_bg'] = array(
      '#type' => 'textfield',
      '#title' => t('Background color'),
      '#default_value' => variable_get('topbar_msg_color_bg', '#000000'),
      '#maxlength' => 7,
      '#size' => 7,
      '#description' => '<div id="topbar-msg-color-bg-picker"></div>',
    );
    $form['colorpicker_bg'] = array(
      '#type' => 'item',
      '#description' => "<script type='text/javascript'>
        (function($) {
          $(document).ready(function() {
            $('#topbar-msg-color-bg-picker').farbtastic('#edit-topbar-msg-color-bg');
          });
        }) (jQuery);
      </script>",
    );
    $form['topbar_msg_color_text'] = array(
      '#type' => 'textfield',
      '#title' => t('Text color'),
      '#default_value' => variable_get('topbar_msg_color_text', '#FFFFFF'),
      '#maxlength' => 7,
      '#size' => 7,
      '#description' => '<div id="topbar-msg-color-text-picker"></div>',
    );
    $form['colorpicker_text'] = array(
      '#type' => 'item',
      '#description' => "<script type='text/javascript'>
        (function($) {
          $(document).ready(function() {
            $('#topbar-msg-color-text-picker').farbtastic('#edit-topbar-msg-color-text');
          });
        }) (jQuery);
      </script>",
    );
    $form['topbar_msg_color_link'] = array(
      '#type' => 'textfield',
      '#title' => t('Link color'),
      '#default_value' => variable_get('topbar_msg_color_link', '#FFFFFF'),
      '#maxlength' => 7,
      '#size' => 7,
      '#description' => '<div id="topbar-msg-color-link-picker"></div>',
    );
    $form['colorpicker_link'] = array(
      '#type' => 'item',
      '#description' => "<script type='text/javascript'>
        (function($) {
          $(document).ready(function() {
            $('#topbar-msg-color-link-picker').farbtastic('#edit-topbar-msg-color-link');
          });
        }) (jQuery);
      </script>",
    );
  }
  else {
    $form['topbar_msg_color_msg'] = array(
      '#type' => 'markup',
      '#markup' => t('Please install Color module to change the topbar color settings.'),
    );
  }

  if (module_exists('context')) {
    $form['topbar_msg_context'] = array(
      '#type' => 'checkbox',
      '#title' => t('Context reaction to control Topbar Message display.'),
      '#description' => t('The Topbar Message code will be added to all "Display" pages of your site by default. You can use the <a href="@context_url">Context module</a> to control on when and where it will be displayed.', array('@context_url' => url('admin/structure/context'))),
      '#default_value' => variable_get('topbar_msg_context', 0),
    );
  }

  return system_settings_form($form);
}
