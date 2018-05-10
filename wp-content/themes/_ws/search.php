<?php get_header(); ?>

<main class="search">
	<?php if (have_posts()) :
	get_template_part('template-parts/banner'); ?>
  <div class="archive-content">
    <div class="container row infinite-scroll">
	  <?php while (have_posts()) : the_post(); ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class('result col-xs-12'); ?>>
				<header class="result-header">
					<h2 class="result-title"><a href="<?= get_permalink(); ?>"><?= get_the_title(); ?></a></h2>
				</header>
				<div class="result-summary">
					<?php the_excerpt(); ?>
				</div>
			</article>
	  <?php endwhile; ?>
    </div>
  </div>
	<?php else : ?>
	<div class="no-results">
		<?php get_template_part('template-parts/banner'); ?>
		<div class="archive-content">
			<div class="container row">
				<div class="col-xs-12">
					<p>Sorry, but nothing matched your search terms. Please try again with some different keywords.</p>
					<?php get_search_form(); ?>
				</div>
			</div>
		</div>
	</div>
	<?php endif; ?>
</main>

<?php
get_footer();
