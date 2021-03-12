# Get Started

To use tooltip plugin, download and import the required files. Tooltip would be initiated automatically.

It would show the tooltip based on the [attribute values](attributes.md) given in the activator element.

<div class="get-started-example">
  <div class="examples-row">
    <button class="btn" data-tooltip="Top tooltip" data-tooltip-position="top">Top</button>
    <button class="btn" data-tooltip="Bottom tooltip" data-tooltip-position="bottom">Bottom</button>
    <button class="btn" data-tooltip="Left tooltip" data-tooltip-position="left">Left</button>
    <button class="btn" data-tooltip="Right tooltip" data-tooltip-position="Right">Right</button>
  </div>

  <div class="examples-row">
    <button class="btn btn-v-long" data-tooltip="Top Left tooltip" data-tooltip-position="top left">Top Left</button>
    <button class="btn btn-v-long" data-tooltip="Top Right tooltip" data-tooltip-position="top right">Top Right</button>
    <button class="btn btn-v-long" data-tooltip="Bottom Left tooltip" data-tooltip-position="bottom left">Bottom Left</button>
    <button class="btn btn-v-long" data-tooltip="Bottom Right tooltip" data-tooltip-position="bottom right">Bottom Right</button>
  </div>

  <div class="examples-row">
    <button class="btn btn-h-long" data-tooltip="Left Top tooltip" data-tooltip-position="left top">Left Top</button>
    <button class="btn btn-h-long" data-tooltip="Left Bottom tooltip" data-tooltip-position="left bottom">Left Bottom</button>
    <button class="btn btn-h-long" data-tooltip="Right Top tooltip" data-tooltip-position="right top">Right Top</button>
    <button class="btn btn-h-long" data-tooltip="Right Bottom tooltip" data-tooltip-position="right bottom">Right Bottom</button>
  </div>
</div>

## Download files
You can download the required CSS and JS files from the `dist` directory in the [GitHub repository](https://github.com/{{repo}})

OR from below direct links

**CSS file link** - [tooltip.min.css](https://raw.githubusercontent.com/{{repo}}/master/dist/tooltip.min.css)

**JS file link** - [tooltip.min.js](https://raw.githubusercontent.com/{{repo}}/master/dist/tooltip.min.js)

## Import files

Import downloaded files (`tooltip.min.css` and `tooltip.min.js`) into your project.

```html
<link rel="stylesheet" href="path/to/tooltip.min.css">

<script src="path/to/tooltip.min.js">
```

## Example

<span data-tooltip="Sample tooltip" data-tooltip-position="right">Hover here</span>

```html
<span data-tooltip="Sample tooltip" data-tooltip-position="right">Hover here</span>
```

Refer [attributes](attributes.md) for available attribute options.

<script>
  initPageGetStarted();
</script>