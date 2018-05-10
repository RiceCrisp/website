<article id="post-<?php the_ID(); ?>" <?php post_class('post-single'); ?>>
  <?php get_template_part('template-parts/banner'); ?>
  <div class="single-content">
    <div class="container row">
      <div class="col-xs-12">
        <?php the_content(); ?>
      </div>
    </div>
  </div>
  <footer class="single-footer">
    <div class="container row">
      <div class="col-xs-12">
        <?= _ws_taxonomies(); ?>
        <?= _ws_custom_taxonomies(); ?>
      </div>
    </div>
  </footer>
</article>
