<?php
class Html extends Module {
  public $slug = 'html';
  public $name = 'HTML';
  public $desc = 'Custom HTML';
  public function backend($pb) {
    return
    '<li>
      <label for="custom-html-0-0">Custom HTML</label>
      <textarea id="custom-html-0-0" name="pagebuilder[0][0][custom-html]" rows="6">' . $pb['custom-html'] . '</textarea>
    </li>';
  }
  public function frontend($pb) {
    return $pb['custom-html'];
  }
}
$html = new Html();
$modules['html'] = new Html();
