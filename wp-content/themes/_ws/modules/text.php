<?php
// TinyMCE doesn't like to be called via ajax. Module on hold
class Text extends Module {
  public $slug = 'text';
  public $name = 'Text';
  public $desc = 'WYSIWYG Editor';
  public function backend($pb) {
    return '<li>
      <label style="display: none;" for="text-0-0">Text Editor</label>
      <textarea id="text-0-0" class="text-editor" name="pagebuilder[0][0][text]" style aria-hidden="true">' . $pb['text'] . '</textarea>
    </li>';
  }
  public function frontend($pb) {
    return $pb['text'];
  }
}
$modules['text'] = new Text();
