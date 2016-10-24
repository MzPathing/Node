# Node
# 库文件树、导航：
[readme](https://github.com/MzPathing/Node "readme文件")：文档声明，注意事项、导航等<br>
[demo](https://github.com/MzPathing/Node/tree/master/blog "案例")：一个从0开始搭建的个人博客：<br>
[demo](https://github.com/MzPathing/Node/tree/master/demo "案例")：应用实例,访问列表如下：<br>
1. d1:[mongodb实现数据库交互功能](https://github.com/MzPathing/Node/tree/master/demo/d1mongodb%E5%AE%9E%E7%8E%B0%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BA%A4%E4%BA%92%E5%8A%9F%E8%83%BD "[mongodb")<br>
2. d2:[cheerio制作的简单网页爬虫](https://github.com/MzPathing/Node/tree/master/demo/d2cheerio%E5%88%B6%E4%BD%9C%E7%9A%84%E7%AE%80%E5%8D%95%E7%BD%91%E9%A1%B5%E7%88%AC%E8%99%AB "cheerio")<br>
3. d3:[superagent获取慕课搜索列表](https://github.com/MzPathing/Node/tree/master/demo/d3superagent%E8%8E%B7%E5%8F%96%E6%85%95%E8%AF%BE%E6%90%9C%E7%B4%A2%E5%88%97%E8%A1%A8 "superagent")<br>
4. d4:[socketio搭建简单网络聊天室](https://github.com/MzPathing/Node/tree/master/demo/d4socketio%E6%90%AD%E5%BB%BA%E7%AE%80%E5%8D%95%E7%BD%91%E7%BB%9C%E8%81%8A%E5%A4%A9%E5%AE%A4 "socketio")<br>

注意事项
========
1.所有实例额外有模块，因为模块文件过大，所以未上传，模块版本以package.json为准，如果没有或者package.json未申明版本号，版本是以当前最新版本；<br>
2.代码注释部分是以本人理解实践得到或者引用原注释，如果有欠妥当之处欢迎指出更正；<br>
3.代码运行阅读以未注释部分为准，注释部分为另一种方法或者解释；<br>
4.本连接涉及所有内容只作为知识分享及交流使用<br>

如想要查看以上实例我遇到的问题和解决方法，请继续往下看
--------------------------------------------------
 一个从0开始搭建的个人博客
==================================
需求分析
-------------------------
* 前台显示界面（普通用户）：登录/注册界面、搜索功能、评论功能、留言功能
* 后台管理界面（管理用户）：用户管理、文章管理、评论管理、发布文章
登录/注册界面
------------

<h3>注册逻辑（路由/signup）</h3>
<h4>用户名(注册时应该使用ajax交互，防止刷新整个页面，并且要在后台验证交互的用户名是否存在，格式是否正确)</h4>

* 用户名不能为空（如果为null）
* 用户名应该在2-10位之间（正则表示：^\\w{2,10}$,^开头表示和$结尾标志分别限制了长度，防止匹配一部分[没有使用时遇到了这个坑，导致只能限制最小位数不能限制最大位数]）
* 用户名应该不能喝数据库已有的用户名重名（用到数据库的查找[findone]方法，这个方法有一个回调函数，返回错误信息[err]和查找结果[result]，在验证中我因为错误地只使用了参数，导致重名的时候err是null，无法判断有重名情况，后更正）

<h4>密码(注册时监测失去焦点事件，回调函数)</h4>
* 密码应该是6-20位之间[正则：\\w{6,20}]
* 密码不能为空
* 密码不能全部为数字（正则：[a-zA-Z]+）
<h4>重复</h4>

* 应该与密码保持一致
<h4>联系方式</h4>

* 无，作为备用
<h4>提交功能（不能直接把button写到form里面，可能会导致提交两次）和重置按钮</h4>（提高用户体验）
<h3>前后交互逻辑</h3>
<h4>前端后台数据交互格式:json</h4>
<h4>前端模块渲染:ejs</h4>
* 根据后台数据（后台数据分为2个，一个是否成功[1,0]，另一个是返回的message）根据返回的不同，通过if语句插入esj或者使用jquery动态加载

    
