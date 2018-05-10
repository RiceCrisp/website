<?php
// Fill meta box
function _ws_sitemap_meta_fields() {
  wp_nonce_field(basename(__FILE__), 'sitemap-nonce');
  $sitemap_remove = get_post_meta(get_the_ID(), '_sitemap-remove', true);
  $sitemap_freq = get_post_meta(get_the_ID(), '_sitemap-freq', true);
  $sitemap_priority = get_post_meta(get_the_ID(), '_sitemap-priority', true); ?>
  <div id="social-meta-inside" class="custom-meta-inside">
    <ul>
      <li class="row">
        <div class="col-xs-12">
          <p class="no-margin">Change these fields to overrite the XML sitemap's default values.</p>
        </div>
      </li>
      <li class="row">
        <div class="col-xs-12">
          <label for="sitemap-freq">Change Frequency <small>Default is "Monthly"</small></label>
          <select id="sitemap-freq" name="sitemap-freq">
            <option value="always" <?= $sitemap_freq=='always' ? 'selected' : ''; ?>>Always</option>
            <option value="hourly" <?= $sitemap_freq=='hourly' ? 'selected' : ''; ?>>Hourly</option>
            <option value="daily" <?= $sitemap_freq=='daily' ? 'selected' : ''; ?>>Daily</option>
            <option value="weekly" <?= $sitemap_freq=='weekly' ? 'selected' : ''; ?>>Weekly</option>
            <option value="monthly" <?= $sitemap_freq=='monthly' || empty($sitemap_freq) ? 'selected' : ''; ?>>Monthly</option>
            <option value="yearly" <?= $sitemap_freq=='yearly' ? 'selected' : ''; ?>>Yearly</option>
            <option value="never" <?= $sitemap_freq=='never' ? 'selected' : ''; ?>>Never</option>
          </select>
        </div>
      </li>
      <li class="row">
        <div class="col-xs-12">
          <label for="sitemap-priority">Priority <small>Default is "0.5"</small></label>
          <input id="sitemap-priority" name="sitemap-priority" type="number" min="0" max="1" step="0.1" value="<?= empty($sitemap_priority) ? 0.5 : $sitemap_priority; ?>" />
        </div>
      </li>
      <li class="row">
        <div class="col-xs-12 inline-option">
          <input id="sitemap-remove" name="sitemap-remove" type="checkbox" <?= $sitemap_remove ? 'checked' : ''; ?> />
          <label for="sitemap-remove">Remove page from sitemap</label>
        </div>
      </li>
    </ul>
  </div>
  <?php
}

// Create meta box
function _ws_sitemap_meta() {
  add_meta_box('sitemap-meta-box', 'Sitemap', '_ws_sitemap_meta_fields', get_post_types(), 'normal', 'high');
}
add_action('add_meta_boxes', '_ws_sitemap_meta');

// Save meta values
function _ws_save_sitemap_meta($post_id) {
  if (!isset($_POST['sitemap-nonce']) || !wp_verify_nonce($_POST['sitemap-nonce'], basename(__FILE__))) {
    return $post_id;
  }
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }

  $sitemap_remove = isset($_POST['sitemap-remove']) ? true : false;
  update_post_meta($post_id, '_sitemap-remove', $sitemap_remove);

  $sitemap_freq = isset($_POST['sitemap-freq']) ? $_POST['sitemap-freq'] : '';
  update_post_meta($post_id, '_sitemap-freq', $sitemap_freq);

  $sitemap_priority = isset($_POST['sitemap-priority']) ? $_POST['sitemap-priority'] : '';
  update_post_meta($post_id, '_sitemap-priority', $sitemap_priority);
}
add_action('save_post', '_ws_save_sitemap_meta');

function _ws_sitemap_menu() {
  add_options_page('Sitemap', 'Sitemap', 'manage_options', 'sitemap', '_ws_sitemap_page');
}
add_action('admin_menu', '_ws_sitemap_menu');

function _ws_sitemap_fields() {
  register_setting('sitemap', 'sitemap_manual');
  register_setting('sitemap', 'last_mod');
}
add_action('admin_init', '_ws_sitemap_fields');

// Sitemap page
function _ws_sitemap_page() { ?>
  <div class="wrap options-page sitemap-options">
    <form action="options.php" method="post">
      <h1>Sitemap</h1>
      <?php
			settings_fields('sitemap');
			do_settings_sections('sitemap'); ?>
      <p>The sitemap will be automatically updated when posts are added/deleted/modified, but you will need to crawl all pre-existing posts/pages when first installing the _ws theme. You may also need to regenerate the sitemap if it has gotten out of sync with the current site.</p>
      <p>If you have a large site, sitemap generation can take a while and the automatic generation can make page editing tedious. To prevent this, check the "Disable Automatic Generation". However, if disabled, you will need to manually update the sitemap when desired (button below).</p>
      <div class="inline-option">
    		<button class="button">Regenerate Sitemap</button>
        <div class="flex-1">
          <i class="sitemap-mod">Last Regeneration: <input id="last_mod" name="last_mod" type="text" value="<?= get_option('last_mod') ?: 'N/A'; ?>" readonly /></i>
        </div>
      </div>
      <div class="inline-option">
        <input id="sitemap-manual" name="sitemap_manual" type="checkbox" <?= get_option('sitemap_manual') ? 'checked' : ''; ?> />
        <label for="sitemap-manual">Disable Automatic Generation</label>
      </div>
      <?php submit_button(); ?>
    </form>
  </div>
<?php
}

// function _ws_sitemap_update($id, $post, $update) {
//   $url = get_permalink($id);
//   $postdate = explode(" ", $post->post_modified);
//   $freq = get_post_meta($id, '_sitemap-freq', true) ? get_post_meta($post->ID, '_sitemap-freq', true) : 'monthly';
//   $priority = get_post_meta($id, '_sitemap-priority', true) ? get_post_meta($post->ID, '_sitemap-priority', true) : '0.5';
//   $new = "\t" . '<url>' . "\n" .
//     "\t\t" . '<loc>' . $url . '</loc>' .
//     "\n\t\t" . '<lastmod>' . $postdate[0] . '</lastmod>' .
//     "\n\t\t" . '<changefreq>' . $freq . '</changefreq>' .
//     "\n\t\t" . '<priority>' . $priority . '</priority>' .
//     "\n\t" . '</url>' . "\n";
//   $content = file_get_contents(ABSPATH . 'sitemap.xml');
//   if ($update) {
//     $content = preg_replace('#\t<url>\n\t\t<loc>' . preg_quote($url) . '<\/loc>[\s\S]*?\t<\/url>\n#', $new, $content);
//   }
//   else {
//     $content = $new . $content;
//   }
// }
// add_action('wp_insert_post', '_ws_sitemap_update', 10, 3);
//
// function _ws_sitemap_delete($id) {
//   $url = get_permalink($id);
//   $content = file_get_contents(ABSPATH . 'sitemap.xml');
//   $content = preg_replace('#\t<url>\n\t\t<loc>' . preg_quote($url) . '<\/loc>[\s\S]*?\t<\/url>\n#', '', $content);
// }
// add_action('before_delete_post', '_ws_sitemap_delete');

function _ws_sitemap() {
  if (get_option('sitemap_manual')) {
    return;
  }
  $postsForSitemap = get_posts(array('post_type'=>get_post_types(array('public'=>true)), 'post_status'=>'publish', 'order'=>'DESC', 'orderby'=>'modified', 'posts_per_page'=>-1));
  $sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
  $sitemap .= "\n" . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
  foreach ($postsForSitemap as $post) {
    if (get_post_meta($post->ID, '_sitemap-remove', true)) {
      continue;
    }
    $postdate = explode(" ", $post->post_modified);
    $freq = get_post_meta($post->ID, '_sitemap-freq', true) ?: 'monthly';
    $priority = get_post_meta($post->ID, '_sitemap-priority', true) ?: '0.5';
    $sitemap .= "\t" . '<url>' . "\n" .
      "\t\t" . '<loc>' . get_permalink($post->ID) . '</loc>' .
      "\n\t\t" . '<lastmod>' . $postdate[0] . '</lastmod>' .
      "\n\t\t" . '<changefreq>' . $freq . '</changefreq>' .
      "\n\t\t" . '<priority>' . $priority . '</priority>' .
      "\n\t" . '</url>' . "\n";
  }
  $sitemap .= '</urlset>';
  $fp = fopen(ABSPATH . 'sitemap.xml', 'w');
  fwrite($fp, $sitemap);
  fclose($fp);
}
add_action('save_post', '_ws_sitemap');
