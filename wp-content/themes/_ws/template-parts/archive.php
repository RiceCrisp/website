<div class="col-xs-12">
  <div id="post-<?php the_ID(); ?>" <?php post_class('archive-grid' . ' ' . get_post_type()); ?>>
  <?php
  if (has_post_thumbnail()) : ?>
    <div class="img" style="background-image:url(<?= the_post_thumbnail_url('large'); ?>)"></div>
  <?php
  endif; ?>
    <div class="content">
      <h2><a href="<?= get_permalink(); ?>"><?= get_the_title(); ?></a></h2>
      <?= _ws_taxonomies(); ?>
      <?= _ws_excerpt(); ?>
    </div>
  </div>
</div>
