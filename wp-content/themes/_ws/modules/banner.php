<?php
class Banner extends Module {
  public $slug = 'banner';
  public $name = 'Banner';
  public $desc = 'Title, Text, Button Text, Button URL';
  public function backend($pb) {
    return
    '<li>
      <label for="banner-title-0-0">Title</label>
      <input id="banner-title-0-0" name="pagebuilder[0][0][banner-title]" type="text" value="' . $pb['banner-title'] . '" />
    </li>
    <li>
      <label for="banner-text-0-0">Text</label>
      <textarea id="banner-text-0-0" name="pagebuilder[0][0][banner-text]">' . $pb['banner-text'] . '</textarea>
    </li>
    <li>
      <label for="banner-btn-text-0-0">Button Text <small>Both fields required to render button</small></label>
      <input id="banner-btn-text-0-0" name="pagebuilder[0][0][banner-btn-text]" type="text" value="' . $pb['banner-btn-text'] . '" />
    </li>
    <li>
      <label for="banner-btn-url-0-0">Button URL <small>Both fields required to render button</small></label>
      <input id="banner-btn-url-0-0" name="pagebuilder[0][0][banner-btn-url]" type="text" value="' . $pb['banner-btn-url'] . '" />
    </li>
    <li>
      <label for="banner-align-0-0">Text Align</label>
      <select id="banner-align-0-0" name="pagebuilder[0][0][banner-align]">
        <option value="center" ' . ($pb['banner-align']=='center' ? 'selected' : '') . '>Center</option>
        <option value="left" ' . ($pb['banner-align']=='left' ? 'selected' : '') . '>Left</option>
        <option value="right" ' . ($pb['banner-align']=='right' ? 'selected' : '') . '>Right</option>
      </select>
    </li>
    ';
  }
  public function frontend($pb) {
    $title = $pb['banner-title'] ? '<h2 class="banner-title">' . $pb['banner-title'] . '</h2>' : '';
    $text = $pb['banner-text'] ? '<p class="banner-text">' . $pb['banner-text'] . '</p>' : '';
    $button = $pb['banner-btn-url'] && $pb['banner-btn-text'] ? '<a class="banner-button" href="' . $pb['banner-btn-url'] . '">' . $pb['banner-btn-text'] . '</a>' : '';
    if ($pb['banner-align']=='center') {
      $text_align = 'text-align:center';
    } else if ($pb['banner-align']=='left') {
      $text_align = 'text-align:left';
    } else {
      $text_align = 'text-align:right';
    }
    return '<div class="banner-content" style="' . $text_align . '">' . $title . $text . $button . '</div>';
  }
}
$modules['banner'] = new Banner();
