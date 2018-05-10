<?php
date_default_timezone_set('America/New_York');
@ini_set('upload_max_filesize', '64M');
@ini_set('post_max_size', '64M');
@ini_set('max_execution_time', '60');

function _ws_setup() {
	// Make theme available for translation.
	load_theme_textdomain('_ws', get_template_directory() . '/languages');

	add_theme_support('custom-logo');
	add_theme_support('post-thumbnails');
	// set_post_thumbnail_size(250, 250);
	add_image_size('standard', 576, 576);
	add_theme_support('html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption'
	));

  // Add excerpt support for pages
  add_post_type_support('page', 'excerpt');

	// Register nav locations
	register_nav_menus(array(
		'header' => esc_html__('Header', '_ws'),
		'footer' => esc_html__('Footer', '_ws')
	));

	// Remove junk from head
  remove_action('wp_head', 'wp_generator'); // Wordpress version
	remove_action('wp_head', 'rsd_link'); // Really Simple Discovery
	remove_action('wp_head', 'wlwmanifest_link'); // Windows Live Writer
	remove_action('wp_head', 'print_emoji_detection_script', 7); // Emojis :(
	remove_action('wp_print_styles', 'print_emoji_styles'); // Emojis :(
	remove_action('wp_head', 'wp_shortlink_wp_head'); // Page shortlink
	remove_action('wp_head', 'start_post_rel_link'); // Navigation links
  remove_action('wp_head', 'parent_post_rel_link'); // Navigation links
	remove_action('wp_head', 'index_rel_link'); // Navigation links
	remove_action('wp_head', 'adjacent_posts_rel_link'); // Navigation links
  remove_action('wp_head', 'rest_output_link_wp_head'); // JSON
  remove_action('wp_head', 'wp_oembed_add_discovery_links'); // JSON
	remove_action('wp_head', 'rel_canonical'); // If there's more than one canonical, neither will work, so we remove the default one and use ours

  // Enable shortcodes in widgets
  add_filter('widget_text', 'do_shortcode');
}
add_action('after_setup_theme', '_ws_setup');

// Add custom image size
function _ws_custom_sizes($sizes) {
  return array_merge($sizes, array(
    'standard' => 'Standard'
  ));
}
add_filter('image_size_names_choose', '_ws_custom_sizes');

// Remove trackback/pingback support
function _ws_remove_post_support() {
	remove_post_type_support('post', 'trackbacks');
}
add_action('init', '_ws_remove_post_support');

// Remove jquery migrate script
function _ws_remove_jquery_migrate($scripts) {
	if (!is_admin()) {
		$scripts->remove('jquery');
		$scripts->add('jquery', false, array('jquery-core'), '1.10.2');
	}
}
add_filter('wp_default_scripts', '_ws_remove_jquery_migrate');

// Disable author archives
function _ws_disable_author_archives() {
	if (is_author()) {
		global $wp_query;
		$wp_query->set_404();
		status_header(404);
	} else {
		redirect_canonical();
	}
}
remove_filter('template_redirect', 'redirect_canonical');
add_action('template_redirect', '_ws_disable_author_archives');

// Register scripts/styles
function _ws_register_scripts() {
  wp_register_style('font-css', 'https://fonts.googleapis.com/css?family=Lora|Open+Sans:300,400,700', array(), null);
	wp_register_style('wp-css', get_template_directory_uri() . '/dist/css/wp/wp.min.css', array(), '1.0');
	wp_register_style('admin-css', get_template_directory_uri() . '/dist/css/admin/admin.min.css', array(), '1.0');
	wp_register_style('jquery-ui-css', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css');

  wp_register_script('jquery-ui', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js', array('jquery'), false, true);
	wp_register_script('google-maps', 'https://maps.googleapis.com/maps/api/js?key=' . (get_option('google_maps') ?: 'AIzaSyB5dOtdhz53nCEusX4aU4yRKkOGns_Dsn8') . '&libraries=places&callback=initMap', array(), false, true);
	wp_register_script('wp-js', get_template_directory_uri() . '/dist/js/wp/wp.min.js', array(), '1.0', true);
	wp_register_script('admin-js', get_template_directory_uri() . '/dist/js/admin/admin.min.js', array('jquery', 'jquery-ui', 'wp-color-picker'), '1.0', true);
	wp_register_script('pagebuilder-js', get_template_directory_uri() . '/dist/js/admin/pagebuilder.min.js', array('jquery', 'jquery-ui'), '1.0', true);
	wp_register_script('event-js', get_template_directory_uri() . '/dist/js/admin/event.min.js', array('jquery', 'jquery-ui'), '1.0', true);
  wp_register_script('options-js', get_template_directory_uri() . '/dist/js/admin/options.min.js', array('jquery'), '1.0', true);
}
add_action('wp_loaded', '_ws_register_scripts');

// Make frontend javascript asynchronous
function _ws_script_attribute($tag, $handle) {
  if ($handle == 'wp-js') {
    return str_replace(' src', ' async src', $tag);
  }
  return $tag;
}
add_filter('script_loader_tag', '_ws_script_attribute', 10, 2);

// Enqueue frontend scripts/styles
function _ws_wp_enqueue() {
  wp_deregister_script('jquery'); // Remove jquery on frontend
  // wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', array(), false, true); // Use cdn jquery if you must
  wp_deregister_script('wp-embed'); // Remove embed script

	global $post_type;
  global $wp_query;
  wp_enqueue_style('font-css');
	wp_enqueue_style('wp-css');
  wp_localize_script('wp-js', 'locals', array(
    'ajax_url' => admin_url('admin-ajax.php'),
    'wp_query' => $wp_query
  ));
  wp_enqueue_script('wp-js');
	// if ($post_type == 'event') {
	// 	wp_enqueue_script('google-maps', '', array('wp-js'));
	// }
}
add_action('wp_enqueue_scripts', '_ws_wp_enqueue');

// Enqueue admin scripts/styles
function _ws_admin_enqueue($hook) {
	global $post_type;
	wp_enqueue_style('admin-css');
	wp_enqueue_style('jquery-ui-css');
	wp_enqueue_style('wp-color-picker');

	wp_enqueue_media();
  wp_localize_script('admin-js', 'locals', array(
		'ajax_url' => admin_url('admin-ajax.php')
	));
	wp_enqueue_script('admin-js');
	// Pages that need google maps api
	if ($post_type == 'event') {
		if ($hook == 'post-new.php' || $hook == 'post.php') {
			wp_enqueue_script('event-js');
			wp_enqueue_script('google-maps', '', array('event-js'));
		}
	} else if ($hook == 'settings_page_site') {
    wp_enqueue_script('options-js');
    wp_enqueue_script('google-maps', '', array('options-js'));
  }
	// Pagebuilder script
	if ($post_type == 'page') {
		global $modules;
    wp_enqueue_editor();
		wp_localize_script('pagebuilder-js', 'pbInfo', array(
			'ajax_url' => admin_url('admin-ajax.php')
		));
		wp_enqueue_script('pagebuilder-js');
	}
}
add_action('admin_enqueue_scripts', '_ws_admin_enqueue');

// Register widget areas
function _ws_register_widget_areas() {
	register_sidebar(array(
		'name' => 'Sidebar',
		'id' => 'sidebar',
		'description' => 'Widgets in this area will appear on pages with a left or right sidebar'
	));
	register_sidebar(array(
		'name' => 'Footer',
		'id' => 'footer',
		'description' => 'Widgets in this area will appear in the footer'
	));
}
add_action('widgets_init', '_ws_register_widget_areas');

// Set excerpt length
function _ws_excerpt_length($length) {
  return 35;
}
add_filter('excerpt_length', '_ws_excerpt_length', 999);

// Custom post types
foreach (glob(get_template_directory() . '/post-types/*.php') as $filename) {
	require_once $filename;
}

// Custom taxonomies
foreach (glob(get_template_directory() . '/taxonomies/*.php') as $filename) {
	require_once $filename;
}

require_once(get_template_directory() . '/modules/module.php'); // Module.php needs to be loaded first
// Page Builder modules
foreach (glob(get_template_directory() . '/modules/*.php') as $filename) {
	require_once $filename;
}

// Miscellaneous files
foreach (glob(get_template_directory() . '/inc/*.php') as $filename) {
	require_once $filename;
}
