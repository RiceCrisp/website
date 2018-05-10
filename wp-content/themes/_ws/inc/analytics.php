<?php
// Register tracking and analytics menu
function _ws_analytics_menu() {
	add_options_page('Tracking &amp; Analytics', 'Tracking &amp; Analytics', 'manage_options', 'analytics', '_ws_analytics_page');
}
add_action('admin_menu', '_ws_analytics_menu');

// Register tracking and analytics fields
function _ws_analytics_fields() {
  register_setting('analytics', 'google_analytics_id');
  register_setting('analytics', 'google_remarketing_id');
  register_setting('analytics', 'advanced_tracking_head');
  register_setting('analytics', 'advanced_tracking_footer');
}
add_action('admin_init', '_ws_analytics_fields');

// Create tracking and analytics page
function _ws_analytics_page() { ?>
	<div class="wrap options-page analytics-options">
		<form action="options.php" method="post">
			<h1>Tracking &amp; Analytics</h1>
			<?php
			settings_fields('analytics');
			do_settings_sections('analytics'); ?>
      <section>
        <h2>Google Analytics</h2>
        <p>Configuration for Google Analytics scripts.</p>
        <label for="google_analytics_id">Google Analytics ID</label>
        <input id="google_analytics_id" name="google_analytics_id" type="text" value="<?= get_option('google_analytics_id'); ?>" />
        <label for="google_remarketing_id">Google Remarketing ID</label>
        <input id="google_remarketing_id" name="google_remarketing_id" type="text" value="<?= get_option('google_remarketing_id'); ?>" />
      </section>
      <section>
        <h2>Advanced</h2>
        <p>Insert third party code or advanced Google scripts in the head or footer.<br /><i>Note: You'll need to include the &lt;script&gt; tags as they are not automatically added to these fields.</i></p>
        <label for="advanced_tracking_head">Additional Scripts - Head</label>
        <textarea id="advanced_tracking_head" name="advanced_tracking_head"><?= get_option('advanced_tracking_head'); ?></textarea>
        <label for="advanced_tracking_footer">Additional Scripts - Footer</label>
        <textarea id="advanced_tracking_footer" name="advanced_tracking_footer"><?= get_option('advanced_tracking_footer'); ?></textarea>
      </section>
			<input name="Submit" type="submit" class="button-primary" value="Save Changes" />
		</form>
	</div>
	<?php
}

// Add tracking codes to the header
function _ws_analytics_header() {
  $google_analytics_id = get_option('google_analytics_id');
	$google_remarketing_id = get_option('google_remarketing_id');
  $head = get_option('advanced_tracking_head', '');
  if ($google_analytics_id) : ?>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', '<?php echo $google_analytics_id; ?>', 'auto');
      ga('send', 'pageview');
    </script>
  <?php
  endif;
	if ($google_remarketing_id) : ?>
		<script type="text/javascript">
		/* <![CDATA[ */
		var google_conversion_id = <?= $google_remarketing_id; ?>;
		var google_custom_params = window.google_tag_params;
		var google_remarketing_only = true;
		/* ]]> */
		</script>
		<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
		</script>
		<noscript>
		<div style="display:inline;">
		<img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/1005755461/?value=0&amp;guid=ON&amp;script=0"/>
		</div>
		</noscript>
	<?php
  endif;
  echo $head;
}
add_action('wp_head', '_ws_analytics_header');

// Add tracking codes to the footer
function _ws_analytics_footer() {
  $footer = get_option('advanced_tracking_footer', '');
  echo $footer;
}
add_action('wp_footer', '_ws_analytics_footer');
