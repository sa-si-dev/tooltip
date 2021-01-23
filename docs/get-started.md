# Get Started

To use tooltip plugin, download and import the required files. Tooltip would be initiated automatically.

It would show the tooltip based on the [attribute values](attributes.md) given in the activator element.

<div class="get-started-example">
  <button class="btn" data-tooltip="Top tooltip" data-tooltip-position="top">Top</button>
  <button class="btn" data-tooltip="Bottom tooltip" data-tooltip-position="bottom">Bottom</button>
  <button class="btn" data-tooltip="Left tooltip" data-tooltip-position="left">Left</button>
  <button class="btn" data-tooltip="Right tooltip" data-tooltip-position="Right">Right</button>
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