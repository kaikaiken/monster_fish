const food_speed = 1;
let food_number;
let current_food ;
let food_level;
let ctx;
function init() {
    food_number = 3;
    current_food = 0;
    food_level = 3;
    let canvas = document.getElementById('my_canvas');
    if(!canvas.getContext) return;
    ctx = canvas.getContext("2d");
}

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
        ctx.drawImage(img, 0, 0, 40, 50, 100.5, 0.5, 40, 50);
        ctx.drawImage(img, 0, 0, 40, 50, 100, 0, 40, 50);
    }
}
$(document).ready(function(){
    $("#my_canvas").click(function(e){
        let xPos = e.pageX - document.getElementById('my_canvas').offsetLeft - 10;
        let yPos = e.pageY - document.getElementById('my_canvas').offsetTop - 10;
        createFood(xPos , yPos);
        // draw();
    })
});
function createFood(x , y) {
    // $("#buffer").append('<img id="create_food_' + food_number +'" src="./img/foods/food.png">')
    // let food_img = document.getElementById("create_food_" + food_number);
    // ctx.drawImage(food_img, 0, 0, 40, 50, x, y, 40, 50);
    // food_number++;
    // food_img.setAttribute("data-x" , x);
    // food_img.setAttribute("data-y" , y);
    // food_img.onload = function(){
    //     foodMove();
    //  }
    for(let i=0;i < food_level;i++){
        let food_img = document.getElementById("create_food_0" + i);
        if(food_img.getAttribute("data-use") === "0"){
            food_img.setAttribute("data-use" , "1");
            food_img.setAttribute("data-x" , x);
            food_img.setAttribute("data-y" , y);
            break;
        }
    }


}

function foodMove() {
    // for(let i = 0 ; i < food_number ; i ++){
    //     let img = document.getElementById("create_food_" + i);
    //     let temp_y = img.getAttribute("data-y");
    //     let temp_x = img.getAttribute("data-x");
    //     let new_y = parseInt(temp_y , 10) + food_speed;
    //     ctx.clearRect(parseInt(temp_x , 10), parseInt(temp_y , 10) , 40 , 50);
    //     // img.offsetTop = img.offsetTop+ food_speed;
    //     img.setAttribute("data-y" , new_y.toString());
    //     ctx.drawImage(img, 0, 0, 40, 50, img.getAttribute("data-x"), new_y, 40, 50);
    // }
    // requestAnimationFrame(foodMove);
    for(let i = 0 ; i < food_level ; i ++){
        let img = document.getElementById("create_food_0" + i);
        if(img.getAttribute("data-use") === "1"){
            let temp_y = img.getAttribute("data-y");
            let temp_x = img.getAttribute("data-x");
            let new_y = parseInt(temp_y , 10) + food_speed;
            if(new_y === 542){
                ctx.clearRect(parseInt(temp_x , 10), parseInt(temp_y , 10) , 40 , 50);
                img.setAttribute("data-use" , "0");
            }else{
                ctx.clearRect(parseInt(temp_x , 10), parseInt(temp_y , 10) , 40 , 50);
                img.setAttribute("data-y" , new_y.toString());
                ctx.drawImage(img, 0, 0, 40, 50, img.getAttribute("data-x"), new_y, 40, 50);
            }
        }
    }
    requestAnimationFrame(foodMove);

}

$(document).ready(function(){
    init();
    foodMove();
});

