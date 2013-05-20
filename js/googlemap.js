/**
 * 
 */
//准备dom
var gmap = {
	map : null,
	marker : null
};
//这是初始化方法，用来绘制google地图
function init(){
	console.log("开始进入初始化方法 init() method");
	try{
		if(typeof navigator.geolocation === 'undefined'){
			gl = google.gears.factory.create('beta.geolacation');
		}else{
			gl = navigator.geolocation;
		}
	}catch(e){
		
	}
	if(gl){
		console.log('你的浏览器支持 geolocation');
		gl.getCurrentPosition(show_map,handle_error,null);
	}else{
		console.log('你的浏览器不支持 geolocation');
	}
	/*if(navigator.geolocation){
		console.log('你的浏览器支持 geolocation');
		//alert('你的浏览器支持 geolocation');
		navigator.geolocation.getCurrentPosition(show_map,handle_error,true);
	}else{
		console.log('你的浏览器不支持 geolocation');
		//alert('你的浏览器不支持 geolocation');
	}*/
}

function show_map(position){
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	//var altitude=coords.altitude;//取得海拔高度
	//if(altitude!=null){
	//	positionString+="海拔高度"+coords.altitude+"<br/>";
	//}
	var positionString ="经纬度精确到："+position.coords.accuracy+"米"+"<br/>";
	document.getElementById('info').innerHTML = "您所在的位置：经度" + lng + "，纬度" + lat + "<br>" + positionString;
	navigator.geolocation.watchPosition(refreshPosition);
	
	//载入 Google 地图
	var latlng = new google.maps.LatLng(lat,lng);
	var myOptions = {
		zoom : 14,//设定放大倍数
		center : latlng,//将地图的中心是定为设定的坐标点
		mapTypeId : google.maps.MapTypeId.ROADMAP//指定地图的类型，这里选择的是街道地图
	}
	// 创建地图并在"map"div中显示，把这个地图叫做map
	gmap.map = new google.maps.Map(document.getElementById("map"),myOptions);
	//向地图添加标记
	gmap.marker = new google.maps.Marker({
		//标注刚才创建的标注点，因为标注点是由当前的经纬度设定的，所以表示了当前位置
		position : latlng,
		//标注在哪张地图上，我们创建了map1作为google map，所以标注在map1上
		map : gmap.map
	});
	// 设定标注窗口，并且指定该窗口的注释文字
	var infoWindow = new google.maps.InfoWindow({
		content : "这是您的浏览器的当前位置!"
	});
	// 打开标注窗口
	infoWindow.open(gmap.map,gmap.marker);
}
//移动后 重新定位坐标
function refreshPosition(position){
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	var latlng = new google.maps.LatLng(lat,lng);
	var positionString ="经纬度精确到："+position.coords.accuracy+"米"+"<br/>";
	//重设地图位置
	gmap.map.setCenter(latlng);
	document.getElementById('info').innerHTML='您所在的位置：经度'+ lat +'，纬度' + lng + "<br>" + positionString;
	//重设标记位置
	gmap.marker.setOptions({
		postion : new google.maps.LatLng(lat, lng)
	});
}
//这是第二个回调函数，用于当geolocation获取用户浏览器所在的地理位置失败时候的响应
//error对象封装了所有的可能出现的无法获得地理位置的错误信息，并且HTML5为其预留了错误码，可以取值{1,2,3}
function handle_error(error){
	var errorTypes={
		1:'位置服务被拒绝',
		2:'获取不到位置信息',
		3:'获取信息超时'
	}
	console.log(errorTypes[error.code] + "：，不能确定你的当前地理位置");
}