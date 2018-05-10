<?php
class Module {
  public function output($pb) {
    global $modules;
    return
    '<div class="module postbox">
      <input type="hidden" id="module-type-0" name="pagebuilder[0][0][module-type]" value="' . $pb['module-type'] . '" />
      <div class="module-header module-handle">
        <ul class="module-tabs">
          <li class="current module-tab" sel="' . $pb['module-type'] . '-tab">'
            . $modules[$pb['module-type']]->name .
          '</li>
          <li class="module-tab" sel="advanced-tab">Advanced</li>
        </ul>
        <button class="module-delete" title="Delete Module">
          <span class="dashicons dashicons-trash"></span>
        </button>
      </div>
      <div class="inside module-inside">
        <ul class="' . $pb['module-type'] . '-tab">'
          . $modules[$pb['module-type']]->backend($pb) .
        '</ul>
        <ul class="advanced-tab">'
          . $modules[$pb['module-type']]->advanced($pb) .
        '</ul>
      </div>
    </div>';
  }
  public function advanced($pb) {
    return
    '<li>
      <label for="custom-id-0-0">ID</label>
      <input id="custom-id-0-0" name="pagebuilder[0][0][custom-id]" type="text" value="' . $pb['custom-id'] . '" />
    </li>
    <li>
      <label for="custom-class-0-0">Class</label>
      <input id="custom-class-0-0" name="pagebuilder[0][0][custom-class]" type="text" value="' . $pb['custom-class'] . '" />
    </li>
    <li>
      <label for="custom-background-0-0">Background Image</label>
      <div class="row">
        <button class="button media-selector" target="#custom-background-0-0">Select Image</button>
        <input id="custom-background-0-0" class="flex-1" name="pagebuilder[0][0][custom-background]" type="text" value="' . $pb['custom-background'] . '" />
      </div>
    </li>';
  }
}
