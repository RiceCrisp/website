<article id="post-<?php the_ID(); ?>" <?php post_class('page page-content'); ?>>
  <div class="container row">
    <div class="col-xs-12">
      <?php
      the_content();
      wp_link_pages(array(
        'before' => '<div class="page-links">' . esc_html__('Pages:', '_ws'),
        'after' => '</div>',
      )); ?>
    </div>
  </div>
</article>
