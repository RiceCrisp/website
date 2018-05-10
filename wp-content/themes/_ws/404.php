<?php get_header(); ?>

<main class="page error">
	<header class="page-header">
    <div class="container row">
      <h1 class="page-title col-xs-12"><?php esc_html_e('Not Found', '_ws'); ?></h1>
    </div>
  </header>
  <div class="single-content">
    <div class="container row">
      <div class="col-xs-12">
        <p>It seems we can't find what you're looking for. Perhaps searching can help.</p>
        <?php get_search_form(); ?>
      </div>
    </div>
  </div>
</main>
<script type="text/javascript">
  ga('send', 'event', 'error', '404', 'page: ' + document.location.pathname + document.location.search + ' ref: ' + document.referrer, undefined, {nonInteraction: true});
</script>

<?php
get_footer();
