import os
import re
import glob

# Style definition to inject
css_vars = """
    :root {
        --color-background: #faf9f7;
        --color-on-background: #1a1c1b;
        --color-primary: #123358;
        --color-on-primary: #ffffff;
        --color-secondary: #94492d;
        --color-on-secondary: #ffffff;
        --color-surface: #faf9f7;
        --color-on-surface: #1a1c1b;
        --color-surface-container: #efeeec;
        --color-surface-container-low: #f4f3f1;
        --color-surface-container-high: #e9e8e6;
        --color-surface-container-highest: #e3e2e0;
        --color-surface-variant: #e3e2e0;
        --color-on-surface-variant: #43474e;
        --color-outline: #74777f;
        --color-outline-variant: #c3c6cf;
        --color-inverse-surface: #2f3130;
        --color-inverse-on-surface: #f1f1ef;
        
        --color-primary-fixed: #d4e3ff;
        --color-surface-container-lowest: #ffffff;
        --color-surface-dim: #dadad8;
        --color-tertiary-fixed-dim: #e8c17a;
        --color-tertiary: #442e00;
        --color-on-primary-fixed: #001c39;
        --color-tertiary-container: #5f4407;
        --color-secondary-fixed: #ffdbcf;
        --color-error-container: #ffdad6;
        --color-on-tertiary: #ffffff;
        --color-secondary-container: #fd9e7b;
        --color-on-secondary-container: #773319;
        --color-tertiary-fixed: #ffdea7;
        --color-error: #ba1a1a;
        --color-primary-fixed-dim: #abc8f5;
        --color-on-error-container: #93000a;
        --color-on-primary-container: #9cbae6;
        --color-primary-container: #2c4a70;
        --color-on-primary-fixed-variant: #2a486e;
        --color-on-tertiary-fixed: #271900;
        --color-surface-tint: #436087;
        --color-on-secondary-fixed: #380d00;
        --color-on-error: #ffffff;
        --color-on-tertiary-fixed-variant: #5d4205;
        --color-on-tertiary-container: #d9b26d;
        --color-on-secondary-fixed-variant: #763218;
        --color-seconda
<truncated 7455 bytes>