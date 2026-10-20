"""Preserve pixels and font outlines. Requires Pillow and fonttools[woff]."""
from pathlib import Path
import re,hashlib,json
from fontTools import subset
from fontTools.ttLib import TTFont
from PIL import Image
ROOT=Path(__file__).resolve().parents[1];DOCS=ROOT/'docs'
case_text=''.join(p.read_text() for p in (ROOT/'project-details-source/src').glob('*.tsx'))
home_text=(DOCS/'index.html').read_text()+(DOCS/'script.js').read_text()
chars={ord(c) for c in case_text+home_text}; homechars={ord(c) for c in home_text}
report={}
def make_subset(source,target,codepoints):
 font=TTFont(source);available=set(font.getBestCmap());keep=available&codepoints
 if not keep:return None
 options=subset.Options();options.flavor='woff2';options.layout_features=['*'];options.hinting=True
 worker=subset.Subsetter(options=options);worker.populate(unicodes=keep);worker.subset(font);font.flavor='woff2';font.save(target)
 result=TTFont(target);assert keep <= set(result.getBestCmap())
 return keep
# Keep the existing per-range faces and weights; trim unused glyphs from each face.
def compact_css(css_paths,codepoints,destination):
 rules=[];preloads=[];before=0;after=0
 for path in css_paths:
  for rule in re.findall(r'@font-face\{[^}]+\}',path.read_text()):
   url=re.search(r'url\([\'\"]?([^\'\")]+)',rule)
   if not url:continue
   source=path.parent/url[1];font=TTFont(source);keep=set(font.getBestCmap())&codepoints
   if not keep:continue
   name=source.stem.split('.')[0]+'-'+hashlib.sha256((str(source)+str(sorted(keep))).encode()).hexdigest()[:12]+'.woff2'
   target=destination.parent/name
   make_subset(source,target,keep);before+=source.stat().st_size;after+=target.stat().st_size
   rule=rule[:url.start(1)]+name+rule[url.end(1):]
   rule=re.sub(r'unicode-range:[^;}]+','unicode-range:'+','.join(f'U+{cp:X}' for cp in sorted(keep)),rule)
   rules.append(rule)
   if 65 in keep or ord('的') in keep:preloads.append(name)
 destination.write_text('\n'.join(rules))
 return {'faces':len(rules),'before_bytes':before,'after_bytes':after,'preloads':preloads}
fontdir=DOCS/'assets/optimized-fonts';fontdir.mkdir(exist_ok=True)
# Paths in source CSS resolve against the original CSS, output faces share one directory.
report['home_fonts']=compact_css([DOCS/'assets/misans/fonts.css'],homechars,fontdir/'home.css')
report['case_fonts']=compact_css(list((DOCS/'projects/fonts/misans').glob('*.min.css')),chars,fontdir/'cases.css')
for filename in ['inter.ttf','noto-sans-sc.ttf','noto-sans-jp.ttf']:
 source=DOCS/'projects/fonts'/filename;target=fontdir/(source.stem+'-case.woff2');make_subset(source,target,chars)
 report[filename]={'before_bytes':source.stat().st_size,'after_bytes':target.stat().st_size}
for source in (DOCS/'projects/fonts/trip-geom').glob('*.ttf'):
 target=fontdir/(source.stem+'-case.woff2');make_subset(source,target,chars)
 report[source.name]={'before_bytes':source.stat().st_size,'after_bytes':target.stat().st_size}
# Full native dimensions, reversible lossless WebP: decoded pixels are identical.
for name in ['portrait','cover-ebooking','cover-hotel-task','cover-hotel-solution','wechat-qr']:
 source=DOCS/'assets'/(name+'.png');target=DOCS/'assets'/(name+'-lossless.webp')
 with Image.open(source) as original:
  pixels=original.convert('RGBA');pixels.save(target,'WEBP',lossless=True,method=6,exact=True)
  with Image.open(target) as encoded:assert encoded.convert('RGBA').tobytes()==pixels.tobytes()
 report[name]={'before_bytes':source.stat().st_size,'after_bytes':target.stat().st_size}
(ROOT/'performance-resource-report.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
