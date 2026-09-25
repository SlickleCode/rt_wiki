# Mod feature data

This is the single source of truth for everything the wiki documents. `scripts/generate_html.py`
reads it and produces the static pages under `pages/`. Nothing here should ever need a template
or generator change to use — adding new content is just adding data.

## Adding a feature

Drop a new file at `data/features/<id>.json`. The filename (without `.json`) becomes the
feature's id, its output filename (`pages/<id>.html`), and the key used to auto-resolve an icon
(`textures/item/<id>.png`, `textures/block/<id>.png`, or `textures/models/armor/<id>.png`, checked
in that order).

```jsonc
{
  "title": "Stable Ender Pearl",      // required
  "category": "item",                 // required, must match an id in categories.json
  "description": "...",               // required
  "keywords": ["Ender", "Pearl"],     // optional, powers the sidebar search filter
  "images": ["images/foo.png"],       // optional, screenshot gallery (paths relative to pages/)
  "videos": ["videos/foo.mp4"],       // optional, same gallery, rendered as <video>
  "recipe_image": "images/bar.png",   // optional, a flat picture of the recipe
  "recipe": { ... },                  // optional, structured recipe (see below) - takes
                                       // priority over recipe_image when both are set
  "properties": [                     // optional, freeform quick-facts table
    { "label": "Teleport Delay", "value": "7 seconds" }
  ]
}
```

Only `title`, `category` and `description` are required. Everything else is additive, so a
feature with no recipe or properties yet still renders a perfectly normal page - fill it in later.

## Structured recipes

Instead of (or alongside) a flat `recipe_image`, a feature can describe a 3x3 crafting grid, and
the generator will render it as a real recipe grid with resolved icons:

```jsonc
"recipe": {
  "shape": [
    [null, "redstone", null],
    ["redstone", "iron_ingot", "redstone"],
    [null, "stick", null]
  ],
  "result": { "key": "advanced_redstone_torch", "count": 1 }
}
```

Each grid slot is `null` (empty), a texture key string, or `{"key": "...", "label": "..."}` for
an explicit display label. Keys are resolved in this order:

1. `textures/item/<key>.png`, `textures/block/<key>.png`, `textures/models/armor/<key>.png`
2. another feature's own id (so a recipe can point at, say, `"stable_ender_pearl"` and it'll pick
   up that feature's icon automatically)
3. otherwise, the slot renders as a plain text label (the key, title-cased) - useful for vanilla
   Minecraft ingredients this repo has no texture for, e.g. `"redstone"` or `"iron_ingot"`.

## Categories

`data/categories.json` defines the sidebar sections (id, label, and an inline SVG icon). Adding a
new category - say `"machine"` - means adding one entry there; the sidebar, homepage, and search
all pick it up automatically for any feature whose `"category"` matches.
