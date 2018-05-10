<?php
get_header(); ?>

<main class="archive archive-post" template="archive-post">
  <?php
  get_template_part('template-parts/banner');
  if (have_posts()) : ?>
  	<div class="archive-content">
      <section class="container row infinite-scroll">
    		<?php
    		while (have_posts()) : the_post();
    			get_template_part('template-parts/archive', get_post_type());
    		endwhile; ?>
      </section>
  	</div>
  <?php
  endif; ?>
</main>

<?php get_footer();
