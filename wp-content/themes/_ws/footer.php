<footer id="site-footer">
  <?php
  if (is_active_sidebar('footer')) : ?>
    <div class="footer-widgets-area">
      <div class="container">
        <ul class="footer-widgets row">
          <?php dynamic_sidebar('footer'); ?>
        </ul>
      </div>
    </div>
  <?php
  endif;
  if (has_nav_menu('footer')) {
    wp_nav_menu(array('theme_location'=>'footer', 'container_class'=>'footer-menu', 'menu_class'=>'container', 'item_spacing'=>'discard'));
  } ?>
  <div class="copyright">
    <div class="container row">
      <div class="col-xs">
        <p>Copyright &copy; <?= date('Y'); ?>. All rights reserved. Walker Sands Communications</p>
      </div>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>

</body>
</html>
