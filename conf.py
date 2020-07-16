# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))
import sys;
# import sphinx_bootstrap_theme

# sys.setrecursionlimit(50000)


# -- Project information -----------------------------------------------------

project = 'Kazaplan'
copyright = '2020, Fabien Ryckoort'
author = 'Fabien Ryckoort'

# The full version, including alpha/beta/rc tags
release = '0.0.1'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinxcontrib.openapi',
    'sphinxcontrib.redoc',
    'sphinx_copybutton',
    # 'sphinxcontrib-inlinesyntaxhighlight'
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

gettext_uuid = True
gettext_compact = False

# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
# html_theme = 'alabaster'

html_theme = 'sphinx_rtd_theme'

html_theme_options = {
    'canonical_url': '',
    'analytics_id': 'UA-XXXXXXX-1',
    'logo_only': True,
    'display_version': True,
    'prev_next_buttons_location': 'bottom',
    'style_external_links': False,
    # 'vcs_pageview_mode': '',
    'style_nav_header_background': '#3F9984',
    'collapse_navigation': True,
    'sticky_navigation': True,
    'navigation_depth': 4,
    'includehidden': True,
    'titles_only': False
}

html_logo = '_static/images/kazaplan.svg'


# html_theme = 'bootstrap'
# html_theme_path = sphinx_bootstrap_theme.get_html_theme_path()

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

html_css_files = [
    'css/index.css',
]

html_js_files = [
    'js/index.js'
]

# redoc = [
#     {
#         'name': 'Batcomputer API',
#         'page': 'api',
#         'spec': 'specs/openapi.yml',
#         'embed': True,
#         'opts': {
#             'suppress-warnings': True,
#         }
#     }
# ]