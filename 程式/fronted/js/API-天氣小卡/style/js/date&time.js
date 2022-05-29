function ShowTime(){
    　var NowDate=new Date();
    　var uu=NowDate.getFullYear();
    　var mm=NowDate.getMonth()+1;
    　var dd=NowDate.getDate();
    　var h=NowDate.getHours();
    　var m=NowDate.getMinutes();
    　var s=NowDate.getSeconds();　
    　document.getElementById('showbox').innerHTML = '<i class="fa-solid fa-cloud-sun-rain"></i><i class="fa-solid fa-radio"></i> : '+uu+'年'+mm+'月'+dd +'日'+' '+ h+':'+m;
    　setTimeout('ShowTime()',1000);
    }