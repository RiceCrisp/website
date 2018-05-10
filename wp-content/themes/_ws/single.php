<?php get_header(); ?>
<main class="single">
	<?php
	if (have_posts()) : while (have_posts()) : the_post();

		get_template_part('template-parts/single', get_post_type()); ?>

		<!-- <div id="post-navigation">
			<div class="container row">
				<div class="col-xs-12">
					<?php the_post_navigation(); ?>
				</div>
			</div>
		</div> -->

		<?php
		// If comments are open or we have at least one comment, load up the comment template.
		if (comments_open() || get_comments_number()) :
			comments_template();
		endif;

	endwhile; endif;
	?>
</main>

<?php
get_footer();
