<?php
class LatestPosts extends Module {
  public $slug = 'latest';
  public $name = 'Latest Posts';
  public $desc = 'Post Type, Display Type, Number of Posts';
  public function backend($pb) {
    $post_type_options = '';
    foreach (get_post_types(array('public'=>true), 'objects') as $post_type) {
      if ($post_type->name == 'page' || $post_type->name == 'attachment') {
        continue;
      }
      $post_type_options .= '<option value="' . $post_type->name . '" ' . ($pb['post-type']==$post_type->name ? 'selected' : '') . '>' . $post_type->labels->name . '</option>';
    }
    return
    '<li>
      <label for="post-type-0-0">Post Type</label>
      <select id="post-type-0-0" name="pagebuilder[0][0][post-type]">'
        . $post_type_options .
      '</select>
    </li>
    <li>
      <label for="display-type-0-0">Display Type</label>
      <select id="display-type-0-0" name="pagebuilder[0][0][display-type]">
        <option value="list" ' . ($pb['display-type']=='list' ? 'selected' : '') . '>List</option>
        <option value="grid" ' . ($pb['display-type']=='grid' ? 'selected' : '') . '>Grid</option>
        <option value="cards" ' . ($pb['display-type']=='cards' ? 'selected' : '') . '>Cards</option>
      </select>
    </li>
    <li>
      <label for="number-posts-0-0">Number of Posts</label>
      <input id="number-posts-0-0" name="pagebuilder[0][0][number-posts]" type="number" min="1" value="' . ($pb['number-posts'] ? $pb['number-posts'] : '3') . '"/>
    </li>';
  }
  public function frontend($pb) {
    $posts = get_posts(array('post_type'=>$pb['post-type']));
    $max = $pb['number-posts'];
    // List display
    if ($pb['display-type']=='list') {
      $output = '<ul class="latest-posts-list">';
      foreach ($posts as $index=>$post) {
        if ($index==$max) {
          break;
        }
        $content = wp_trim_words($post->post_content, 55, '...');
        $excerpt = $post->post_excerpt ? ('<p class="excerpt">' . $post->post_excerpt . '</p>') : $content ? ('<p class="excerpt">' . $content . '</p>') : '';
        $output .= '<li><a href="' . get_permalink($post->ID) . '"><h2>' . $post->post_title . '</h2></a>' . get_the_post_thumbnail($post->ID) . $excerpt . '</li>';
      }
      $output .= '</ul>';
      return $output;
    }
    // Grid Display
    else if ($pb['display-type']=='grid') {
      $output = '<ul class="latest-posts-grid">';
      foreach ($posts as $index=>$post) {
        if ($index==$max) {
          break;
        }
        $content = wp_trim_words($post->post_content, 55, '...');
        $excerpt = $post->post_excerpt ? ('<p class="grid-text">' . $post->post_excerpt . '</p>') : $content ? ('<p class="grid-text">' . $content . '</p>') : '';
        $output .= '<li class="grid-bg" style="background-image:url(' . get_the_post_thumbnail_url($post->ID) . ')"><div class="grid-content"><h2 class="grid-title">' . $post->post_title . '</h2>' . $excerpt . '<a href="' . get_permalink($post->ID) . '">Read More</a></div></li>';
      }
      $output .= '</ul>';
      return $output;
    }
    // Cards display
    else if ($pb['display-type']=='cards') {
      $output = '<ul class="latests-posts-cards">';
      foreach ($posts as $index=>$post) {
        if ($index==$max) {
          break;
        }
        $content = wp_trim_words($post->post_content, 55, '...');
        $excerpt = $post->post_excerpt ? ('<p class="card-text">' . $post->post_excerpt . '</p>') : $content ? ('<p class="card-text">' . $content . '</p>') : '';
        $output .= '<li class="card-container"><div class="card"><img class="card-img" src="' . get_the_post_thumbnail_url($post->ID) . '" /><div class="card-content"><h2 class="card-title">' . $post->post_title . '</h2>' . $excerpt . '<a href="' . get_permalink($post->ID) . '">Read More</a></div></div></li>';
      }
      $output .= '</ul>';
      return $output;
    } else {
      $output = '';
      foreach ($posts as $index=>$post) {
        if ($index==$max) {
          break;
        }
        $output .= '<div><h2>' . get_the_title() . '</h2></div>';
      }
      return $output;
    }
  }
}
$modules['latest'] = new LatestPosts();
