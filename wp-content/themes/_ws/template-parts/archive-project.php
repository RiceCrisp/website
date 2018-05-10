<div class="col-md-6">
  <a href="<?= get_permalink(); ?>">
    <div id="post-<?php the_ID(); ?>" <?php post_class('archive-grid ' . get_post_type()); ?>>
      <?php if ($img = _ws_thumbnail(get_the_ID(), 'standard', true)) : ?>
        <div class="featured-img">
          <?= $img; ?>
        </div>
      <?php endif; ?>
        <div class="post-description">
          <h3><?= get_the_title(); ?></h3>
          <?= _ws_excerpt(); ?>
        </div>
    </div>
  </a>
</div>
