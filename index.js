var provinces = new Array("1","2","3","4","5","6","7","8","9","完成","0","清空");
var zhanghao='',usermima='',xinghao='';
var keyNums = new Array(
			"+","#",",",".","/","\\","?","*","@","!",
			"0","1","2","3","4","5","6","7","8","9",		
            "Q","W","E","R","T","Y","U","I","O","P",
            "A","S","D","F","G","H","J","K","L",
           "Z","X","C","V","B","N","M","←","ABC", "完成"
			
			);/*"0","1","2","3","4","5","6","7","8","9",*/

var xiaox = new Array(
					  "+","#",",",".","/","\\","?","*","@","!",
					  "0","1","2","3","4","5","6","7","8","9",
					  "q","w","e","r","t","y","u","i","o","p",
            "a","s","d","f","g","h","j","k","l",
            "z","x","c","v","b","n","m","←","abc","完成"
			);

var fuhao =  new Array("!","@","#","$","%","^","&","*","(",")","-","=",
            "完成","删除","预留");



var next=0;		

function tips(msg){

	$("#error_tips").css({display:'block'});
	$('#error_message').html(msg);
	setTimeout("$(\"#error_tips\").css({display:'none'})", 2000);
}


	function showProvince(){
		tips("请使用安全键盘输入，防盗号欺诈");
			$("#pro").html("");
			var ss="";
			for(var i=0;i<provinces.length;i++){
				ss=ss+addKeyProvince(i)
			} 
			$("#pro").html("<div class=\"zleft\"><ul class='clearfix ul_pro'>"+ss+"</ul></div><div class=\"zright\">");
	} 
	function showKeybord(){
			$("#pro").html("");
			var sss="";
			for(var i=0;i<keyNums.length;i++){
				if(i!=47) sss=sss+'<li class="ikey ikey'+i+' '+(i>9?"li_zm":"li_num")+' '+(i>48?"li_w":"")+'" ><span onclick="choosekey(this,'+i+');">'+keyNums[i]+'</span></li>';
				if(i==47) sss+='<li class="ikey ikey'+i+' '+(i>9?"li_zm":"li_num")+' '+(i>48?"li_w":"")+'" ><span onclick="xiaoxsssss();">abc</span></li>';
			} 
			$("#pro").html("<ul class='clearfix ul_keybord'>"+sss+"</ul>");
	}
	
	function xiaoxsssss(){
			$("#pro").html("");
			var sss="";
			for(var i=0;i<xiaox.length;i++){
				if(i!=47) sss=sss+'<li class="ikey ikey'+i+' '+(i>9?"li_zm":"li_num")+' '+(i>48?"li_w":"")+'" ><span onclick="choosekey(this,'+i+');">'+xiaox[i]+'</span></li>';
				if(i==47) sss+='<li class="ikey ikey'+i+' '+(i>9?"li_zm":"li_num")+' '+(i>48?"li_w":"")+'" ><span onclick="showKeybord();">ABC</span></li>';
			} 
			$("#pro").html("<ul class='clearfix ul_keybord'>"+sss+"</ul>");
		
	}
	
	
    function addKeyProvince(provinceIds){
        var addHtml = '<li>';
            addHtml += '<span onclick="chooseProvince(this,'+provinceIds+');">'+provinces[provinceIds]+'</span>';
            addHtml += '</li>';
            return addHtml;
    }

    function chooseProvince(obj,leng){
       if(leng!=9 && leng!=11){
		   $("#zhanghao").removeClass("ul_input_default");
		   zhanghao += $(obj).text();
		   $("#zhanghao").text(zhanghao);
		   $(".input_pro").addClass("hasPro"); 
		}else if(leng==9){
			closePro();
		}else if(leng==11){
			cleanPro();
		}
	   

	   //$(".input_pp").find("span").text("");
      // $(".ppHas").removeClass("ppHas");
	   next=0;
	  // showKeybord();
	}	
	
	
	function choosekey(obj,jj){	
		if( jj!=48 && jj!=46 ){
			$("#mimas").removeClass("ul_input_default");
			if(usermima.length>=16)return false;
			usermima += $(obj).text();
			xinghao +="•";
		}
		
		
		if(jj==48){
			layer.closeAll();
		}else if(jj==46){
			/*if($(".ppHas").length==0){
				$(".hasPro").find("span").text("");			
				$(".hasPro").removeClass("hasPro");	
				showProvince();
				next=0;
			}
			$(".ppHas:last").find("span").text("");			
			$(".ppHas:last").removeClass("ppHas");	
			next=next-1;
			if(next<1){
				next=0;
			}
			console.log(next);*/
			if(usermima.length<=0){
				$('#mimas').text('');
				usermima='';
				xinghao='';
			}else{
				usermima = usermima.substring(0,usermima.length-1);
				xinghao =  xinghao.substring(0,xinghao.length-1);
				$('#mimas').text(xinghao);  //*号代替
				//$('#mimas').text(usermima);
			}
			
			//alert(usermima.substring(0,usermima.length-1));
			return;
		}else{
			if(next>5){
				return
			}
			$('#mimas').text(xinghao);  //*号代替
			//$('#mimas').text(usermima);
			console.log(next);
			for(var i = 0; i<$(".input_pp").length;i++){
				if(next==0 & jj<10 & $(".input_pp:eq("+next+")").hasClass("input_zim")){
					layer.open({
						content: '车牌第二位为字母',
						skin: 'msg',
						time: 1
					});
					return
				}
				
				
				$(".input_pp:eq("+next+")").addClass("ppHas");
				next=next+1;
				if(next>5){
					next=6;
				}
				return
			}
			
		}
		
		
       
	}
	function closePro(){
       layer.closeAll()
	}		
	function cleanPro(){
	   $("#zhanghao").text('');
	   zhanghao = '';
       $(".hasPro").removeClass("hasPro");
       $(".ppHas").removeClass("ppHas");
	   next=0;
	}	
	function trimStr(str){return str.replace(/(^\s*)|(\s*$)/g,"");}
window.onload = function() {

	$(".input_pro").click(function(){
		 layer.open({
			type: 1
			,content: '<div id="pro"></div>'
			,anim: 'up'
			,shade :false 
			,style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
		  });
		 showProvince();
	})
	$(".input_password").click(function(){//单击密码
		 //if($(".input_pro").hasClass("hasPro")){ // 如果已选择省份
			 layer.open({
				type: 1
				,content: '<div id="pro"></div>'
				,anim: 'up'
				,shade :false 
				,style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
			  });
			 xiaoxsssss()
		/* }else{
			 $(".input_pro").click()
		 }*/
		 
	})
	

}
