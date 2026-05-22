# Generates PWA / app icons from the Viszio HVAC glyph (see public/favicon.svg).
from PIL import Image, ImageDraw

TEAL = (14, 116, 144)
CYAN = (165, 243, 252)
ORANGE = (251, 146, 60)


def make(size: int, maskable: bool = False) -> Image.Image:
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if maskable:
        # Full-bleed background; glyph kept inside the central safe zone.
        d.rectangle([0, 0, size, size], fill=TEAL)
        scale = size * 0.64 / 64
        off = size * 0.18
    else:
        d.rounded_rectangle(
            [0, 0, size, size], radius=size * 14 / 64, fill=TEAL
        )
        scale = size / 64
        off = 0

    def X(v: float) -> float:
        return off + v * scale

    sw = 5 * scale  # stroke width

    # Three horizontal bars
    for x1, x2, y in [(14, 50, 22), (14, 50, 32), (14, 36, 42)]:
        d.rounded_rectangle(
            [X(x1) - sw / 2, X(y) - sw / 2, X(x2) + sw / 2, X(y) + sw / 2],
            radius=sw / 2,
            fill=CYAN,
        )

    # Orange circle outline
    cx, cy, r = 44, 42, 7
    d.ellipse(
        [X(cx - r), X(cy - r), X(cx + r), X(cy + r)],
        outline=ORANGE,
        width=max(1, int(sw)),
    )
    return img


make(192).save('public/pwa-192.png')
make(512).save('public/pwa-512.png')
make(512, maskable=True).save('public/pwa-maskable-512.png')
make(180).save('public/apple-touch-icon.png')
print('PWA icons written to public/')
