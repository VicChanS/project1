$(function() {
	$(document).ready(function() {
		var tip1 = "<span class='span1'>用户名不能为空!</span>"; //声明发生错误时在输入框后面添加的span
		var tip2 = "<span class='span2'>密码长度不能小于五位且最多为十位 !</span>";
		$("#uname").blur(function() {
			if (!$("#uname").val()) { //判断用户名是	否非空
				$(".span1").remove()
				$("#uname").after(tip1)
			} else {
				$(".span1").remove()
			}
		})
		$("#pwd").blur(function() {
			if ($("#pwd").val().length < 5 || $("#pwd").val().length > 10) { //判定密码长度不能小于5位且不能大于10位
				$(".span2").remove();
				$("#pwd").after(tip2)
			} else if(!$("#pwd").val()){
				$(".span2").remove()
			}
		})
		$("#btn").click(function() { //符合所有条件则弹出弹窗表单验证通过，如果不符合则弹出弹窗提醒用户更改
			if (!$("#uname").val || $("#pwd").val().length < 5 || $("#pwd").val().length > 10) {
				alert("注册信息有误，请更改个人信息")
			}else{
				$(location).attr('href', 'register-complete.html');
			}
		})
	})
})
