<?php
// Responsive video
function _ws_shortcode_video($atts) {
  $a = shortcode_atts(array(
    'url' => 'https://www.youtube.com/embed/aqz-KE-bpKQ?ecver=1',
    'type' => 'youtube',
    'fullscreen' => true
  ), $atts);
  $output = '';
  if ($a['type']=='local') {
    $output = '<video' . ($a['fullscreen'] ? ' class="no-fullscreen"' : '') . ' controls><source src="' . $a['url'] . '" type="video/mp4" /></video>';
  } else {
    $output = '<div class="video-container"><iframe src="' . $a['url'] . '" frameborder="0" ' . ($a['fullscreen'] ? 'allowfullscreen' : '') . '></iframe></div>';
  }
  return $output;
}
add_shortcode('responsive_video', '_ws_shortcode_video');

// Simple email form
function _ws_shortcode_form($atts) {
  $a = shortcode_atts(array(
    'to' => get_bloginfo('admin_email')
  ), $atts);
  $output = '<form class="ajax-form" type="post" action="">' .
    '<label for="name">Name*</label>' .
    '<input id="name" name="name" type="text" required />' .
    '<label for="email">Email*</label>' .
    '<input id="email" name="email" type="email" required />' .
    '<label for="message">Message*</label>' .
    '<textarea id="message" name="message" required></textarea>' .
    '<input type="hidden" name="apiaryProductContainer" value="" />' .
    '<input type="hidden" name="reniatnoCtcudorPyraipa" value="Pooh Bear" />' .
    '<input type="hidden" name="to" value="' . $a['to'] . '" />' .
    '<input type="hidden" name="form" value="contact" />' .
    '<input type="hidden" name="action" value="_ws_send_email" />' .
    '<input type="submit" value="Submit" />' .
    '<div class="error-msg"></div>' .
  '</form>';
  return $output;
}
add_shortcode('form', '_ws_shortcode_form');

// Useful for svg's in the visual editor (WordPress removes svg elements when switching between visual and text)
function _ws_shortcode_svg($atts) {
  $a = shortcode_atts(array(
    'id' => null,
    'class' => null
  ), $atts);
  $output = '';
  if ($a['id']) {
    $output = '<svg' . ($a['class'] ? ' class="' . $a['class'] . '"' : '') . '><use xlink:href="/wp-content/themes/_ws/template-parts/sprites.svg#' . $a['id'] . '"></use></svg>';
  }
  return $output;
}
add_shortcode('svg', '_ws_shortcode_svg');

// Display social icons/links
function _ws_shortcode_social($atts) {
  $a = shortcode_atts(array(
    'icons' => array('facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'pinterest', 'soundcloud', 'tumblr')
  ), $atts);
  if (!is_array($a['icons'])) {
    $a['icons'] = explode(',', $a['icons']);
    $a['icons'] = array_map(function($v) {
      return trim($v);
    }, $a['icons']);
  }
  $output = '<div class="social-icons">';
  foreach ($a['icons'] as $s) {
    if ($url = get_option('social_' . $s)) {
      $output .= '<a href="' . $url . '" target="_blank"><svg><use xlink:href="/wp-content/themes/_ws/template-parts/sprites.svg#' . $s . '"></use></svg></a>';
    }
  }
  $output .= '</div>';
  return $output;
}
add_shortcode('social_icons', '_ws_shortcode_social');
