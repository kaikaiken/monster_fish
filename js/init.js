function draw(){
    let canvas = document.getElementById('my_canvas');
    if(!canvas.getContext) return;
    let ctx = canvas.getContext("2d");
    //开始代码
    // ctx.beginPath(); //新建一条path
    // ctx.moveTo(50, 50); //把画笔移动到指定的坐标
    // ctx.lineTo(200, 50);  //绘制一条从当前位置到指定坐标(200, 50)的直线.
    // //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
    // ctx.closePath();
    // ctx.stroke(); //绘制路径。
    let img = document.getElementById("init_pic_01");
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 40, 50, 100, 0, 40, 50);
    }
}
$("#my_canvas").click(function(e){
    alert(e.pageX);
    alert(e.pageY)
    // let ev = ev || window.event;
    // let mousePos = mouseCoords(ev);
    // mousePosX = mousePos.x;
    // mousePosY = mousePos.y;
    // console.log(mousePosX);
    // console.log(mousePosY);
    // makearc(mousePosX,mousePosY,GetRandomNum(4,4),0,180,'red');
})
draw();
