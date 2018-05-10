<?php
class Slider extends Module {
  public $slug = 'slider';
  public $name = 'Slider';
  public $desc = 'Slide Title, Slide Text, Slide Background';
  public function backend($pb) {
    $output = '';
    foreach ($pb as $slide) {
      if (is_array($slide)) {
        $output .= '
        <li>
          <ul>
            <span class="dashicons dashicons-no-alt delete-slide"></span>
            <li>
              <label for="slider-title-0-0-0">Title</label>
              <input id="slider-title-0-0-0" name="pagebuilder[0][0][0][slider-title]" type="text" value="' . $slide['slider-title'] . '" />
            </li>
            <li>
              <label for="slider-text-0-0-0">Text</label>
              <input id="slider-text-0-0-0" name="pagebuilder[0][0][0][slider-text]" type="text" value="' . $slide['slider-text'] . '" />
            </li>
            <li>
              <label for="slider-img-0-0-0">Background Image</label>
              <div class="row">
                <button class="button media-selector" target="#slider-img-0-0-0">Select Image</button>
                <input id="slider-img-0-0-0" class="flex-1" name="pagebuilder[0][0][0][slider-img]" type="text" value="' . $slide['slider-img'] . '" />
              </div>
            </li>
          </ul>
        </li>';
      }
    }
    return '<li><ul class="slides">' . $output . '</ul><button class="button add-slide">Add Slide</button></li>';
  }
  public function frontend($pb) {
    $output = '<div class="slider-container"><div class="indicators">';
    foreach ($pb as $index=>$slide) {
      if (is_array($slide)) {
        $output .= '<div class="indicator" target="' . $index . '"></div>';
      }
    }
    $output .= '</div><svg class="prev" viewBox="0 0 50 50"><g fill="none"><path d="M35 5 L15 25 L35 45" /></g></svg><div class="slider">';
    foreach ($pb as $slide) {
      if (is_array($slide)) {
        $output .= '<div class="slide" style="background: url(' . $slide['slider-img'] . ') no-repeat;background-size:cover;"><div class="slide-content"><h2>' . $slide['slider-title'] . '</h2><p>' . $slide['slider-text'] . '</p></div></div>';
      }
    }
    $output .= '</div><svg class="next" viewBox="0 0 50 50"><g fill="none"><path d="M15 5 L35 25 L15 45" /></g></svg></div>';
    return $output;
  }
}
$modules['slider'] = new Slider();
