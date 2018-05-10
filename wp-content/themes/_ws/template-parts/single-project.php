<article id="post-<?php the_ID(); ?>" <?php post_class('post-single'); ?>>
  <?php get_template_part('template-parts/banner'); ?>
  <div class="single-content">
    <div class="container row">
      <div class="col-lg-4">
        <div class="single-info">
          <div class="featured-img">
            <?= _ws_thumbnail(get_the_ID(), 'standard'); ?>
          </div>
          <a class="btn" href="<?= get_post_meta(get_the_ID(), '_project-url', true); ?>" target="_blank"><?= get_post_meta(get_the_ID(), '_project-btn', true) ?: 'View Project'; ?></a>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="single-text">
          <?php
          the_content();
          wp_link_pages(array(
            'before' => '<div class="page-links">' . esc_html__('Pages:', '_ws'),
            'after' => '</div>'
          ));
          ?>
        </div>
      </div>
    </div>
  </div>
</article>
