<?php
/* Template Name: Client Archive */

get_header();
?>
<main class="archive archive-client" template="archive-client">
  <?php get_template_part('template-parts/banner'); ?>
  <div class="archive-content">
  <?php
  if (have_posts()) : while (have_posts()) : the_post(); ?>
    <section class="container row">
      <div class="col-xs-12">
        <?php the_content(); ?>
      </div>
    </section>
  <?php
  endwhile; endif;
  $paged = get_query_var('paged') ? get_query_var('paged') : 1;
	$loop = new WP_Query(array('post_type' => 'client', 'paged' => $paged));
	if ($loop->have_posts()) : ?>
    <section class="container row infinite-scroll-btn">
      <script>var loop = <?= json_encode($loop); ?>;</script>
      <?php
  			while ($loop->have_posts()) : $loop->the_post();
  				get_template_part('template-parts/archive', get_post_type());
  			endwhile;
      endif; wp_reset_postdata();
  		?>
    </section>
  </div>
</main>

<?php get_footer();
