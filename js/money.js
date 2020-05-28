function  createCoin(x , y , direct ,type) {
    $("#money_buffer").append('<img class="money_sample" id="Coin_' + coin_total_num
        +'" src="./img/money/coin_'+ type +'0.jpg" data-current="0" data-type="'+ type +'">')
    let img = document.getElementById("Coin_"+coin_total_num);
    if(direct === 0){
        img.style.left = (parseInt(x,10)+ 40).toString() +"px";
        img.style.top = y+ "px";
    }else{
        img.style.left = x +"px";
        img.style.top = y + "px";
    }

    coin_total_num++

}

function coinMove() {
    for(let i = 0 ; i < food_level ; i ++){
        let imgS = document.getElementsByClassName("money_sample");
        for(let i = 0 ; i < imgS.length;i++){
            let img = imgS.item(i);
            let new_y = parseInt(img.style.top.slice(0,-2),10) + coin_drop_speed;
            if(new_y >= 618){

            }else{

                img.style.top = new_y + "px";
            }
        }
    }


    requestAnimationFrame(coinMove);
}

//硬币下落动画
function coinAnimate(img){
    let animate = img.getAttribute("data-current");
    let type = img.getAttribute("data-type");
    if(animate === "9"){
        img.src = "./img/money/coin_"+ type + 1 +".jpg";
        img.setAttribute("data-current" , "1");
    }else{
        animate++;
        img.src = "./img/money/coin_"+ type + animate +".jpg";
        img.setAttribute("data-current" , animate);
    }
}

$(document).ready(function(){
    coinMove();
});