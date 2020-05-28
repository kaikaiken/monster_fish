//鼠标点击加食物
$(document).ready(function(){
    $("#my_canvas").click(function(e){
        // let xPos = e.pageX - document.getElementById('my_canvas').offsetLeft - 10;
        // let yPos = e.pageY - document.getElementById('my_canvas').offsetTop - 10;
        // createFood(xPos , yPos);
        createFood(e.pageX-12 ,e.pageY-12);
    })
});

//创建食物
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
            food_img.style.top = y+"px";
            food_img.style.left = x+"px";
            break;
        }
    }

    // $("#food_buffer").append('<img class="food_sample" id="init_pic_01" src="./img/foods/food_1.jpg" style="left:'+x+'px;top:'+y+'px" >');
    //
    // alert( document.getElementById("init_pic_01").style.top);
    // let img=document.getElementById("init_pic_01");


}

//食物移动和销毁
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
            let new_y = parseInt(img.style.top.slice(0,-2),10) + food_speed;
            if(new_y === 618){
                deleteFood(img);
            }else{
                foodAnimate(img);
                img.style.top = new_y + "px";
            }
        }
    }
    // let imgS = document.getElementsByClassName("food_sample");
    // for( let i=0;i<imgS.length;i++){
    //
    //     imgS.item(i).style.top = (parseInt(imgS.item(i).style.top.slice(0,-2),10) + food_speed).toString() + "px";
    // }

    requestAnimationFrame(foodMove);

}

//销毁食物
function deleteFood(img) {
    img.style.top = "";
    img.style.left = "";
    img.setAttribute("data-use" , "0");
}

//食物下落动画
function foodAnimate(img){
    let animate = img.getAttribute("data-current");
    if(animate === "10"){
        img.src = "./img/foods/food_"+ 1 +".jpg";
        img.setAttribute("data-current" , "1");
    }else{
        animate++;
        img.src = "./img/foods/food_"+ animate +".jpg";
        img.setAttribute("data-current" , animate);
    }
}

$(document).ready(function(){
    foodMove();
});
