function DrawingCanvas(id, w, h){
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext('2d');
  const colors = document.getElementsByClassName('jsColor');
  const colorCustom = document.getElementById('colorCustom');
  const range = document.getElementById('jsRange');
  const brushSize = document.getElementById('icoBrushSize');
  const mode = document.getElementById('jsMode');
  const btnSave = document.getElementById('jsSave');
  
  const INIT_COLOR = '#2c2c2c';
  const CANVAS_WIDTH = w;
  const CANVAS_HEIGHT = h;
  
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.strokeStyle = INIT_COLOR;
  ctx.fillStyle = INIT_COLOR;
  ctx.lineWidth = 5.0;
  
  let painting = false;
  let filling = false;
  
  function stopPainting(){
    painting = false;
  }
  
  function startPainting(){
    painting = true;
  }
  
  function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  function onTouchStart(event){
    event.preventDefault();
    ctx.beginPath();
    painting = true;
  }

  function onTouchMove(event){
    event.preventDefault();
    var touches = event.changedTouches;
    console.log(touches[0]);
    const x = touches[0].pageX;
    const y = touches[0].pageY;
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function onTouchEnd(event){
    event.preventDefault();
    ctx.closePath();
    painting = false;
  }
  
  function onMouseDown(event){
    painting = true;
  }
  
  function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    colorCustom.value = rgb2hex(color);
    var evnt = new Event('input');
    colorCustom.dispatchEvent(evnt);;
  }

  function handleCustomColor(event){
    const color = event.target.value;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  }
  
  function handleRangeChange(event){
    const size = event.target.value
    ctx.lineWidth = size;
    brushSize.setAttribute('style', 'width:' + size + 'px; height:' + size + 'px;');
  }
  
  function handleModeClick(){
    if(filling === true){
      filling = false;
      mode.innerText = 'Fill';
    } else {
      filling = true;
      mode.innerText = 'Paint';
    }
  }
  
  function handleCanvasClick(){
    if(filling) {
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }
  
  function handleCM(event){
    //event.preventDefault(); 우클릭 방지
  }
  
  function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image
    link.download = 'image';
    link.click();
    console.log(image);
  }
  
  if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);

    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchend', onTouchEnd);
  }
  
  Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

  if(colorCustom){
    colorCustom.addEventListener('input', handleCustomColor);
  }
  
  if(range){
    range.addEventListener('input', handleRangeChange);
  }
  
  if(mode){
    mode.addEventListener('click', handleModeClick);
  }
  
  if(btnSave){
    btnSave.addEventListener('click', handleSaveClick);
  }
}

function rgb2hex(orig){
  var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
  return (rgb && rgb.length === 4) ? "#" +
   ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
 }
