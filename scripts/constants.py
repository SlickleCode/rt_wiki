# Paths are relative to this script's working directory (scripts/)
DATA_DIR = "../data"
FEATURES_DIR = DATA_DIR + "/features"
CATEGORIES_FILE = DATA_DIR + "/categories.json"
VANILLA_TEXTURE_OVERRIDES_FILE = DATA_DIR + "/vanilla_texture_names.json"

TEMPLATE_DIR = "../template-html"
TEXTURES_DIR = "../textures"
OUTPUT_DIR = "../docs"
OUTPUT_IMAGES_DIR = OUTPUT_DIR + "/images"
OUTPUT_VIDEOS_DIR = OUTPUT_DIR + "/videos"

# Subdirectory (relative to TEXTURES_DIR) that downloaded vanilla Minecraft
# icons land in. Listed last in TEXTURE_SEARCH_DIRS so a mod's own texture
# always wins if a key happens to collide.
VANILLA_TEXTURE_DIR = "vanilla"

# Subdirectories (relative to TEXTURES_DIR) searched, in order, when
# resolving a texture key to an icon for a feature or a recipe slot.
TEXTURE_SEARCH_DIRS = [
    "item",
    "block",
    "models/armor",
    VANILLA_TEXTURE_DIR,
]

# Used by scripts/fetch_vanilla_textures.py
MINECRAFT_WIKI_FILEPATH_URL = "https://minecraft.wiki/w/Special:FilePath/{}"

# Used by scripts/fetch_lumien_assets.py
LUMIEN_HOST = "lumien.net"

USER_AGENT = "rt-wiki-asset-fetcher/1.0 (+https://github.com/SlickleCode/rt_wiki)"
