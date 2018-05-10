<?php
// Build pagebuilder
function _ws_pagebuilder($post) {
  if ($post->post_type != 'page') {
    return;
  }
  wp_nonce_field(basename(__FILE__), 'pagebuilder-nonce');
  $pagebuilders = get_post_meta(get_the_ID(), '_pagebuilder', true);
  global $modules;
  ?>
  <div id="page-builder">
    <h1>Page Builder</h1>
    <button id="add-section" class="button"><span class="dashicons dashicons-plus"></span>Add Section</button>
    <button id="load-section" class="button"><span class="dashicons dashicons-category"></span>Load Section</button>
    <ul id="sections">
      <?php
      if ($pagebuilders) {
        foreach ($pagebuilders as $index=>$section) {
          echo $GLOBALS['section']->output($section);
        }
      }
      ?>
    </ul>
  </div>
  <div id="module-choices" class="lightbox">
    <div class="postbox">
      <div class="lightbox-header">
        <h2 class="lightbox-title">Select type of module</h2>
        <button class="lightbox-cancel"><span class="dashicons dashicons-no-alt"></span></button>
      </div>
      <div class="inside">
        <ul>
          <?php
          foreach ($modules as $module) {
            echo '<li class="module-choice" module="' . $module->slug . '"><p>' . $module->name . '</p><small>' . $module->desc . '</small></li>';
          }
          ?>
        </ul>
      </div>
    </div>
  </div>
  <?php
}
add_action('edit_form_after_editor', '_ws_pagebuilder');

// Save page builder data
function _ws_save_pagebuilder($post_id) {
  if (!isset($_POST["pagebuilder-nonce"]) || !wp_verify_nonce($_POST["pagebuilder-nonce"], basename(__FILE__))) {
    return $post_id;
  }
  if (!current_user_can("edit_post", $post_id)) {
    return $post_id;
  }
  if (defined("DOING_AUTOSAVE") && DOING_AUTOSAVE) {
    return $post_id;
  }

  $pagebuilder = empty($_POST['pagebuilder']) ? '' : $_POST['pagebuilder'];
  update_post_meta($post_id, '_pagebuilder', $pagebuilder);
}
add_action('save_post', '_ws_save_pagebuilder');

// Require Post Meta Revisions plugin
function add_meta_keys($keys) {
  $keys[] = '_pagebuilder';
  return $keys;
}
add_filter('wp_post_revision_meta_keys', 'add_meta_keys');

// Replace content with pagebuilder if it exists
function _ws_show_pagebuilder($content) {
  global $modules;
  $output = '';
  $pagebuilder = get_post_meta(get_the_ID(), '_pagebuilder', true);
  if (empty($pagebuilder)) {
    return $content;
  }
  foreach ($pagebuilder as $index=>$section) {
    $id = empty($section['custom-id']) ? '' : $section['custom-id'];
    $class = empty($section['custom-class']) ? '' : $section['custom-class'];
    $full_width = empty($section['full-width']) ? 'container' : '';
    $bg_color = empty($section['background-color']) ? '' : 'background:' . $section['background-color'];
    $bg_img = empty($section['background-img']) ? '' : $section['background-img'];
    $bg_repeat = empty($section['background-repeat']) ? 'no-repeat' : 'repeat';
    $bg_fixed = empty($section['background-fixed']) ? 'scroll' : 'fixed';
    $bg_size = empty($section['background-repeat']) ? 'background-size:cover;' : 'background-size:auto;';

    $output .= '<section id="' . $id . '" class="pagebuilder-section ' . $class . '" style="background: transparent url(' . $bg_img . ') ' . $bg_repeat . ' ' . $bg_fixed. ';' . $bg_size . '">';
    $output .= '<div class="section-overlay" style="' . $bg_color . '">';
    $output .= '<div class="' . $full_width . ' row">';
    if ($section['col-grid']=='halves') {
      foreach($section as $module) {
        if (is_array($module)) {
          $output .= '<div id="' . $module['custom-id'] . '" class="pagebuilder-module col-xs-6 module-' . $module['module-type'] . ' ' . $module['custom-class'] . '">';
          $output .= $modules[$module['module-type']]->frontend($module);
          $output .= '</div>';
        }
      }
    } else if ($section['col-grid']=='one-third') {
      foreach($section as $index=>$module) {
        if (is_array($module)) {
          $output .= '<div id="' . $module['custom-id'] . '" class="pagebuilder-module col-xs-12 ' . ($index==0 ? 'col-sm-4' : 'col-sm-8') . ' module-' . $module['module-type'] . ' ' . $module['custom-class'] . '">';
          $output .= $modules[$module['module-type']]->frontend($module);
          $output .= '</div>';
        }
      }
    } else if ($section['col-grid']=='two-thirds') {
      foreach($section as $index=>$module) {
        if (is_array($module)) {
          $output .= '<div id="' . $module['custom-id'] . '" class="pagebuilder-module col-xs-12 ' . ($index==0 ? 'col-sm-8' : 'col-sm-4') . ' module-' . $module['module-type'] . ' ' . $module['custom-class'] . '">';
          $output .= $modules[$module['module-type']]->frontend($module);
          $output .= '</div>';
        }
      }
    } else if ($section['col-grid']=='thirds') {
      foreach($section as $module) {
        if (is_array($module)) {
          $output .= '<div id="' . $module['custom-id'] . '" class="pagebuilder-module col-xs-12 col-sm-4 module-' . $module['module-type'] . ' ' . $module['custom-class'] . '">';
          $output .= $modules[$module['module-type']]->frontend($module);
          $output .= '</div>';
        }
      }
    } else {
      foreach($section as $module) {
        if (is_array($module)) {
          $output .= '<div id="' . $module['custom-id'] . '" class="pagebuilder-module col-xs-12 module-' . $module['module-type'] . ' ' . $module['custom-class'] . '">';
          $output .= $modules[$module['module-type']]->frontend($module);
          $output .= '</div>';
        }
      }
    }
    $output .= '</div>';
    $output .= '</div>';
    $output .= '</section>';
  }
  return $output;
}
add_filter('the_content', '_ws_show_pagebuilder');

// Ajax empty module
function _ws_empty_module() {
  global $modules;
  $mod = $_REQUEST['module'];
  echo $modules[$mod]->output(array('module-type' => $mod));
  wp_die();
}
add_action('wp_ajax_empty_module', '_ws_empty_module');

// Ajax empty section
function _ws_empty_section() {
  global $section;
  echo $section->output(null);
  wp_die();
}
add_action('wp_ajax_empty_section', '_ws_empty_section');

// Ajax save section
function _ws_save_section() {
  $res = array();
  $new_obj = json_decode(stripslashes($_REQUEST['section']), true);
  if (get_option('pb_sections')) {
    $res = json_decode(get_option('pb_sections'), true);
    foreach ($res as $section) {
      if ($section['section-name']==$new_obj['section-name']) {
        echo 'err';
        wp_die();
      }
    }
  }
  array_push($res, $new_obj);
  update_option('pb_sections', json_encode($res));
  wp_die();
}
add_action('wp_ajax_save_section', '_ws_save_section');

// Ajax get saved sections
function _ws_get_sections() {
  $json = json_decode(get_option('pb_sections'), true);
  $res = '<ul class="saved-sections">';
  foreach ($json as $index=>$section) {
    $res .= '<li index="' . $index . '"><button class="button">' . $section['section-name'] . '</button><a href="#">Delete</a></li>';
  }
  $res .= '</ul>';
  if (!$json) {
    $res = '<p>There are no saved sections. To save a section for later use, click the <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z" />
  </svg> icon.</p>';
}
echo $res;
wp_die();
}
add_action('wp_ajax_get_sections', '_ws_get_sections');

// Ajax load saved section
function _ws_load_section() {
  global $modules;
  $json = json_decode(get_option('pb_sections'), true);
  $section = $json[$_REQUEST['section']];
  $res = $GLOBALS['section']->output($section);
  echo $res;
  wp_die();
}
add_action('wp_ajax_load_section', '_ws_load_section');

// Ajax delete saved section
function _ws_delete_section() {
  $json = json_decode(get_option('pb_sections'), true);
  array_splice($json, $_REQUEST['section'], 1);
  update_option('pb_sections', json_encode($json));
  wp_die();
}
add_action('wp_ajax_delete_section', '_ws_delete_section');
