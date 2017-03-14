(function(){

var pos = {
	initPos : function(textoutput,func){
		this.msg=textoutput;
		this.func = func,
		navigator.geolocation.getCurrentPosition(this.succes.bind(this),this.fail.bind(this));
		
	},
	succes : function(e){

		this.position=[e.coords.latitude,e.coords.longitude];
		this.msg.innerText="Location "+ e.coords.latitude+", "+e.coords.longitude;
		this.func();
	},
	fail : function(e){
		this.msg.innerText=e.message;
	},
	getPosition : function(){

		return this.position||false;
	}
}

function refreshPos(container,output,link){
	pos.initPos(output,work);
	function work(){
		container.classList.remove("error","complet");
		if(!pos.getPosition()){
			container.classList.add("error");
			link.setAttribute("href","#");		
			}
		else{
			container.classList.add("complet");
			link.setAttribute("href","http://bing.com/maps/default.aspx?cp="+pos.getPosition()[0]+"~"+pos.getPosition()[1]);
		}
	}
	
}

window.onload= function(){
	var button = document.querySelector("button"),
		output = document.querySelector("div"),
		container = document.querySelector("section"),
		link= document.querySelector("a");

		refreshPos(container,output,link);

		button.addEventListener("click",function(){refreshPos(container,output,link);})
	}


})();