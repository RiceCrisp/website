<?php
/* Template Name: Project Archive */

get_header();
?>
<main class="archive archive-project" template="archive-project">
  <?php get_template_part('template-parts/banner'); ?>
  <div class="archive-content">
    <?php
    if (have_posts()) : while (have_posts()) : the_post(); ?>
      <!-- <section class="container row">
        <div class="col-xs-12">
          <?php the_content(); ?>
        </div>
      </section> -->
    <?php
    endwhile; endif;
    $paged = get_query_var('paged') ? get_query_var('paged') : 1;
  	$loop = new WP_Query(array('post_type'=>'project', 'post_status'=>'publish', 'paged'=>$paged));
  	if ($loop->have_posts()) : ?>
      <section class="container row <?= $loop->max_num_pages > 1 ? 'infinite-scroll' : ''; ?>">
        <input class="loop-var" type="hidden" value="<?= htmlentities(json_encode($loop)); ?>" />
        <?php
    		while ($loop->have_posts()) : $loop->the_post();
    			get_template_part('template-parts/archive', get_post_type());
    		endwhile; ?>
      </section>
    <?php
    endif; wp_reset_postdata(); ?>
  </div>
</main>

<?php get_footer();
