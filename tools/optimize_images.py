#!/usr/bin/env python3
"""Bulk-optimise website photos without changing their pixel size.

What it does to every .jpg/.jpeg under the given folder (default: uploads):
  * keeps the full width x height (no resizing unless you pass --max)
  * re-encodes at quality 82, progressive, optimised Huffman tables
    (visually indistinguishable from the original on screen)
  * applies the phone's rotation tag to the pixels, then strips EXIF
    (removes GPS location, camera serial etc.) but keeps the colour profile
  * only replaces a file if the result is at least 10% smaller

PNG files are left alone (use --webp-png to also write a .webp copy beside each).

Usage:
  python3 tools/optimize_images.py                 # whole uploads folder
  python3 tools/optimize_images.py uploads/Crochet # one folder
  python3 tools/optimize_images.py --dry-run       # just report savings
  python3 tools/optimize_images.py --max 2400      # also cap the long edge

Needs Pillow:  python3 -m pip install pillow
"""
import argparse, io, os, sys
from PIL import Image, ImageOps

ap = argparse.ArgumentParser()
ap.add_argument('folder', nargs='?', default='uploads')
ap.add_argument('--quality', type=int, default=82)
ap.add_argument('--max', type=int, default=0, help='cap long edge in px (0 = keep size)')
ap.add_argument('--min-saving', type=float, default=0.10)
ap.add_argument('--dry-run', action='store_true')
ap.add_argument('--webp-png', action='store_true')
a = ap.parse_args()

before = after = changed = 0
for dp, _, files in os.walk(a.folder):
    for name in sorted(files):
        path = os.path.join(dp, name)
        low = name.lower()
        if low.endswith('.png') and a.webp_png:
            im = Image.open(path)
            out = os.path.splitext(path)[0] + '.webp'
            if not a.dry_run:
                im.save(out, 'WEBP', quality=85, method=6)
            print(f'webp  {os.path.getsize(path)/1e3:8.0f}KB -> {os.path.getsize(out)/1e3 if os.path.exists(out) else 0:7.0f}KB  {out}')
            continue
        if not low.endswith(('.jpg', '.jpeg')):
            continue
        size = os.path.getsize(path)
        im = Image.open(path)
        icc = im.info.get('icc_profile')
        img = ImageOps.exif_transpose(im).convert('RGB')
        if a.max and max(img.size) > a.max:
            img.thumbnail((a.max, a.max), Image.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, 'JPEG', quality=a.quality, optimize=True, progressive=True, icc_profile=icc)
        new = len(buf.getvalue())
        before += size
        # always rewrite if the file carried GPS data, so location is removed
        has_gps = 34853 in im.getexif()
        if new <= size * (1 - a.min_saving) or has_gps:
            changed += 1
            after += new
            if not a.dry_run:
                with open(path, 'wb') as fh:
                    fh.write(buf.getvalue())
        else:
            after += size

print(f'\n{changed} files rewritten · {before/1e6:.1f} MB -> {after/1e6:.1f} MB '
      f'({(1-after/max(before,1))*100:.0f}% smaller){" [dry run]" if a.dry_run else ""}')
