<?php
class Card extends Module {
  public $slug = 'card';
  public $name = 'Card';
  public $desc = 'Card Image, Card URL, Card Title, Card Text';
  public function backend($pb) {
    return
    '<li>
    <label for="card-img-0-0">Card Image</label>
    <div class="flex-row">
      <button class="button media-selector" target="#card-img-0-0">Select Image</button>
      <input id="card-img-0-0" class="flex-1" name="pagebuilder[0][0][card-img]" type="text" value="' . $pb['card-img'] . '" />
    </div>
  </li>
  <li>
    <label for="card-url-0-0">Card URL</label>
    <input id="card-url-0-0" name="pagebuilder[0][0][card-url]" type="text" value="' . $pb['card-url'] . '" />
  </li>
  <li>
    <label for="card-title-0-0">Card Title</label>
    <input id="card-title-0-0" name="pagebuilder[0][0][card-title]" type="text" value="' . $pb['card-title'] . '" />
  </li>
  <li>
    <label for="card-text-0-0">Card Text</label>
    <textarea id="card-text-0-0" name="pagebuilder[0][0][card-text]">' . $pb['card-text'] . '</textarea>
  </li>';
  }
  public function frontend($pb) {
    return
    '<div class="card">
      <div class="card-img" style="background-image:url('.$pb['card-img'].')"></div>
      <div class="card-content">
        <h3 class="card-title">' . $pb['card-title'] . '</h3>
        <p class="card-text">' . $pb['card-text'] . '</p>
      </div>
    </div>';
  }
}
$modules['card'] = new Card();
