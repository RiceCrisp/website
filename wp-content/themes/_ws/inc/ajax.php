<?php
// Post selector post types
function _ws_post_selector_types() {
  if ($_REQUEST['post_type']) {
    $postTypes = array($_REQUEST['post_type'] => get_post_type_object($_REQUEST['post_type']));
  }
  else {
    $postTypes = get_post_types(array('public' => true));
    unset($postTypes['attachment']);
    $postTypes = array_map(function($v) {
      return get_post_type_object($v);
    }, $postTypes);
  }
  $output = '<div class="post-selector-container">';
  if ($_REQUEST['value']) {
    $postType = get_post_type_object(get_post_type($_REQUEST['value']));
  }
  else {
    $postType = reset($postTypes);
  }
  if (count($postTypes) > 1) {
    $output .= '<div class="post-selector-type"><ul>';
    foreach ($postTypes as $type) {
      $output .= '<li><input id="' . $_REQUEST['id'] . '-type-' . $type->name . '" name="' . $_REQUEST['id'] . '-type" type="radio" value="' . $type->name . '" ' . ($postType->name==$type->name ? 'checked' : '') . ' /><label for="' . $_REQUEST['id'] . '-type-' . $type->name . '">' . $type->labels->singular_name . '</label></li>';
    }
    $output .= '</ul></div>';
  }
  $output .= '<div class="post-selector-id"><input class="post-selector-filter" type="text" placeholder="Filter..." /><ul>';
  $posts = get_posts(array('post_type'=>$postType->name, 'post_status'=>'publish', 'posts_per_page'=>-1));
  foreach ($posts as $post) {
    $output .= '<li><input id="' . $_REQUEST['id'] . '-id-' . $post->ID . '" name="' . $_REQUEST['id'] . '-id" type="radio" value="' . $post->ID . '" ' . ($post->ID==$_REQUEST['value'] ? 'checked' : '') . ' /><label for="' . $_REQUEST['id'] . '-id-' . $post->ID . '">' . $post->post_title . '</label></li>';
  }
  $output .= '</ul></div></div><ul>';
	echo $output;
  wp_die();
}
add_action('wp_ajax__ws_post_selector_types', '_ws_post_selector_types');
add_action('wp_ajax_nopriv__ws_post_selector_types', '_ws_post_selector_types');

// Post selector posts
function _ws_post_selector_posts() {
  $posts = get_posts(array('post_type'=>$_REQUEST['post_type'], 'post_status'=>'publish', 'posts_per_page'=>-1));
  $output = '<input class="post-selector-filter" type="text" placeholder="Filter..." /><ul>';
  if ($posts) {
    foreach ($posts as $post) {
      $output .= '<li><input id="' . $_REQUEST['id'] . '-id-' . $post->ID . '" name="' . $_REQUEST['id'] . '-id" type="radio" value="' . $post->ID . '" ' . ($_REQUEST['value']==$post->ID ? 'checked' : '') . ' /><label for="' . $_REQUEST['id'] . '-id-' . $post->ID . '">' . $post->post_title . '</label></li>';
    }
  }
  else {
    $output .= '<li><i>No posts found</i></li>';
  }
  $output .= '</ul>';
	echo $output;
  wp_die();
}
add_action('wp_ajax__ws_post_selector_posts', '_ws_post_selector_posts');
add_action('wp_ajax_nopriv__ws_post_selector_posts', '_ws_post_selector_posts');

// SVG selector
function _ws_svg_selector() {
  $svgs = get_option('svg');
  $output = '<div class="svg-selector-container"><div class="svg-selection"><svg><use xlink:href="/wp-content/themes/_ws/template-parts/sprites.svg#' . ($_REQUEST['value'] ?: '') . '"></use></svg><button><span class="dashicons dashicons-arrow-down"></span></button></div><ul><li><input id="' . $_REQUEST['id'] . '-id-empty" name="' . $_REQUEST['id'] . '-id" type="radio" value="" ' . ($_REQUEST['value']==$svg['id'] ? 'checked' : '') . ' /><label for="' . $_REQUEST['id'] . '-id-empty">No Icon</label></li>';
  if ($svgs) {
    foreach ($svgs as $svg) {
      $output .= '<li><input id="' . $_REQUEST['id'] . '-id-' . $svg['id'] . '" name="' . $_REQUEST['id'] . '-id" type="radio" value="' . $svg['id'] . '" ' . ($_REQUEST['value']==$svg['id'] ? 'checked' : '') . ' /><label for="' . $_REQUEST['id'] . '-id-' . $svg['id'] . '"><svg width="20" height="20" viewBox="' . $svg['viewbox'] . '">' . $svg['path'] . '</svg></label></li>';
    }
  }
  else {
    $output .= '<li><i>No svgs found</i></li></div>';
  }
  $output .= '</ul>';
	echo $output;
  wp_die();
}
add_action('wp_ajax__ws_svg_selector', '_ws_svg_selector');
add_action('wp_ajax_nopriv__ws_svg_selector', '_ws_svg_selector');

// Infinite scroll posts
function _ws_get_more_posts() {
  ob_start();
  $loop = json_decode(stripslashes($_REQUEST['loop']), true);
  $args = $loop['query'];
  $args['paged'] = $_REQUEST['page'];
  $loop = new WP_Query($args);
  $posts = 0;
  if ($loop->have_posts()) : while ($loop->have_posts()) : $loop->the_post();
    if (isset($_REQUEST['type'])) {
      get_template_part('template-parts/archive', $_REQUEST['type']);
    }
    else {
      get_template_part('template-parts/archive', get_post_type());
    }
    $posts++;
  endwhile; endif; wp_reset_postdata();
  $output = ob_get_clean();
  $more = true;
  if ($loop->query['paged'] >= $loop->max_num_pages) {
    $more = false;
  }
  wp_send_json_success(array('output'=>$output, 'more'=>$more));
  wp_die();
}
add_action('wp_ajax__ws_get_more_posts', '_ws_get_more_posts');
add_action('wp_ajax_nopriv__ws_get_more_posts', '_ws_get_more_posts');

// Send Email
function _ws_send_email() {
  $res = false;
  if ($_REQUEST['apiaryProductContainer'] == '' && $_REQUEST['reniatnoCtcudorPyraipa'] == 'Pooh Bear' && $_REQUEST['name'] != '' && $_REQUEST['email'] != '' && $_REQUEST['message'] != '') {
    $to = $_REQUEST['to'];
    $subject = 'New Message from ' . $_REQUEST['name'] . ' via ' . get_site_url();
    $body = '<p>A user has filled out the ' . $_REQUEST['form'] . ' form on ' . site_url() . '.</p>';
    foreach ($_REQUEST as $key => $r) {
      if ($key == 'apiaryProductContainer' || $key == 'reniatnoCtcudorPyraipa' || $key == 'to' || $key == 'form' || $key == 'action') {
        continue;
      }
      else {
        $body .= '<p><b>' . ucwords($key) . ': </b>' . $r . '</p>';
      }
    }
    $headers = array('Content-Type: text/html; charset=UTF-8');
    $res = wp_mail($to, $subject, $body, $headers);
  }
  if ($res) {
    wp_send_json_success('<p>Your email was sent successfully.</p>');
  }
  else {
    wp_send_json_error('<p>There was an error sending your request. Please confirm that all information is valid, and try again.</p>');
  }
  wp_die();
}
add_action('wp_ajax__ws_send_email', '_ws_send_email');
add_action('wp_ajax_nopriv__ws_send_email', '_ws_send_email');

// Generate Sitemap
function _ws_generate_sitemap() {
  $postsForSitemap = get_posts(array('post_type'=>get_post_types(array('public'=>true)), 'post_status'=>'publish', 'orderby'=>'modified', 'order'=>'DESC', 'posts_per_page'=>-1));
  $sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
  $sitemap .= "\n" . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
  foreach ($postsForSitemap as $post) {
    if (get_post_meta($post->ID, '_sitemap-remove', true)) {
      continue;
    }
    $url = get_permalink($post->ID);
    $postdate = explode(" ", $post->post_modified);
    $freq = get_post_meta($post->ID, '_sitemap-freq', true) ? get_post_meta($post->ID, '_sitemap-freq', true) : 'monthly';
    $priority = get_post_meta($post->ID, '_sitemap-priority', true) ? get_post_meta($post->ID, '_sitemap-priority', true) : '0.5';
    $sitemap .= "\t" . '<url>' . "\n" .
      "\t\t" . '<loc>' . $url . '</loc>' .
      "\n\t\t" . '<lastmod>' . $postdate[0] . '</lastmod>' .
      "\n\t\t" . '<changefreq>' . $freq . '</changefreq>' .
      "\n\t\t" . '<priority>' . $priority . '</priority>' .
      "\n\t" . '</url>' . "\n";
  }
  $sitemap .= '</urlset>';
  $fp = fopen(ABSPATH . 'sitemap.xml', 'w');
  fwrite($fp, $sitemap);
  fclose($fp);
  if ($fp) {
    wp_send_json_success(date("F j, Y g:i A"));
  }
  else {
    wp_send_json_error('N/A');
  }
  wp_die();
}
add_action('wp_ajax__ws_generate_sitemap', '_ws_generate_sitemap');
add_action('wp_ajax_nopriv__ws_generate_sitemap', '_ws_generate_sitemap');
