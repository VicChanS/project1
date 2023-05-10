$(function() {
	//名字数组
	var nameArr = ["极客湾", "老林", "小张", "琦玉老师本人", "头发没了，也更强了"];
	//名字对应下标 也是要生成的随机数的数组
	var newArr = [];
	//本地存储数据 对象数组
	var bd_arr = [];
	//每次刷新页面 或者一进入页面 有历史记录就要显示出来
	getItem();
	//发布按钮 因为并未有li标签，用on()绑定点击事件
	$("#send").on("click", function() {
		//检测是否登录账号，如未登录，跳转至登录页面登录
		if (sessionStorage.user == "" || sessionStorage.user == undefined) {
			alert("您未登录！请先登录账号！")
			$(location).attr('href', 'login.html');
		}
		//检测有没有输入内容 有内容允许发布 否则提示
		if ($(this).parents().siblings("#area").val() == "") {
			alert("不能发布空内容噢！");
		} else {
			//获取要存储的新的数据
			var name = nameArr[arfa()];
			var time = getTime();
			var nr = $(this).parents().siblings("#area").val();
			// push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
			//要存储的数据 以对象的形式放在数组里
			bd_arr.push({
				name: name,
				time: time,
				nr: nr
			});
			// JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
			var str = JSON.stringify(bd_arr);
			//向本地申请空间 存起来
			localStorage.setItem('li', str);
			//刷新数据 再显示最新的所有li
			getItem();
			//文本框置空
			$("#area").val("");
			//输入的字符置0
			$(".useCount").html("0");
			//发布完成 禁用按钮
			$("#send").prop("disabled", true);
		}
	});
	// 可以绑定多个事件 用对象的方式 输入框绑定input,focus,,blur事件
	$("#area").on({
		input: function() {
			// 输入内容小于0禁用发布按钮
			if ($(this).val().length == 0) {
				$(".useCount").html("0");
				$("#send").prop("disabled", true);
			} else if ($(this).val().length > 200) { //大于最大输入值 只取前200个字符做有效值
				$(this).val($(this).val().substring(0, 200));
			} else {
				//在有效范围内 解禁发布按钮
				$("#send").prop("disabled", false);
				//实时显示用户输入的字符数
				$(".useCount").html($(this).val().length);
			}
		},
		focus: function() {
			//重新获得焦点 解禁发布按钮 禁用删除按钮
			$("#send").prop("disabled", false);
			$("li").each(function(index, ele) {
				$(ele).find("#remove").prop("disabled", true);
			});
		},
		blur: function() {
			//失去焦点 解禁 删除按钮
			$("li").each(function(index, ele) {
				$(ele).find("#remove").prop("disabled", false);
			});
		}
	});
	//获取当时时间
	function getTime() {
		var data = new Date();
		return (data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate() + " " + data.getHours() + "时" +
			data.getMinutes() + "分" + data.getSeconds() + "秒");
	}
	//生成随机数 去重
	function arfa() {
		if (newArr.length === 0) {
			for (var i = 0; i < nameArr.length; i++) {
				newArr[newArr.length] = i;
			}
		}
		var num = Math.floor(Math.random() * nameArr.length);
		while (1) {
			if (newArr.indexOf(num) !== -1) {
				newArr.splice(newArr.indexOf(num), 1);
				break;
			} else {
				num = Math.floor(Math.random() * nameArr.length);
				continue;
			}
		}
		return num;
	}
	//读取本地数据
	function getItem() {
		// 姓名
		var name_arr = [];
		// 时间
		var time_arr = [];
		// 内容
		var nr_arr = [];
		// li标签
		var li_str = null;
		//读取本地数据
		var str = localStorage.getItem('li');
		if (str != null) {
			//使用JSON.parse将字符串数组转换为对象数组
			bd_arr = JSON.parse(str);
			// 循环遍历
			for (var i = 0; i < bd_arr.length; i++) {
				// 取出一个对象
				var obj = bd_arr[i]; // {name:"...",time:"...",nr:"。。。"}
				name_arr[name_arr.length] = obj.name;
				time_arr[time_arr.length] = obj.time;
				nr_arr[nr_arr.length] = obj.nr;
			}
			//根据取出的数据 动态创建li
			for (var i = 0; i < name_arr.length; i++) {
				li_str = "<li>" +
					"<div class='media border p-3'>" +
					"<img class=\"mr-3 mt-3 rounded-circle\" src='img/01.jpeg' style=\"width:60px;\">" +
					"<div class=\"media-body\">" +
					"<span>" + name_arr[i] + "</span>" +
					"<p class=\"small text-secondary\">" + "发布于：" + time_arr[i] + "</p>" +
					"<div class='content'>" + nr_arr[i] + "</div>" +
					"</div>" +
					"<button class=\"btn btn-primary align-self-center\" id='remove'>" + "删除" + "</button>" +
					"</li>" +
					li_str;
			}
			//因为有数据更新要覆盖显示 所以用了html方式添加li fadeTo()淡入效果
			$(".comment-area ul").html($(li_str)).children().stop().fadeTo(1000, 1);
			//在刚进入页面 没有发布按钮的点击事件时 删除按钮也要好用 所以这里也要绑定点击事件
			//给删除按钮绑定 点击事件 因为li动态生成的 要在生成之后立马绑定事件
			$("li button").each(function(i, e) {
				$(e).on("click", function() {
					$(this).parents("li").remove();
					// pop() 方法用于删除数组的最后一个元素并返回删除的元素。
					//要删除的数据 在数组里找到并删除
					bd_arr.pop({
						name: $(this).parents("li").find(".media-body span").html(),
						time: $(this).parents("li").find(".media-body p").html(),
						nr: $(this).parents("li").find(".content").html()
					});
					//转成字符串
					str = JSON.stringify(bd_arr);
					//覆盖删除前的数据
					localStorage.setItem('li', str);
				});
			});
		}
	}
});
