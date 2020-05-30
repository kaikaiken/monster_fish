//鼠标点击加食物
$(document).ready(function(){
    $("#my_canvas").click(function(e){
        if(e.pageY <= 620 && e.pageX >= 45 && e.pageX<=1425){
            createFood(e.pageX-12 ,e.pageY-12);
        }
    })
});

//创建食物
function createFood(x , y) {
    for(let i=0;i < food_level;i++){
        let food_img = document.getElementById("create_food_0" + i);
        if(food_img.getAttribute("data-use") === "0"){
            costMoney(buy_Food_cost);
            food_number++;
            food_img.setAttribute("data-use" , "1");
            food_img.style.display = "";
            food_img.style.top = y+"px";
            food_img.style.left = x+"px";
            break;
        }
    }

}

//食物移动
function foodMove() {
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
    if(game_start_flag === 1){
        requestAnimationFrame(foodMove);
    }
}

//销毁食物
function deleteFood(img) {
    img.style.top = "";
    img.style.left = "";
    food_number--;
    img.setAttribute("data-use" , "0");
    img.style.display = "none";
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

function food_game(){
    foodMove();
}


