<?php
// Register redirects menu
function _ws_redirects_menu() {
	add_options_page('301 Redirects', '301 Redirects', 'manage_options', 'redirects', '_ws_redirects_page');
}
add_action('admin_menu', '_ws_redirects_menu');

// Register redirects fields
function _ws_redirects_fields() {
  register_setting('redirects', 'redirects');
}
add_action('admin_init', '_ws_redirects_fields');

// Create redirects page
function _ws_redirects_page() {
	?>
	<div class="wrap options-page redirect-options">
		<form action="options.php" method="post">
      <h1>301 Redirects</h1>
      <?php
			settings_fields('redirects');
			do_settings_sections('redirects');
      if (!wp_is_writable(get_home_path() . '.htaccess')) {
        echo '<div class="warning">Your .htaccess file needs to be writable for these options to have any affect.</div>';
      } ?>
      <section <?= !wp_is_writable(get_home_path() . '.htaccess') ? 'class="disabled"' : ''; ?>>
        <p>301 Redirects are an HTTP header that redirects the user, and more importantly, any search engine crawlers from an old url to a new one. For more complex queries (regex), write directly to the .htaccess file.</p>
        <div class="redirect">
          <div class="old">
            <label>Old URL</label>
            <input id="old" type="text" value="" />
          </div>
          <div class="new">
            <label>New URL</label>
            <input id="new" type="text" value="" />
          </div>
          <div class="add">
            <button><span class="dashicons dashicons-plus"></span></button>
          </div>
        </div>
        <ul class="sortable-container">
          <?php
          if ($redirects = get_option('redirects')) :
            foreach (get_option('redirects') as $index=>$redirect): ?>
              <li class="redirect sortable-item">
                <div class="old">
                  <input name="redirects[<?= $index; ?>][old]" type="text" value="<?= $redirect['old']; ?>" readonly />
                </div>
                <div class="new">
                  <input name="redirects[<?= $index; ?>][new]" type="text" value="<?= $redirect['new']; ?>" readonly />
                </div>
                <div class="delete">
                  <button><span class="dashicons dashicons-trash"></span></button>
                </div>
              </li>
            <?php
            endforeach;
          endif; ?>
        </ul>
      </section>
			<?php submit_button(); ?>
		</form>
	</div>
	<?php
}

// Write redirects to htaccess
function _ws_update_redirects($old, $new) {
  $redirects = '';
  if ($new) {
    foreach ($new as $redirect) {
      $redirects .= 'Redirect 301 ' . $redirect['old'] . ' ' . $redirect['new'] . "\n";
    }
  }
  $redirects = substr($redirects, 0, -1);
  insert_with_markers(get_home_path() . '.htaccess', 'Redirects', $redirects);
}
add_action('update_option_redirects', '_ws_update_redirects', 10, 2);
