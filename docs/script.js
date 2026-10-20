// Keep offscreen covers and the hidden QR out of the first-screen download queue.
(() => {
 const images=document.querySelectorAll('img[data-lazy-src]');
 const load=image=>{image.src=image.dataset.lazySrc;};
 if('loading' in HTMLImageElement.prototype||!window.IntersectionObserver){images.forEach(load);return;}
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){load(entry.target);observer.unobserve(entry.target);}
 }),{rootMargin:'500px 0px'});
 images.forEach(image=>observer.observe(image));
})();
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const motionEase='cubic-bezier(.22,1,.36,1)';
let closingDetail=false;
function closeDetail(){
 if(!dialog.open||closingDetail)return;
 if(reducedMotion.matches){dialog.close();return;}
 closingDetail=true;
 const exit=dialog.animate([{opacity:1,translate:'0 0',scale:'1'},{opacity:0,translate:'0 36px',scale:'.94'}],{duration:260,easing:'cubic-bezier(.4,0,1,1)'});
 exit.finished.catch(()=>{}).then(()=>{dialog.close();closingDetail=false;});
}
const dialog=document.querySelector('#detail');
function showDetail(){dialog.showModal();if(!reducedMotion.matches)dialog.animate([{opacity:0,translate:'0 64px',scale:'.92'},{opacity:1,translate:'0 0',scale:'1'}],{duration:650,easing:motionEase});}
document.querySelectorAll('[data-contact]').forEach(button=>button.addEventListener('click',showDetail));
dialog.querySelector('.close-dialog').addEventListener('click',closeDetail);
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDetail();}});
const navLinks=document.querySelectorAll('nav a');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.hash==='#'+entry.target.id));}});},{rootMargin:'-10% 0px -60% 0px'});['work','about'].forEach(id=>observer.observe(document.getElementById(id)));

// Large, staggered entrances preserve the original layout at rest.
const entrances=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const element=entry.target;
  entrances.unobserve(element);
  element.classList.add('revealed');
  if(reducedMotion.matches)return;
  const isProject=element.classList.contains('project');
  const delay=element.classList.contains('about-card')?180:0;
  element.animate([
   {opacity:0,translate:'0 80px',scale:'.94'},
   {opacity:1,translate:'0 0',scale:'1'}
  ],{duration:1150,delay,easing:motionEase,fill:'backwards'});
  if(isProject){
   const direction=element.classList.contains('reverse')?-1:1;
   const art=element.querySelector('.project-art');
   art.animate([
    {clipPath:direction===1?'inset(0 100% 0 0 round 24px)':'inset(0 0 0 100% round 24px)'},
    {clipPath:'inset(0 0 0 0 round 24px)'}
   ],{duration:1100,delay:160,easing:motionEase,fill:'backwards'});
   element.querySelectorAll('.project-copy h3,.project-copy p').forEach((item,index)=>item.animate([
    {opacity:0,translate:`${direction*-48}px 20px`},
    {opacity:1,translate:'0 0'}
   ],{duration:900,delay:180+index*130,easing:motionEase,fill:'backwards'}));
  }
  if(element.classList.contains('about-card')){
   element.querySelectorAll('.timeline li').forEach((item,index)=>item.animate([
    {opacity:0,translate:'40px 28px'},
    {opacity:1,translate:'0 0'}
   ],{duration:900,delay:280+index*180,easing:motionEase,fill:'backwards'}));
  }
 });
},{threshold:.08});
document.querySelectorAll('.about-card,.identity-card,.project').forEach(element=>entrances.observe(element));
if(!reducedMotion.matches){
 document.querySelectorAll('.sidebar h1,.sidebar-description,.sidebar-avatar').forEach((element,index)=>element.animate([
  {opacity:0,translate:'-36px 30px'},
  {opacity:1,translate:'0 0'}
 ],{duration:1100,delay:120+index*140,easing:motionEase,fill:'backwards'}));
}
const precisePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
document.querySelectorAll('.project,.identity-card').forEach(card=>{
 let scheduled=0;
 let nextX=0,nextY=0;
 card.addEventListener('pointermove',event=>{
  if(reducedMotion.matches||!precisePointer.matches)return;
  const rect=card.getBoundingClientRect();
  nextX=(event.clientX-rect.left)/rect.width-.5;
  nextY=(event.clientY-rect.top)/rect.height-.5;
  if(scheduled)return;
  scheduled=requestAnimationFrame(()=>{
   card.style.setProperty('--image-x',`${nextX*32}px`);
   card.style.setProperty('--image-y',`${nextY*24}px`);
   card.style.setProperty('--arrow-x',`${nextX*16}px`);
   card.style.setProperty('--arrow-y',`${nextY*16}px`);
   scheduled=0;
  });
 });
 card.addEventListener('pointerleave',()=>{
  cancelAnimationFrame(scheduled);scheduled=0;
  ['--image-x','--image-y','--arrow-x','--arrow-y'].forEach(name=>card.style.removeProperty(name));
 });
});
dialog.addEventListener('cancel',event=>{event.preventDefault();closeDetail();});
function handleReducedMotionChange(event){
 if(event.matches){document.getAnimations().forEach(animation=>animation.cancel());document.querySelectorAll('.project,.identity-card').forEach(card=>['--image-x','--image-y','--arrow-x','--arrow-y'].forEach(name=>card.style.removeProperty(name)));}
}
if(reducedMotion.addEventListener)reducedMotion.addEventListener('change',handleReducedMotionChange);else reducedMotion.addListener(handleReducedMotionChange);

// Clipboard writes happen only after a contact action is clicked.
(()=>{
 const status=document.getElementById('copy-status');
 async function copyContact(value){
  if(navigator.clipboard?.writeText){
   try{await navigator.clipboard.writeText(value);return;}catch{}
  }
  const previousFocus=document.activeElement;
  const field=document.createElement('textarea');
  field.value=value;field.readOnly=true;
  field.style.cssText='position:fixed;left:0;top:0;opacity:0;pointer-events:none';
  (dialog.open?dialog:document.body).appendChild(field);field.select();
  let copied=false;
  try{copied=document.execCommand('copy');}finally{field.remove();previousFocus?.focus({preventScroll:true});}
  if(!copied)throw new Error('Clipboard unavailable');
 }
 document.querySelectorAll('[data-copy]').forEach(button=>{
  const tooltip=button.querySelector('.contact-tooltip');
  let resetTimer;
  button.addEventListener('click',async()=>{
   clearTimeout(resetTimer);
   try{
    await copyContact(button.dataset.copy);
    tooltip.textContent='已复制';button.classList.add('is-copied');
    status.textContent='已复制：'+button.dataset.copy;
   }catch{
    tooltip.textContent='复制失败，请重试';button.classList.add('is-copied');
    status.textContent='复制失败，请选择文字后手动复制。';
   }
   resetTimer=setTimeout(()=>{tooltip.textContent='点击复制';button.classList.remove('is-copied');},1600);
  });
 });
})();

// Measure dot-to-dot distances after responsive layout and font loading.
(()=>{
 const timeline=document.querySelector('.timeline');
 const entries=[...timeline.children];
 const connect=()=>entries.slice(0,-1).forEach((entry,index)=>entry.style.setProperty('--timeline-connector-height',`${entries[index+1].offsetTop-entry.offsetTop}px`));
 if(window.ResizeObserver){const resize=new ResizeObserver(connect);resize.observe(timeline);entries.forEach(entry=>resize.observe(entry));}
 window.addEventListener('resize',connect);
 document.fonts.ready.then(connect);connect();
})();
