$(function() {
	var timer;
	var number = 0;

	var cont = document.getElementsByClassName('content')[0];
	cont.innerHTML += cont.innerHTML;
	// 自动轮播
	function AutoPlay() {
		// clearTimeout() 方法可取消由 setTimeout() 方法设置的定时操作。
		clearTimeout(timer);
		// setInterval() 可以以指定的时间间隔（以毫秒为单位）调用函数或计算表达式
		timer = setInterval(function() {
			// 自减
			number--;
			//如果number等于-2000时，归0
			if (number == -2000) {
				number = 0;
			}
			$('.content').css('left', number);
		}, 15);
	}
	AutoPlay();
	// 鼠标滑入暂停
	$('.content li').mouseenter(function() {
		clearTimeout(timer);
	}).mouseleave(function() {
		AutoPlay();
	})
})
