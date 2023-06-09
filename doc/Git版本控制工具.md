# Git版本控制工具

## 一、什么是GIT? 

Git是目前世界上最先进的分布式版本控制系统



## 二、什么是版本控制系统? 

如果你用Microsoft Word写过长篇大论，那你一定有这样的经历：

想删除一个段落，又怕将来想恢复找不回来怎么办？有办法，先把当前文件“另存为……”一个新的Word文件，再接着改，改到一定程度，再“另存为……”一个新文件，这样一直改下去，最后你的Word文档变成了这样：

![lots-of-docs](https://www.liaoxuefeng.com/files/attachments/918921393733152/0)

过了一周，你想找回被删除的文字，但是已经记不清删除前保存在哪个文件里了，只好一个一个文件去找，真麻烦。

看着一堆乱七八糟的文件，想保留最新的一个，然后把其他的删掉，又怕哪天会用上，还不敢删，真郁闷。

更要命的是，有些部分需要你的财务同事帮助填写，于是你把文件Copy到U盘里给她（也可能通过Email发送一份给她），然后，你继续修改Word文件。一天后，同事再把Word文件传给你，此时，你必须想想，发给她之后到你收到她的文件期间，你作了哪些改动，得把你的改动和她的部分合并，真困难。

于是你想，如果有一个软件，不但能自动帮我记录每次文件的改动，还可以让同事协作编辑，这样就不用自己管理一堆类似的文件了，也不需要把文件传来传去。如果想查看某次改动，只需要在软件里瞄一眼就可以，岂不是很方便？

这个软件用起来就应该像这个样子，能记录每次文件的改动：

| 版本 | 文件名      | 用户 | 说明                   | 日期       |
| :--- | :---------- | :--- | :--------------------- | :--------- |
| 1    | service.doc | 张三 | 删除了软件服务条款5    | 7/12 10:38 |
| 2    | service.doc | 张三 | 增加了License人数限制  | 7/12 18:09 |
| 3    | service.doc | 李四 | 财务部门调整了合同金额 | 7/13 9:51  |
| 4    | service.doc | 张三 | 延长了免费升级周期     | 7/14 15:17 |

这样，你就结束了手动管理多个“版本”的史前时代，进入到版本控制的20世纪。

## 三、GIT诞生

很多人都知道，Linus在1991年创建了开源的Linux，从此，Linux系统不断发展，已经成为最大的服务器系统软件了。

Linus虽然创建了Linux，但Linux的壮大是靠全世界热心的志愿者参与的，这么多人在世界各地为Linux编写代码，那Linux的代码是如何管理的呢？

事实是，在2002年以前，世界各地的志愿者把源代码文件通过diff的方式发给Linus，然后由Linus本人通过手工方式合并代码！

你也许会想，为什么Linus不把Linux代码放到版本控制系统里呢？不是有CVS、SVN这些免费的版本控制系统吗？因为Linus坚定地反对CVS和SVN，这些集中式的版本控制系统不但速度慢，而且必须联网才能使用。有一些商用的版本控制系统，虽然比CVS、SVN好用，但那是付费的，和Linux的开源精神不符。

不过，到了2002年，Linux系统已经发展了十年了，代码库之大让Linus很难继续通过手工方式管理了，社区的弟兄们也对这种方式表达了强烈不满，于是Linus选择了一个商业的版本控制系统BitKeeper，BitKeeper的东家BitMover公司出于人道主义精神，授权Linux社区免费使用这个版本控制系统。

安定团结的大好局面在2005年就被打破了，原因是Linux社区牛人聚集，不免沾染了一些梁山好汉的江湖习气。开发Samba的Andrew试图破解BitKeeper的协议（这么干的其实也不只他一个），被BitMover公司发现了（监控工作做得不错！），于是BitMover公司怒了，要收回Linux社区的免费使用权。

Linus可以向BitMover公司道个歉，保证以后严格管教弟兄们，嗯，这是不可能的。实际情况是这样的：

Linus花了两周时间自己用C写了一个分布式版本控制系统，这就是Git！一个月之内，Linux系统的源码已经由Git管理了！牛是怎么定义的呢？大家可以体会一下。

Git迅速成为最流行的分布式版本控制系统，尤其是2008年，GitHub网站上线了，它为开源项目免费提供Git存储，无数开源项目开始迁移至GitHub，包括jQuery，PHP，Ruby等等。

历史就是这么偶然，如果不是当年BitMover公司威胁Linux社区，可能现在我们就没有免费而超级好用的Git了。

## 四、集中式与分布式

Linus一直痛恨的CVS及SVN都是集中式的版本控制系统，而Git是分布式版本控制系统，集中式和分布式版本控制系统有什么区别呢？

先说集中式版本控制系统，版本库是集中存放在中央服务器的，而干活的时候，用的都是自己的电脑，所以要先从中央服务器取得最新的版本，然后开始干活，干完活了，再把自己的活推送给中央服务器。中央服务器就好比是一个图书馆，你要改一本书，必须先从图书馆借出来，然后回到家自己改，改完了，再放回图书馆。

![central-repo](https://www.liaoxuefeng.com/files/attachments/918921540355872/l)

集中式版本控制系统最大的毛病就是必须联网才能工作，如果在局域网内还好，带宽够大，速度够快，可如果在互联网上，遇到网速慢的话，可能提交一个10M的文件就需要5分钟，这还不得把人给憋死啊。

那分布式版本控制系统与集中式版本控制系统有何不同呢？首先，分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了，因为版本库就在你自己的电脑上。既然每个人电脑上都有一个完整的版本库，那多个人如何协作呢？比方说你在自己电脑上改了文件A，你的同事也在他的电脑上改了文件A，这时，你们俩之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。

和集中式版本控制系统相比，分布式版本控制系统的安全性要高很多，因为每个人电脑里都有完整的版本库，某一个人的电脑坏掉了不要紧，随便从其他人那里复制一个就可以了。而集中式版本控制系统的中央服务器要是出了问题，所有人都没法干活了。

在实际使用分布式版本控制系统的时候，其实很少在两人之间的电脑上推送版本库的修改，因为可能你们俩不在一个局域网内，两台电脑互相访问不了，也可能今天你的同事病了，他的电脑压根没有开机。因此，分布式版本控制系统通常也有一台充当“中央服务器”的电脑，但这个服务器的作用仅仅是用来方便“交换”大家的修改，没有它大家也一样干活，只是交换修改不方便而已。

![distributed-repo](https://www.liaoxuefeng.com/files/attachments/918921562236160/l)

当然，Git的优势不单是不必联网这么简单，后面我们还会看到Git极其强大的分支管理，把SVN等远远抛在了后面。

CVS作为最早的开源而且免费的集中式版本控制系统，直到现在还有不少人在用。由于CVS自身设计的问题，会造成提交文件不完整，版本库莫名其妙损坏的情况。同样是开源而且免费的SVN修正了CVS的一些稳定性问题，是目前用得最多的集中式版本库控制系统。

除了免费的外，还有收费的集中式版本控制系统，比如IBM的ClearCase（以前是Rational公司的，被IBM收购了），特点是安装比Windows还大，运行比蜗牛还慢，能用ClearCase的一般是世界500强，他们有个共同的特点是财大气粗，或者人傻钱多。

微软自己也有一个集中式版本控制系统叫VSS，集成在Visual Studio中。由于其反人类的设计，连微软自己都不好意思用了。

分布式版本控制系统除了Git以及促使Git诞生的BitKeeper外，还有类似Git的Mercurial和Bazaar等。这些分布式版本控制系统各有特点，但最快、最简单也最流行的依然是Git！



## 五、下载并且安装GIT

https://blog.csdn.net/Cool_foolisher/article/details/129634537



## 六、如何使用Git进行版本控制

### 6.1 在项目中或者工作区创建本地仓库

```cmd
git init  // 在本地创建git仓库
```



### 6.2 将工作区的内容提交到暂存区

- 提交单个文件

```cmd
git add 文件名
```

- 提交所有文件

```cmd
git add . 
```



### 6.3 将暂存区的内容提交到本地仓库

```
git commit -m "本次提交的描述"
```



## 七、Git其他命令

### 7.1 查看仓库的状态

```cmd
git status
```



### 7.2 查看仓库提交的历史记录

```
git log
```

- w 向上翻页
- s向下翻页
- q退出



## 八、liunx命令

- cd  文件名称		// 进入指定的文件夹
- cd ..                      // 返回上一级
- cd ../../                 // 返回上两级
- ls                          //  查看当前目录的文件列表  (不包含隐藏的文件)
- ls -a                     //  查看当前目录的文件列表(显示隐藏的文件) 
- cat                      // 查看文件内容
- mkdir                 // 创建文件夹
- rm -rf                 // 删除文件夹或者删除文件



## 九、VIM编辑器的使用

- vim 文件名   // 使用vim编辑器打开文件
- i                     // 进入vim编辑器的输入模式
- esc  :wq       // 保存并退出



## 十、Git基本操作命令

### 10.1 使用git初始化本地仓库

- 命令

  ```
  git init
  ```

- 效果

  ![image-20230404092627400](/Users/yangling/Library/Application Support/typora-user-images/image-20230404092627400.png)



### 10.2 查看仓库的状态

- 命令

  ```
  git status
  ```



### 10.3 将工作区的代码提交到暂存区

- 命令

  ```
  git add 文件名
  ```

  ```
  git add .
  ```

- 效果

  ![image-20230404093041103](/Users/yangling/Library/Application Support/typora-user-images/image-20230404093041103.png)



### 10.4 将暂存区的内容提交到本地仓库

- 命令

  ```
  git commit -m "提交的描述"
  ```

- 效果

  ![image-20230404093449276](/Users/yangling/Library/Application Support/typora-user-images/image-20230404093449276.png)



### 10.5 第一次安装git,需要设置签名信息

- 命令 

  ```
  // 设置用户名
  git config --global user.name "用户名"
  // 设置邮箱
  git config --global user.email "邮箱"
  ```

- 查看用户名和邮箱是否设置成功

  ```
  // 进入根目录
  cd ~
  
  // 使用cat 查看.gitconfig文件的内容
  cat .gitconfig
  ```

  

### 10.6 将暂存区的内容撤销到工作区

- 命令

  ```
  git rm --cached 文件名
  ```

- 效果

  ![image-20230404094826734](/Users/yangling/Library/Application Support/typora-user-images/image-20230404094826734.png)



### 10.7 将暂存区的内容提交到本地仓库

- 命令

  ```
  // 将所有暂存区的文件提交到本地仓库
  git commit -m "描述的信息"
  
  // 将指定的暂存区文件提交到本地仓库
  git commit -m "描述信息" 文件名
  ```

  



### 10.8 查看提交的历史记录

- 命令

  ```
  // 查看完整的提交历史记录
  git log 
  
  // 以漂亮的格式显示：即每条⽇志只显示⼀⾏
  git log --pretty=oneline
  
  // 简约的格式显示
  git log --oneline
  ```

  

## 十一、版本的前进与后退

### 11.1 显示回滚版本步数

- 命令

  ```
  git reflog
  ```

- 效果

  ![image-20230404102008416](/Users/yangling/Library/Application Support/typora-user-images/image-20230404102008416.png)

### 11.2 版本前进与后退

- 命令

  ```
  // 不仅可以后退,还可以前进
  git reset --hard 哈希值
  
  // 使⽤ ^ (异或)符号：只能后退
  git reset --hard HEAD^
  
  // 使⽤ ~ 符号：只能后退
  git reset --hard HEAD~n
  ```

  ![image-20230404102647226](/Users/yangling/Library/Application Support/typora-user-images/image-20230404102647226.png)

### 11.3  删除⽂件并恢复

![image-20230404102948197](/Users/yangling/Library/Application Support/typora-user-images/image-20230404102948197.png)



### 11.4 对⽐⽂件差异

<img src="/Users/yangling/Library/Application Support/typora-user-images/image-20230404103428561.png" alt="image-20230404103428561" style="zoom:25%;" />

![image-20230404103441185](/Users/yangling/Library/Application Support/typora-user-images/image-20230404103441185.png)



## 十二、Github

### 12.1 什么是Github?

Github其实就是一个IT技术人员的网站,主要作用就是用来托管我们的网站或者代码项目.



### 12.2 Github官网地址

GitHub.com



### 12.3 使用Github的好处?

- Github上由很多大牛,比如国内的像百度,腾讯,阿里这些大公司,里面的跟多工程师在Github上面都有账号,也就是说他们都有个人主页,有空的话大家可以逛一逛,关注一下,说不定还能搞个内推什么的.
- Github上面可以接触到最新的,最前沿的技术,因为我们知道任何的软件或者产品在上线之前都有开发和测试的过程,Github上你可以接触到这些软件的初始状态,中间状态,以及发布状态,你可以第一时间两届到产品的动向,而且你可以通过Github上面每年发布的统计数据,你可以知道那些技术是最火的,保证捏能跟上这些技术,而不是学了一堆小众过了时的技术,这个问题相信也是我们每个搞IT的人特别关注的.
- GitHub 是基于 Git 版本控制工具的，任何一个软件从无到有的全部过程，或者说软件从无到有的每个版本，它是怎么发展过来的，全都一览无遗。从这里面我们可以学到开发的技术，包括编程语言、单元测试、设计思想、编码规范、项目的协调组织以及流程，等等。而且因为 GitHub 是版本控制，可以很好的管理程序代码或者文档的每个历史状态，相当于我们每天刷的微博或者微信朋友圈。这些社交媒体工具可以记录我们的生活点滴，而 GitHub 可以记录我们的技术发展，如果你是一个刚上大一的新生，如果能把学习的每门课程，从 C 语言、数据结构开始，把每门课程的练习代码放到 GitHub 上，四年下来也是一个很好的积累
- GitHub 是开源的，开源就意味着所有项目的代码和文档，甚至中间过程对我们都是开放的。我们从这些项目中可以找一些感兴趣的项目参与其中，可以利用这些项目来提升我们的技术，积累我们的项目经验。很多大学生毕业的时候，因为没有项目经验而被企业拒之门外，试想一下，如果能够在大学期间，从大一就开始接触了了解 Github，在大学毕业的时候在 GitHub 上已经有一些参与项目的经验，那会对我们的未来有多大的帮助啊。如果你想做程序员，你可以在开源项目中贡献代码，如果你想做测试工程师，你可以在开源项目中提 bug 缺陷。而且，GitHub 上确实有很多猎头在关注着你，有很多靠谱的工作机会等待着你，前提是你需要在 GitHub 上安家，然后把你对 IT 技术的学习过程用 GitHub 管理起来。利用 GitHub 在个人职业发展上，走向成功的案例举不胜举.
- GitHub 不仅托管的项目不仅可以是软件包或者程序代码，也可以是文档教程。所以，我对 GitHub 的资料，分两个大类，一个程序代码，二是自然语言代码。程序代码很好理解，大家都多少接触过编程，了解一门或多门编程语言。自然语言代码，其实就是自然语言编写的文档资料。即使我们因为程序语言掌握的不好，不太能一上来参与到开源项目中去贡献代码。但是，很多技术大牛在 GitHub 上做了很多非常棒的入门教程，帮助初学者。像我就用 GitHub 做课程开发，大家可以在我的 GitHub courses 仓库中，找到很多课程的资料页面。有的人在 GitHub 上写书，我这里搜藏了两个大牛写的 python 书，都可以完全免费的在线阅读。还有阮一峰老师写的 JavaScript 书，等等。所以 GitHub 是一个非常丰富的学习资料仓库。大家如果不接触 GitHub，没有掌握 GitHub 这个强大的工具，这些优质的学习资料，就跟大家失之交臂了，这是非常可惜的一件事情。





## 十三、将本地的项目推送到远程仓库

### 13.1 推送过程中存在的问题

1. 需要将本地仓库和远程仓库建立连接
2. 配置ssh



### 13.2 流程

1. 在本地创建一个文件夹或者在本地创建项目

2. 在创建的文件夹或者项目中初始化git仓库

   `git init`

3. 将工作区的内容提交到暂存区

   `git add .`

4. 将暂存区的内容提交到本地仓库

   `git commit -m "描述的信息"`

5. (如果是第一次推送) 需要在github上面创建远程仓库

6. (如果是第一次推送) 将本地仓库和远程仓库建立连接

   - 查看本地仓库是否与远程仓库建立关联	`git remote -v`
   - 将本地仓库与远程仓库建立连接 `git remote add 远程仓库地址别名(默认一般写origin) 远程仓库地址 `

7. (如果是第一次推送, 需要配置ssh) 将本地仓库的代码推送到远程

   - 配置ssh
     - `cd ~ ` // 进入根目录
     - `ls -a` // 查看根目录是否有.ssh文件夹, 如果有则表示已经配置过ssh了
     - `rm -rf .ssh`  // 删除之前配置的ssh
     - `ssh -keygen -t rsa -C  "注册的github邮箱" ` //生成ssh
     - 一路回车键就可以了
     - `cd .ssh` // 进入.ssh文件夹
     - `ls -a `// 查看有没有生成公钥(id_rsa.pub)和密钥 (id_rsa)
     - `cat id_rsa.pub` // 查看公钥
     - 复制公钥
     - 回到github, 进入到setting页面
     - 找到SSH
     - 点击new ssh 按钮, 输入标题, 将复制的公钥粘贴进入就可以了
   - 将本地的代码推送到远程仓库 `git push 远程仓库地址别名(origin) 要推送的分支名(main)`



## 十四、将远程仓库的代码克隆到本地

### 14.1 克隆的命令

- 默认克隆

```
git clone 远程仓库地址
```

- 克隆指定分支的代码

```
git clone -b 分支名 远程仓库地址
```



## 十五、分支操作

### 15.1 查看分支

```
git branch -v
```

### 15.2 创建分支

```
git branch 分支名
```

### 15.3 切换分支

```
git checout 分支名
```

### 15.4 删除分支

```
git branch -d 分支名
```

### 15.5 合并分支

```
git merge 分支名
```





## 十六、标签操作

### 16.1 查看所有标签

```
git tag
```



### 16.2 创建标签

```
git tab -a "标签名"
```



### 16.3 将本地的所有标签推送到远程

```
git push origin "标签名"
```



### 16.4 删除标签

```
// 删除本地的标签
git tag -d "标签名"

// 删除远程的标签
git push irigin :refs/tags/标签名
```



## 十七、多人协同开发

### 17.1 团队内部协作开发

![image-20230406093722743](/Users/yangling/Library/Application Support/typora-user-images/image-20230406093722743.png)





#### 17.1.1 组长

1. 先创建本地仓库

   ```
   git init
   ```

2. 创建项目

3. 将创建的项目提交到暂存区

   ```
   git add .
   ```

4. 将暂存区的内容提交到本地仓库

   ```
   git commit -m ""
   ```

5. 将本地仓库和远程仓库建立连接

   ```
   git remote add 远程仓库地址别名 远程仓库地址
   ```

6. 将本地仓库的代码推送到远程仓库

   ```
   git push origin 分支名
   ```

   



#### 17.1.2 组员1

1. 拿到组长给的远程仓库地址, 使用git clone 进行克隆

   ```
   git clone 远程仓库地址
   ```

2. 将项目克隆到本地之后,创建dev分支

   ```
   git branch dev
   ```

3. 切换到dev分支

   ```
   git checkout dev
   ```

4. 进行开发

5. 开发完一个小功能之后将工作区的代码提交到暂存区

   ```
   git add .
   ```

6. 将暂存区的代码提交到本地仓库

   ```
   git commit -m ""
   ```

7. 请求组长开通权限

8. 开通完成之后使用 git push origin 推送的分支名(dev) , 将本地仓库的代码推送到远程仓库

   ```
   git push origin dev
   ```

   

#### 17.1.3 组员2

**拿到远程dev分支的代码进行开发**

- (第一种)直接拉dev分支的代码

  ```
  // 直接将远程仓库的dev分支代码拉取到本地的dev分支中
  git clone -b dev 远程仓库地址
  ```

- (第二种)直接克隆

  ```
  // 这个直接拉取的是主分支(main/master)的代码
  git clone 远程仓库地址
  
  // 创建dev分支
  git branch dev
  
  // 切换到dev分支
  git checkout dev
  
  // 将远程仓库dev分支的最新代码拉取到本地的dev分支上
  git pull origin dev
  
  ```

**进行开发**

**将工作区的代码提交到暂存区**

```
git add .
```

**将暂存区的代码提交到本地仓库**

```
git commit -m ""
```

**将本地仓库的代码提交到远程仓库**

```
git push origin dev
```





#### 17.1.4 解决冲突

**什么情况有冲突 ？**

在企业中团队协作开发时，当多个人同时修改同一个文件，同一行代码时，就会产生冲突 。

只有先推送的那个人才可以正常推送，后面那个人与它出现冲突的代码，是没有办法推送的，

必须先拉取下来，然后自已手动解决冲突后才可进行推送. 

**如何解决冲突**

上面有冲突时，需要先 git pull 拉取远程代码，然后 使用开发工具查看修改文件，再手动解决冲突，保留需

要的内容, 然后在重新将本地仓库的代码推送到远程仓库





#### 17.1.5 实际开发时需要特别注意的

每次代码推送到远程仓库之前,先git pull 将远程仓库最新的代码更新到本地, 如果本地仓库的代码不是最新的代码,则无法推送到远程仓库





#### 17.1. 6 组长

**前言: 组员已经开发好了对应的功能,这个时候组长需要将开发好的功能合并到主分支**

1. 创建dev分支

   ```
   git branch dev
   ```

2. 切换到dev分支

   ```
   git checkout dev
   ```

3. 使用git pull将最新的代码更新到本地

   ```
   git pull origin dev
   ```

4. 切换到主分支(main/master)

   ```
   git checkout master
   ```

5. 将dev分支的代码合并到主分支

   ```
   git merge dev
   ```

   



### 17.2 远程跨团队协作开发

![image-20230406145841707](./assets/image-20230406145841707.png)



## 十八、使用GUI工具进行版本控制

### 18.1 常用的GUI工具都有哪些

- sourceTree
- TortoiseGit
- webstorm
- Vscode
- .....
