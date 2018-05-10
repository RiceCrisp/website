<?php
// Register project post type
function _ws_project_post_type() {
  $labels = array(
    'name' => 'Projects',
    'singular_name' => 'Project',
    'add_new_item' => 'Add New Project',
    'edit_item' => 'Edit Project',
    'new_item' => 'New Project',
    'view_item' => 'View Project',
    'search_items' => 'Search Projects',
    'not_found' => 'No projects found',
    'not_found_in_trash' => 'No projects found in Trash',
    'parent_item_colon' => 'Parent Project:',
    'all_items' => 'All Projects',
    'archives' => 'Project Archives',
    'insert_into_item' => 'Insert into project',
    'uploaded_to_this_item' => 'Uploaded to this project',
    'featured_image' => 'Featured image',
    'set_featured_image' => 'Set featured image',
    'remove_featured_image' => 'Remove featured image',
    'use_featured_image' => 'Use as featured image'
    );
  $args = array(
    'labels' => $labels,
    'description' => 'Sortable/filterable people',
    'public' => true,
    'exclude_from_search' => false,
    'publicly_queryable' => true,
    'show_ui' => true,
    'show_in_nav_menus' => true,
    'show_in_menu' => true,
    'show_in_admin_bar' => true,
    'menu_position' => 20,
    'menu_icon' => 'dashicons-analytics',
    'capability_type' => 'post',
    'hierarchical' => false,
    'supports' => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'revisions'),
    'register_meta_box_cb' => null,
    'taxonomies' => array('project_type'),
    'has_archive' => false,
    'rewrite' => true,
    'query_var' => true,
    'can_export' => true
    );
  register_post_type('project', $args);
}
add_action('init', '_ws_project_post_type');

// Fill meta box
function _ws_project_meta_fields() {
  wp_nonce_field(basename(__FILE__), "project-nonce");
  $project_url = get_post_meta(get_the_ID(), '_project-url', true);
  $project_btn = get_post_meta(get_the_ID(), '_project-btn', true);
  ?>
  <div id="project-meta-inside" class="custom-meta-inside">
    <ul>
      <li class="row">
        <div class="col-xs-12">
          <label for="project-url">Project URL</label>
          <input id="project-url" name="project-url" type="text" value="<?= $project_url; ?>" />
        </div>
      </li>
      <li class="row">
        <div class="col-xs-12">
          <label for="project-btn">Project Button Text</label>
          <input id="project-btn" name="project-btn" type="text" value="<?= $project_btn; ?>" />
        </div>
      </li>
    </ul>
  </div>
  <?php
}

// Create meta box
function _ws_project_meta() {
  add_meta_box('project_meta', 'Project', '_ws_project_meta_fields', 'project', 'normal', 'high');
}
add_action('admin_init', '_ws_project_meta');

// Save meta values
function _ws_save_project_meta($post_id) {
  if (!isset($_POST['project-nonce']) || !wp_verify_nonce($_POST['project-nonce'], basename(__FILE__))) {
    return $post_id;
  }
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }

  $project_url = isset($_POST['project-url']) ? $_POST['project-url'] : '';
  update_post_meta($post_id, '_project-url', $project_url);

  $project_btn = isset($_POST['project-btn']) ? $_POST['project-btn'] : '';
  update_post_meta($post_id, '_project-btn', $project_btn);
}
add_action("save_post", "_ws_save_project_meta");
