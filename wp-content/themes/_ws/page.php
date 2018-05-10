<?php
get_header();
$pagebuilder = get_post_meta(get_the_ID(), '_pagebuilder', true); ?>

<main class="page <?= $pagebuilder ? 'pagebuilder' : ''; ?>">
	<?php
  get_template_part('template-parts/banner');
	if (have_posts()) : while (have_posts()) : the_post();
		if ($pagebuilder) {
			the_content();
		} else {
			get_template_part('template-parts/page');
		}
	endwhile; endif; ?>
</main>

<?php get_footer(); ?>
