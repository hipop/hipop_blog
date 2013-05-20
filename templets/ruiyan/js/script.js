$(document).ready(function(){
	$("a.new_window").attr("target", "_blank");
});
 
 /*index player ÈÝÒ×ÒýÆð³åÍ»*/
 
function showAuto(){
	n = n >= (count - 1) ? 0 : n + 1;
	$("#play_text span").eq(n).trigger('mouseover');
}

var t = n = count = 0;


$(function(){
	if ($("#play_list")[0]) {
		count = $("#play_list a.item").size();
		var listr = '';
		if(count > 0) {
			for(var i = 1; i < ( count + 1 ); i++) {
				listr += "<span class='no'>"+i+"</span>";
			}
			$('#play_text').append(listr);
		}
		$("#play_list a.item:not(:first-child)").hide();
		$("#play_text span.no:first-child").css({"background":"#FF9415",'color':'#FFF','height':'18px','width':'18px'});
		$("#play_text span.no").mouseover(function(e) {
			var _this = this,
			i = $(_this).text() - 1;
			n = i;
			if (i >= count) return;
			$(_this).css({"background":"#FF9415",'color':'#FFF','height':'18px','width':'18px'}).siblings().css({"background":"#FCF2CF",'color':'#D94B01','height':'16px','width':'16px'});
			setTimeout(function() {
				$("#play_list a.item").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
			},1);
			e.stopPropagation();
		});

		t = setInterval("showAuto()", 3000);
		$("#play").hover(function(){
			clearInterval(t);
			//console.log("clear t");
		}, function(){
			t = setInterval("showAuto()", 3000);
			//console.log("set t");
		});
	}
});
