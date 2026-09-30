"""
Generates deterministic, premium-looking SVG artwork for the product catalog.
No external assets or network calls — pure vector shapes so the storefront
has real, crawlable, zero-layout-shift imagery out of the box.
Run: python3 scripts/generate_images.py
"""
import os, math

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(os.path.join(OUT, "products"), exist_ok=True)
os.makedirs(os.path.join(OUT, "hero"), exist_ok=True)

PALETTES = {
    "clay":    {"bg1": "#F3E7DC", "bg2": "#E7D2BE", "ink": "#3A2A1E", "accent": "#B5602F"},
    "sage":    {"bg1": "#E9EEE3", "bg2": "#D3DDC6", "ink": "#28321F", "accent": "#5C7A45"},
    "slate":   {"bg1": "#E7E9EC", "bg2": "#CBD1D8", "ink": "#20242B", "accent": "#3E5C76"},
    "ember":   {"bg1": "#F3E2DA", "bg2": "#E8C3B3", "ink": "#3A231B", "accent": "#B5482E"},
    "sand":    {"bg1": "#F4EEE1", "bg2": "#E6D9BE", "ink": "#332B1C", "accent": "#A98442"},
    "ink":     {"bg1": "#E9E7E4", "bg2": "#CFCBC4", "ink": "#1E1B18", "accent": "#6B4A32"},
}

def svg_wrap(w, h, body, bg1, bg2, gid):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">
<defs>
<linearGradient id="{gid}" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="{bg1}"/>
<stop offset="100%" stop-color="{bg2}"/>
</linearGradient>
</defs>
<rect width="{w}" height="{h}" fill="url(#{gid})"/>
{body}
</svg>'''

def kettle(cx, cy, s, ink, accent):
    return f'''
<g transform="translate({cx},{cy})" fill="none" stroke="{ink}" stroke-width="{s*0.02}" stroke-linecap="round" stroke-linejoin="round">
  <path d="M {-s*0.3} {-s*0.05} L {-s*0.3} {s*0.35} Q {-s*0.3} {s*0.5} {-s*0.1} {s*0.5} L {s*0.28} {s*0.5} Q {s*0.42} {s*0.5} {s*0.42} {s*0.34} L {s*0.42} {-s*0.02} Z" fill="{accent}" fill-opacity="0.16"/>
  <path d="M {-s*0.42} {-s*0.18} Q {-s*0.1} {-s*0.34} {s*0.05} {-s*0.14}" />
  <ellipse cx="0" cy="{-s*0.05}" rx="{s*0.36}" ry="{s*0.07}" />
  <path d="M {s*0.34} {-s*0.02} Q {s*0.62} {-s*0.06} {s*0.5} {s*0.14} Q {s*0.42} {s*0.24} {s*0.3} {s*0.18}" />
  <circle cx="{-s*0.02}" cy="{-s*0.42}" r="{s*0.05}" fill="{ink}"/>
  <path d="M {-s*0.1} {-s*0.36} Q {-s*0.02} {-s*0.5} {s*0.08} {-s*0.36}" />
</g>'''

def grinder(cx, cy, s, ink, accent):
    return f'''
<g transform="translate({cx},{cy})" fill="none" stroke="{ink}" stroke-width="{s*0.02}" stroke-linecap="round" stroke-linejoin="round">
  <rect x="{-s*0.16}" y="{-s*0.48}" width="{s*0.32}" height="{s*0.22}" rx="{s*0.03}" fill="{accent}" fill-opacity="0.18"/>
  <path d="M {-s*0.16} {-s*0.26} L {-s*0.22} {s*0.05} L {s*0.22} {s*0.05} L {s*0.16} {-s*0.26} Z" />
  <rect x="{-s*0.22}" y="{s*0.05}" width="{s*0.44}" height="{s*0.14}" rx="{s*0.02}" fill="{accent}" fill-opacity="0.28"/>
  <path d="M {-s*0.14} {s*0.19} L {-s*0.1} {s*0.46} L {s*0.1} {s*0.46} L {s*0.14} {s*0.19} Z" fill="{ink}" fill-opacity="0.08"/>
  <line x1="{-s*0.02}" y1="{-s*0.48}" x2="{-s*0.02}" y2="{-s*0.6}" />
  <circle cx="{-s*0.02}" cy="{-s*0.64}" r="{s*0.045}" />
</g>'''

def dripper(cx, cy, s, ink, accent):
    return f'''
<g transform="translate({cx},{cy})" fill="none" stroke="{ink}" stroke-width="{s*0.02}" stroke-linecap="round" stroke-linejoin="round">
  <path d="M {-s*0.34} {-s*0.3} L {s*0.34} {-s*0.3} L {s*0.12} {s*0.28} L {-s*0.12} {s*0.28} Z" fill="{accent}" fill-opacity="0.18"/>
  <ellipse cx="0" cy="{-s*0.3}" rx="{s*0.34}" ry="{s*0.06}" />
  <path d="M {-s*0.08} {s*0.28} Q 0 {s*0.42} {s*0.08} {s*0.28}" />
  <path d="M {-s*0.42} {s*0.42} L {s*0.42} {s*0.42}" />
  <path d="M {-s*0.3} {s*0.42} L {-s*0.3} {s*0.5} M {s*0.3} {s*0.42} L {s*0.3} {s*0.5}" />
</g>'''

def scale(cx, cy, s, ink, accent):
    return f'''
<g transform="translate({cx},{cy})" fill="none" stroke="{ink}" stroke-width="{s*0.02}" stroke-linecap="round" stroke-linejoin="round">
  <rect x="{-s*0.42}" y="{-s*0.1}" width="{s*0.84}" height="{s*0.42}" rx="{s*0.05}" fill="{accent}" fill-opacity="0.16"/>
  <rect x="{-s*0.24}" y="{-s*0.26}" width="{s*0.48}" height="{s*0.18}" rx="{s*0.03}" fill="{accent}" fill-opacity="0.3"/>
  <line x1="{-s*0.3}" y1="{s*0.11}" x2="{s*0.3}" y2="{s*0.11}" opacity="0.5"/>
  <circle cx="0" cy="{s*0.03}" r="{s*0.03}" fill="{ink}"/>
</g>'''

def filterpack(cx, cy, s, ink, accent):
    return f'''
<g transform="translate({cx},{cy})" fill="none" stroke="{ink}" stroke-width="{s*0.02}" stroke-linecap="round" stroke-linejoin="round">
  <path d="M {-s*0.3} {-s*0.34} Q 0 {-s*0.46} {s*0.3} {-s*0.34} L {s*0.24} {s*0.38} Q 0 {s*0.48} {-s*0.24} {s*0.38} Z" fill="{accent}" fill-opacity="0.18"/>
  <path d="M {-s*0.16} {-s*0.1} Q 0 {-s*0.02} {s*0.16} {-s*0.1}" opacity="0.6"/>
  <path d="M {-s*0.14} {0.08*s} Q 0 {0.16*s} {s*0.14} {0.08*s}" opacity="0.6"/>
</g>'''

def accessory(cx, cy, s, ink, accent):
    return f'''
<g transform="translate({cx},{cy})" fill="none" stroke="{ink}" stroke-width="{s*0.02}" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="0" cy="0" r="{s*0.36}" fill="{accent}" fill-opacity="0.16"/>
  <path d="M {-s*0.16} {-s*0.02} L {-s*0.02} {s*0.14} L {s*0.22} {-s*0.18}" />
</g>'''

ICONS = {
  "kettles": kettle, "grinders": grinder, "drippers": dripper,
  "scales": scale, "filters": filterpack, "accessories": accessory,
}

def make_product_image(slug, category, palette_key, w=1200, h=1500):
    p = PALETTES[palette_key]
    icon_fn = ICONS[category]
    body = icon_fn(w/2, h/2 - 40, min(w, h) * 0.62, p["ink"], p["accent"])
    frame = f'<rect x="24" y="24" width="{w-48}" height="{h-48}" fill="none" stroke="{p["ink"]}" stroke-opacity="0.08" stroke-width="2"/>'
    svg = svg_wrap(w, h, frame + body, p["bg1"], p["bg2"], f"g-{slug}")
    with open(os.path.join(OUT, "products", f"{slug}.svg"), "w") as f:
        f.write(svg)

def make_hero(name, category, palette_key, w=2000, h=1400):
    p = PALETTES[palette_key]
    icon_fn = ICONS[category]
    body = icon_fn(w*0.72, h/2, min(w, h) * 0.55, p["ink"], p["accent"])
    svg = svg_wrap(w, h, body, p["bg1"], p["bg2"], f"g-hero-{name}")
    with open(os.path.join(OUT, "hero", f"{name}.svg"), "w") as f:
        f.write(svg)

PRODUCTS = [
    ("cascade-gooseneck-kettle", "kettles", "clay"),
    ("cascade-gooseneck-kettle-copper", "kettles", "ember"),
    ("horizon-electric-kettle", "kettles", "slate"),
    ("terra-conical-burr-grinder", "grinders", "sand"),
    ("terra-conical-burr-grinder-onyx", "grinders", "ink"),
    ("compact-hand-grinder", "grinders", "clay"),
    ("origin-ceramic-dripper", "drippers", "sage"),
    ("origin-ceramic-dripper-slate", "drippers", "slate"),
    ("glass-immersion-brewer", "drippers", "clay"),
    ("precision-brew-scale", "scales", "ink"),
    ("tandem-tasting-scale", "scales", "sand"),
    ("abaca-paper-filters-100ct", "filters", "sand"),
    ("reusable-mesh-filter", "filters", "sage"),
    ("walnut-serving-tray", "accessories", "clay"),
    ("linen-brew-cloth-set", "accessories", "sage"),
    ("ceramic-cupping-bowls-set", "accessories", "slate"),
]

for slug, cat, pal in PRODUCTS:
    make_product_image(slug, cat, pal)

# Category hero art
CATEGORY_HERO = [
    ("kettles", "kettles", "clay"),
    ("grinders", "grinders", "sand"),
    ("drippers", "drippers", "sage"),
    ("scales", "scales", "ink"),
    ("filters", "filters", "sand"),
    ("accessories", "accessories", "slate"),
    ("home", "kettles", "clay"),
]
for name, cat, pal in CATEGORY_HERO:
    make_hero(name, cat, pal)

print(f"Generated {len(PRODUCTS)} product images and {len(CATEGORY_HERO)} hero images.")
