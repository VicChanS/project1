$(function() {
	if (sessionStorage.getItem('user')) {
		$("#login .login").css("display", "none")
		$("#login .user").css("display", "block")
		$("#register .register").css("display", "none")
		$("#register .logout").css("display", "block")
	}
	//账号登出
	$("#register .logout").click(function() {
		alert("成功退出账号！")
		sessionStorage.clear()
		location.reload(true)
	})

})
