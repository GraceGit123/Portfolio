"""Generate responsive case images and streamable, byte-preserved original video."""
from pathlib import Path
import json,struct
from PIL import Image,ImageOps
ROOT=Path(__file__).resolve().parents[1]
ASSETS=ROOT/'docs/projects/assets'
manifest={}
for p in sorted(ASSETS.rglob('*.png')):
 if p.stat().st_size<100_000: continue
 try:
  with Image.open(p) as original:
   image=ImageOps.exif_transpose(original).convert('RGBA' if 'A' in original.getbands() else 'RGB')
   variants=[]
   for width in sorted(set([min(image.width,960),min(image.width,2048)])):
    target=p.with_name(p.stem+f'-{width}.webp')
    scaled=image.copy();scaled.thumbnail((width,round(image.height*width/image.width)),Image.Resampling.LANCZOS)
    scaled.save(target,'WEBP',quality=92,method=6)
    variants.append({'src':str(target.relative_to(ASSETS)),'width':scaled.width})
   manifest[str(p.relative_to(ASSETS))]={'width':image.width,'height':image.height,'variants':variants}
 except OSError as e:raise RuntimeError(str(p)) from e
(ROOT/'project-details-source/src/responsive-media.json').write_text(json.dumps(manifest,ensure_ascii=False,separators=(',',':')))
# Move the MP4 index ahead of the untouched media payload, updating sample offsets.
r=ASSETS/'hotel-solution'
data=b''.join((r/f'flow-v4-original-0{i}.bin').read_bytes() for i in (1,2))
def boxes(data):
 i=0
 while i<len(data):
  size,kind=struct.unpack_from('>I4s',data,i);header=8
  if size==1:size=struct.unpack_from('>Q',data,i+8)[0];header=16
  elif size==0:size=len(data)-i
  assert size>=header and i+size<=len(data)
  yield i,size,kind,header
  i+=size
parts=list(boxes(data));moov=next(x for x in parts if x[2]==b'moov');mdat=next(x for x in parts if x[2]==b'mdat')
assert moov[0]>mdat[0]
index=bytearray(data[moov[0]:moov[0]+moov[1]])
def patch(start,end):
 for i,size,kind,header in boxes(index[start:end]):
  pos=start+i
  if kind in (b'moov',b'trak',b'mdia',b'minf',b'stbl'):patch(pos+header,pos+size)
  elif kind in (b'stco',b'co64'):
   count=struct.unpack_from('>I',index,pos+header+4)[0];fmt='>I' if kind==b'stco' else '>Q';step=4 if kind==b'stco' else 8
   for n in range(count):
    at=pos+header+8+n*step;old=struct.unpack_from(fmt,index,at)[0]
    assert mdat[0]<=old<mdat[0]+mdat[1]
    struct.pack_into(fmt,index,at,old+moov[1])
patch(0,len(index))
result=data[:mdat[0]]+index+data[mdat[0]:moov[0]]+data[moov[0]+moov[1]:]
assert data[mdat[0]+mdat[3]:mdat[0]+mdat[1]]==result[mdat[0]+len(index)+mdat[3]:mdat[0]+len(index)+mdat[1]]
(r/'flow-original-stream.mp4').write_bytes(result)
print(f'{len(manifest)} responsive images; original video {len(result)} bytes, unchanged media payload')
