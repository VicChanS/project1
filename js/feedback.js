$(function() {
	$("#ty").click(function() {
		//检测是否登录账号，如未登录，跳转至登录页面登录
		if (sessionStorage.user == "" || sessionStorage.user == undefined) {
			alert("您未登录！请先登录账号！")
			$(location).attr('href', 'login.html');
		} else {
			var comment = $("#cmt")
			if (comment.val() == "") {
				alert("请输入内容！")
			} else {
				alert("感谢您的反馈！")
				location.reload(true);
			}
		}
	})
})
