// ---- Edit these ----
var WEDDING = new Date('2027-02-20T16:30:00+05:30');
// Countdown
function tick(){var d=Math.max(0,WEDDING-new Date()),p=function(n){return String(n).padStart(2,'0')};
 document.getElementById('dd').textContent=p(Math.floor(d/864e5));
 document.getElementById('hh').textContent=p(Math.floor(d/36e5)%24);
 document.getElementById('mm').textContent=p(Math.floor(d/6e4)%60);
 document.getElementById('ss').textContent=p(Math.floor(d/1e3)%60);}
tick();setInterval(tick,1000);

// Scratch card
(function(){
 var c=document.getElementById('cv'),x=c.getContext('2d'),done=false,down=false;
 function size(){var r=c.getBoundingClientRect(),k=window.devicePixelRatio||1;c.width=r.width*k;c.height=r.height*k;x.scale(k,k);
  var g=x.createLinearGradient(0,0,r.width,r.height);g.addColorStop(0,'#b88a3e');g.addColorStop(.5,'#f0d594');g.addColorStop(1,'#b88a3e');
  x.fillStyle=g;x.fillRect(0,0,r.width,r.height);x.fillStyle='#5a3a10';x.font='italic 1.4rem Cormorant Garamond,serif';x.textAlign='center';
  x.fillText('Scratch here ✦',r.width/2,r.height/2+6);}
 size();
 function pos(e){var r=c.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]}
 function scratch(e){if(!down||done)return;var p=pos(e);x.globalCompositeOperation='destination-out';x.beginPath();x.arc(p[0],p[1],20,0,7);x.fill();}
 function check(){if(done)return;var k=window.devicePixelRatio||1,d=x.getImageData(0,0,c.width,c.height).data,n=0;
  for(var i=3;i<d.length;i+=64)if(d[i]===0)n++;
  if(n/(d.length/64)>.5){done=true;c.style.opacity=0;c.style.pointerEvents='none';}}
 c.addEventListener('pointerdown',function(e){down=true;c.setPointerCapture(e.pointerId);scratch(e)});
 c.addEventListener('pointermove',scratch);
 c.addEventListener('pointerup',function(){down=false;check()});
 c.addEventListener('pointercancel',function(){down=false});
})();

// Soft tone (generated, no external audio)
(function(){
 var b=document.getElementById('mus'),ctx,gain,on=false;
 b.onclick=function(){
  try{
   if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)();gain=ctx.createGain();gain.gain.value=0;gain.connect(ctx.destination);
    [220,277.18,329.63,440].forEach(function(f,i){var o=ctx.createOscillator();o.type='sine';o.frequency.value=f;o.detune.value=i*3;
     var g=ctx.createGain();g.gain.value=.12;o.connect(g);g.connect(gain);o.start();});}
   on=!on;ctx.resume();gain.gain.linearRampToValueAtTime(on?.25:0,ctx.currentTime+1);
   b.setAttribute('aria-pressed',on);b.textContent=on?'♪ Music on':'♪ Music';
  }catch(e){}
 };
})();

// Opening screen
(function(){
 var g=document.getElementById('gate'),b=document.getElementById('openBtn');
 b.addEventListener('click',function(){
  g.classList.add('open');
  document.body.classList.remove('locked');
  var m=document.getElementById('mus');if(m&&m.getAttribute('aria-pressed')!=='true')m.click();
  setTimeout(function(){g.remove()},1500);
 });
})();
