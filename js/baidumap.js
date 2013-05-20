/**
 * 百度地图js
 */
//初始化
function init()
{
	getLocation();
	//setInterval("getLocation()",5000); //是否要持续定位 百度不支持watchPosition
}
//得到定位
function getLocation()
{
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showMap,handleError,{enableHighAccuracy:true,maximumAge:1000});
	}else{
		alert("您的浏览器不支持使用HTML5来获取地理位置服务");
	}
}
//成功获取后的回调函数showMap
function showMap(position)
{
	var lng = position.coords.longitude;
	var lat = position.coords.latitude;
	alert(lng+","+lat);
	return;
	var map = new BMap.Map("map");
	//创建点坐标
	var start_point = new BMap.Point(lng,lat);						//起点
	var end_point  = new BMap.Point(117.03936,36.643665);   		// 终点
	map.centerAndZoom(start_point,15);
	//创建标注
	//var marker = new BMap.Marker(new BMap.Point(lng,lat));
	//将标注添加到地图中
	//map.addOverlay(marker);
	var driving = new BMap.DrivingRoute(map,{renderOptions:{map: map, autoViewport: true ,panel : 'log'}});
	driving.search(start_point, end_point);
}
//当发生错误时，回调错误信息
function handleError(errors)
{
	switch(errors.code){
		case 1 : alert("位置服务被拒绝"); break;
		case 2 : alert("暂时获取不到位置信息");break;
		case 3 : alert("获取信息超时");break;
		case 4 : alert("未知错误");break;
	}
}


















