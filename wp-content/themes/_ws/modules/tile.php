<?php
class Tile extends Module {
  public $slug = 'tile';
  public $name = 'Tile';
  public $desc = 'Image, URL, Hover Color, Title, Text';
  public function backend($pb) {
    return
    '<li>
      <label for="tile-img-0-0">Tile Image</label>
      <div class="flex-row">
        <button class="button media-selector" target="#tile-img-0-0">Select Image</button>
        <input id="tile-img-0-0" class="flex-1" name="pagebuilder[0][0][tile-img]" type="text" value="' . $pb['tile-img'] . '" />
      </div>
    </li>
    <li>
      <label for="tile-url-0-0">Tile URL</label>
      <input id="tile-url-0-0" name="pagebuilder[0][0][tile-url]" type="text" value="' . $pb['tile-url'] . '" />
    </li>
    <li>
      <label for="tile-color-0">Tile Color</label>
      <input id="tile-color-0" class="color-picker" data-alpha="true" name="pagebuilder[0][0][tile-color]" type="text" value="' . $pb['tile-color'] . '" />
    </li>
    <li>
      <label for="tile-title-0-0">Tile Title</label>
      <input id="tile-title-0-0" name="pagebuilder[0][0][tile-title]" type="text" value="' . $pb['tile-title'] . '" />
    </li>
    <li>
      <label for="tile-text-0-0">Tile Text</label>
      <textarea id="tile-text-0-0" name="pagebuilder[0][0][tile-text]">' . $pb['tile-text'] . '</textarea>
    </li>';
  }
  public function frontend($pb) {
    return
    '<a href="' . $pb['tile-url'] . '">
      <div class="tile-bg" style="background-image:url(' . $pb['tile-img'] . ')">
        <div class="tile-content" style="background-color:' . $pb['tile-color'] . '">
          <h3 class="tile-title">' . $pb['tile-title'] . '</h3>
          <p class="tile-text">' . $pb['tile-text'] . '</p>
        </div>
      </div>
    </a>';
  }
}
$modules['tile'] = new Tile();
