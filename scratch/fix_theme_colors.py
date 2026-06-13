import os
import re

# Hex color lists for reference (copied from apply_theme_colors.py)
hex_colors_light = {
    "background": "#faf9f7",
    "on-background": "#1a1c1b",
    "primary": "#123358",
    "on-primary": "#ffffff",
    "secondary": "#94492d",
    "on-secondary": "#ffffff",
    "surface": "#faf9f7",
    "on-surface": "#1a1c1b",
    "surface-container": "#efeeec",
    "surface-container-low": "#f4f3f1",
    "surface-container-high": "#e9e8e6",
    "surface-container-highest": "#e3e2e0",
    "surface-variant": "#e3e2e0",
    "on-surface-variant": "#43474e",
    "outline": "#74777f",
    "outline-variant": "#c3c6cf",
    "inverse-surface": "#2f3130",
    "inverse-on-surface": "#f1f1ef",
    "primary-fixed": "#d4e3ff",
    "surface-container-lowest": "#ffffff",
    "surface-dim": "#dadad8",
    "tertiary-fixed-dim": "#e8c17a",
    "tertiary": "#442e00",
    "on-primary-fixed": "#001c39",
    "tertiary-container": "#5f4407",
    "secondary-fixed": "#ffdbcf",
    "error-container": "#ffdad6",
    "on-tertiary": "#ffffff",
    "secondary-container": "#fd9e7b",
    "on-secondary-container": "#773319",
    "tertiary-fixed": "#ffdea7",
    "error": "#ba1a1a",
    "primary-fixed-dim": "#abc8f5",
    "on-error-container": "#93000a",
    "on-primary-container": "#9cbae6",
    "primary-container": "#2c4a70",
    "on-primary-fixed-variant": "#2a486e",
    "on-tertiary-fixed": "#271900",
    "surface-tint": "#436087",
    "on-secondary-fixed": "#380d00",
    "on-error": "#ffffff",
    "on-tertiary-fixed-variant": "#5d4205",
    "on-tertiary-container": "#d9b26d",
    "on-secondary-fixed-variant": "#763218",
    "secondary-fixed-dim": "#ffb59b",
    "inverse-primary": "#123358",
    "surface-bright": "#faf9f7"
}

hex_colors_dark = {
    "background": "#0f1115",
    "on-backg
<truncated 5677 bytes>