<?php get_header(); ?>

<main class="archive archive-<?= get_post_type(); ?>">
	<?php
  get_template_part('template-parts/banner');
	if (have_posts()) : ?>
		<div class="archive-content">
			<div class="container row">
				<?php
        while (have_posts()) : the_post();
  				get_template_part('template-parts/archive');
  				if (comments_open() || get_comments_number()) {
  					comments_template();
          }
				endwhile; ?>
			</div>
		</div>
		<div id="post-navigation">
			<div class="container row">
				<div class="col-xs-12">
					<?php the_posts_navigation(); ?>
				</div>
			</div>
		</div>
		<?php
		endif; ?>
	</main>

	<?php
	get_footer();
