# Paths are relative to this script's working directory (scripts/)
DATA_DIR = "../data"
FEATURES_DIR = DATA_DIR + "/features"
CATEGORIES_FILE = DATA_DIR + "/categories.json"

TEMPLATE_DIR = "../template-html"
TEXTURES_DIR = "../textures"
OUTPUT_DIR = "../pages"

# Subdirectories (relative to TEXTURES_DIR) searched, in order, when
# resolving a texture key to an icon for a feature or a recipe slot.
TEXTURE_SEARCH_DIRS = [
    "item",
    "block",
    "models/armor",
]
