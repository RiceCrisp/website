<?php
// Register project type taxonomy
function _ws_register_project_type() {
  $labels = array(
    'name' => 'Project Types',
    'singular_name' => 'Project Type',
    'all_items' => 'All Project Types',
    'edit_item' => 'Edit Project Type',
    'view_item' => 'View Project Type',
    'update_item' => 'Update Project Type',
    'add_new_item' => 'Add New Project Type',
    'new_item_name' => 'New Project Type Name',
    'parent_item' => 'Parent Project Type',
    'parent_item_colon' => 'Parent Project Type:',
    'search_items' => 'Search Project Types',
    'popular_items' => 'Popular Project Types',
    'separate_items_with_commas' => 'Separate project types with commas',
    'add_or_remove_items' => 'Add or remove project types',
    'choose_from_most_used' => 'Choose from the most used project types',
    'not_found' => 'No project types found.'
  );
  register_taxonomy(
    'project_type',
    array('project'),
    array(
      'labels' => $labels,
      'public' => true,
      'show_ui' => true,
      'show_in_menus' => true,
      'show_in_nav_menus' => true,
      'show_tagcloud' => false,
      'show_in_quick_edit' => true,
      'meta_box_cb' => null,
      'show_admin_column' => true,
      'description' => 'Taxonomy for projects',
      'hierarchical' => true,
      'query_var' => true,
      'rewrite' => true,
      'capabilities' => array(),
      'sort' => false
    )
  );
}
add_action('init', '_ws_register_project_type');
