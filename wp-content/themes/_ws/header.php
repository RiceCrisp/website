<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#D64123">
  <link rel="profile" href="http://gmpg.org/xfn/11">

  <link rel="preload" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" as="style" />
  <link rel="preload" href="/wp-content/themes/_ws/dist/css/wp/wp.min.css?ver=1.0" as="style" />
  <link rel="preload" href="/wp-content/themes/_ws/dist/js/wp/wp.min.js?ver=1.0" as="script" />

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <header id="site-header" class="fixed">
    <div class="container row">
      <div class="logo-title">
        <?php
        if (has_custom_logo()) : ?>
          <div class="logo"><?php the_custom_logo(); ?></div>
        <?php
        else : ?>
          <h1 class="site-title"><a href="<?= esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a></h1>
        <?php
        endif; ?>
      </div>
      <input id="hamburger" type="checkbox" />
      <label for="hamburger" class="hamburger">
        <svg viewBox="0 0 100 100" rel="img">
          <title>Menu</title>
          <path class="closed" d="M10 22 L90 22 M10 50 L90 50 M10 78 L90 78" />
          <path class="opened" d="M20 20 L80 80 Z M80 20 L20 80 Z" />
        </svg>
      </label>
      <div class="menu-container">
        <?php
        wp_nav_menu(array(
          'theme_location'=>'header',
          'container'=>'nav',
          'container_class'=>'header-menu',
          // 'walker' => new WPDocs_Walker_Nav_Menu(),
          'fallback_cb' => false,
          'item_spacing'=>'discard'
        )); ?>
      </div>
    </div>
  </header>
