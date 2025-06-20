我正在学习程序设计，用html+css+js开发一个图书管理系统。在一个页面上实现：图书添加、查询、列表；用户添加、修改、删除、列表；借书、还书、列表。页面为英文。
定义了6个类：Library、Book、User、Librarian（继承user）、Member（继承user）、BorrowingRecord。每个类中有若干方法。

项目目录结构为：
View.html：用户页面，可用直接用浏览器打开运行，不依赖于服务器
Style.css：页面样式
Controller.js：存放js代码，并预设了3本书、2个用户
子目录modle存放6个类，分别为：
Library.js
Book.js
User.js
Librarian.js
Member.js
BorrowingRecord.js
