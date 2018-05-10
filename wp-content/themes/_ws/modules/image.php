<?php
class Image extends Module {
  public $slug = 'image';
  public $name = 'Image';
  public $desc = 'Image, Image Link URL';
  public function backend($pb) {
    return
    '<li>
      <label for="image-0-0">Image</label>
      <div class="row">
        <button class="button media-selector" target="#image-0-0">Select Image</button>
        <input id="image-0-0" class="flex-1" name="pagebuilder[0][0][image]" type="text" value="' . $pb['image'] . '" />
      </div>
    </li>
    <li>
      <label for="image-url-0-0">Image Link</label>
      <input id="image-url-0-0" name="pagebuilder[0][0][image-url]" type="text" value="' . $pb['image-url'] . '" />
    </li>';
  }
  public function frontend($pb) {
    $output = '';
    if ($pb['image-url']) {
      $output = '<a href="' . $pb['image-url'] . '"><img src="' . $pb['image'] . '" /></a>';
    } else {
      $output = '<img src="' . $pb['image'] . '" />';
    }
    return $output;
  }
}
$modules['image'] = new Image();
