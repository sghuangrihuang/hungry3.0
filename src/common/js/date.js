export function formatDate(date, fmt){
	var year = date.getFullYear();
	var month = Tozero(date.getMonth()+1);
	var day  = Tozero(date.getDate());
	var hours = Tozero(date.getHours());
	var min = Tozero(date.getMinutes());
	var sen = Tozero(date.getSeconds());
	var str;
	str= year+"-"+ month+"-"+day+" "+hours+":"+min+":"+sen;
	return str;
}

function Tozero(num){
	if(parseInt(num)<10){	
		return "0"+num
	}
	return num;
}