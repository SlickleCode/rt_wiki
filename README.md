# Random Things Wiki

A static wiki for the Random Things Minecraft mod, built from a reusable, data-driven feature
schema instead of hand-written HTML per page.

## How it works

- `data/features/*.json` - one file per mod feature (item, block, misc, etc). This is the
  only place content lives. See `data/README.md` for the schema.
- `data/categories.json` - the sidebar sections (Items, Blocks, Misc, ...). Add a category here
  and any feature using it is picked up automatically, no template changes needed.
- `template-html/*.html` - Jinja2 templates (`base.html` for the page chrome, `sidebar.html` for
  the nav, `page.html` for a single feature, `index.html` for the homepage).
- `scripts/generate_html.py` - reads the data, renders the templates, and writes static pages into
  `pages/`. Run it with:

  ```
  pip install -r scripts/requirements.txt
  cd scripts && python3 generate_html.py
  ```

- `.github/workflows/generate-html.yml` runs the same generator on every push and commits the
  regenerated `pages/` back into the repo.

## Adding a new feature to the wiki

Add a JSON file to `data/features/`, following `data/README.md`. That's it - the sidebar, the
homepage, and the feature's own page are all generated from it on the next build.
