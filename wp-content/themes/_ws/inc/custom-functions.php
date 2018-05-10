<?php
// Prints taxonomy
function _ws_taxonomies($preCat='Posted in ', $preTag='Tagged ') {
	if (get_post_type() != 'page') {
		/* translators: used between list items, there is a space after the comma */
		$categories_list = get_the_category_list(esc_html__(', ', '_ws'));
		if ($categories_list && _ws_categorized_blog()) {
			printf('<p class="cat-links">' . $preCat . $categories_list . '</p>');
		}

		/* translators: used between list items, there is a space after the comma */
		$tags_list = get_the_tag_list('', esc_html__(', ', '_ws'));
		if ($tags_list) {
			printf('<p class="tags-links">' . $preTag . $tags_list . '</p>');
		}
	}
}

function _ws_categorized_blog() {
	if (false === ($cats = get_transient('_ws_categories'))) {
		// Create an array of all the categories that are attached to posts.
		$cats = get_categories(array(
			'fields'     => 'ids',
			'hide_empty' => 1,
			// We only need to know if there is more than one category.
			'number'     => 2,
		));
		// Count the number of categories that are attached to the posts.
		$cats = count($cats);
		set_transient('_ws_categories', $cats);
	}
	if ($cats > 1) {
		// This blog has more than 1 category so _s_categorized_blog should return true.
		return true;
	} else {
		// This blog has only 1 category so _s_categorized_blog should return false.
		return false;
	}
}

// Display custom taxonomies
function _ws_custom_taxonomies() {
	$post = get_post();
	$post_type = $post->post_type;
	$taxonomies = get_object_taxonomies($post_type, 'objects');
	$output = '<div class="custom-taxonomies">';

	foreach ($taxonomies as $taxonomy_slug=>$taxonomy){
		$terms = get_the_terms($post->ID, $taxonomy_slug);
		if (!empty($terms)) {
			foreach ($terms as $term) {
			 $output .= sprintf('<a class="tax" href="%1$s">%2$s</a>', // list
				 	esc_url(get_term_link($term->slug, $taxonomy_slug)),
				 	esc_html($term->name)
			 	);
			}
		}
	}
	$output .= '</div>';
	return $output;
}

// Get image url by slug
function _ws_get_attachment_url_by_slug($slug) {
  $args = array(
    'post_type' => 'attachment',
    'name' => sanitize_title($slug),
    'posts_per_page' => 1,
    'post_status' => 'inherit'
  );
  $_header = get_posts($args);
  $header = $_header ? array_pop($_header) : null;
  return $header ? wp_get_attachment_url($header->ID) : '';
}

// Get featured image for images
function _ws_thumbnail($id = null, $size = 'large', $lazy = false) {
  if (!$id) {
    global $post;
    if ($post) {
      $id = $post->ID;
    }
    else {
      return;
    }
  }
  if (has_post_thumbnail($id)) {
    $x = get_post_meta($id, '_banner-x', true);
    $y = get_post_meta($id, '_banner-y', true);
    $xy = $x != '' && $y != '' ?  $x . '% ' . $y . '%' : '';
    $output = $lazy ? '<img class="lazy-load" data-src="' . get_the_post_thumbnail_url($id, $size) . '"' : '<img src="' . get_the_post_thumbnail_url($id, $size) . '"';
    $output .= ' alt="' . get_the_title($id) . '" style="object-fit:cover;' . ($xy ? 'object-position:' . $xy . ';' : '') . '" data-object-fit="cover" data-object-position="' . $xy . '" />';
    return $output;
  } else {
    return '';
  }
}

// Get featured image for background images
function _ws_thumbnail_background($id = null, $size = 'full') {
  if (!$id) {
    global $post;
    if ($post) {
      $id = $post->ID;
    }
    else {
      return;
    }
  }
  if (has_post_thumbnail($id)) {
    $x = get_post_meta($id, '_banner-x', true);
    $y = get_post_meta($id, '_banner-y', true);
    $xy = $x != '' && $y != '' ? 'background-position: ' . $x . '% ' . $y . '%;' : '';
    $output = 'background-image: url(' . get_the_post_thumbnail_url($id, $size) . ');' . $xy;
    return $output;
  } else {
    return '';
  }
}

// Custom excerpt function
function _ws_excerpt($id = null, $limit = 190, $end = '[...]') {
  if (!$id) {
    global $post;
    $id = $post->ID;
  }
  if (get_the_excerpt($id) && !empty(get_the_excerpt($id))) {
    $excerpt = get_the_excerpt($id);
  }
  else if (apply_filters('the_content', get_post($id)->post_content)) {
    $excerpt = apply_filters('the_content', get_post($id)->post_content);
  }
  else {
    $excerpt = get_post_meta($id, '_seo-desc', true);
  }
  $excerpt = preg_replace(" (\[.*?\])", '', $excerpt);
  $excerpt = strip_shortcodes($excerpt);
  $excerpt = strip_tags($excerpt);
  if (strlen($excerpt) <= $limit) {
    return $excerpt;
  }
  $excerpt = substr($excerpt, 0, $limit);
  $excerpt = substr($excerpt, 0, strripos($excerpt, " "));
  $excerpt = trim(preg_replace('/\s+/', ' ', $excerpt));
  $excerpt = $excerpt . ' ' . $end;
  return $excerpt;
}

// Get directions button
function _ws_directions_url($id = null) {
  if (!$id) {
    global $post;
    $id = $post->ID;
  }
  $loc_readable = get_post_meta($id, '_location-readable', true);
  $url = 'https://www.google.com/maps/dir/?api=1&destination=' . urlencode(str_replace(' <br>', ', ', $loc_readable));
  return $url;
}

// Function to determine if post is in menu
function _ws_in_menu($menu = null, $object_id = null) {
  $menu_object = wp_get_nav_menu_items(esc_attr($menu));
  if (!$menu_object) {
    return false;
  }
  $menu_items = wp_list_pluck($menu_object, 'object_id');
  if (!$object_id) {
    global $post;
    $object_id = get_queried_object_id();
  }
  return in_array((int)$object_id, $menu_items);
}

// Get author of post by post id
function _ws_get_author($id = null) {
  if (!$id) {
    global $post;
    $id = $post->ID;
  }
  if ($custom_author = get_post_meta($id, '_page-author', true)) {
    return $custom_author;
  }
  $author_id = get_post_field('post_author', $id);
  return get_the_author_meta('display_name', $author_id);
}

// Convert wp_get_nav_menu_items into something useful (turns flat array of menu items into hierarchical array)
function _ws_build_menu(array $elements, $parentId = 0) {
  $branch = array();
  foreach ($elements as $element) {
    if ($element->menu_item_parent == $parentId) {
      $children = _ws_build_menu($elements, $element->ID);
      if ($children) {
        $element->_ws_children = $children;
      }
      $branch[$element->ID] = $element;
      unset($element);
    }
  }
  return $branch;
}
