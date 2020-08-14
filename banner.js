
//如果不想要哪部分功能就自己取消掉
(function(){
    //公共 原型的继承
    function extend(CLASS){
        function F(){};
        F.prototype=CLASS.prototype;
        return new F();
    };
    //公共 Tab 抽象成对象
    function Tab(tabDOM,contentDOM){
        //公有属性
        this.tabDOM =tabDOM;//点击的标题切换图片
        this.contentDOM=contentDOM;//图片切换
        this.len=tabDOM.length;//总长度

        this.index=0;//记录当前显示的是哪一张
        this.tabClick();//点击标题立即执行
    };
    Tab.prototype.tabClick=function(){
        var  This=this;//大的This是指Tab.prototype
        this.tabDOM.forEach(function(ele,index){
            ele.onclick=function(){
                This.change(index);
            };
        });
    };
    Tab.prototype.change=function(index) {
        this.tabDOM[this.index].classList.remove("active");
        this.contentDOM[this.index].classList.remove("active");
        this.index=index;
        this.tabDOM[this.index].classList.add("active");
        this.contentDOM[this.index].classList.add("active");
      };

    //TabArrow 继承Tab新增左右按钮的类
    function TabArrow(tabDOM,contentDOM,arrowDOM){
        Tab.call(this,tabDOM,contentDOM),
        this.arrowDOM=arrowDOM;
        this.arrowClick();
    }
    //
    TabArrow.prototype=extend(Tab);
    TabArrow.prototype.arrowClick=function(){
        var This=this;
        this.arrowDOM.forEach(function(ele,i){
            ele.onclick=function(){
                var index;
                if(i){
                    index=This.index+1;
                    if(index>=This.len)index=0;
                }else{
                    index=This.index-1;
                    if(index<0)index=This.len-1;
                }
                This.change(index);
            };
        });
    };
    //TabArrowAuto 继承TabArrow新增自动轮播
    function TabArrowAuto(tabDOM,contentDOM,arrowDOM,tab){
        TabArrow.call(this,tabDOM,contentDOM,arrowDOM);
        this.tab=tab;
        this.auto();
    }
    TabArrowAuto.prototype=extend(TabArrow);
    TabArrowAuto.prototype.auto=function(){
        var This=this;
        var timer;
        function auto(){
            timer = setInterval(function(){
                var index=This.index+1;
                if(index>=This.len)index=0;
                This.change(index);
            },2000)
        }
        auto();
        this.tab.onmouseenter=function(){
            clearInterval(timer);
        };
        this.tab.onmouseleave = function(){
            auto();
        }
    }
    //tab 实例1
    new Tab(
        document.querySelectorAll("#tab .tab li"),
        document.querySelectorAll("#tab .content li")
    );
    //Tab 实例2
    new Tab(
        document.querySelectorAll("#tab2 .tab li")
        ,document.querySelectorAll("#tab2 .img li")
    );

    //TabArrow 实例3
    new TabArrow(
        document.querySelectorAll("#tab3 .tab li")
        ,document.querySelectorAll("#tab3 .img li")
        ,document.querySelectorAll("#tab3 .arrow li")
    );

    // TabArrowAuto 实例4
    new TabArrowAuto(
        document.querySelectorAll("#tab4 .tab li")
        ,document.querySelectorAll("#tab4 .img li")
        ,document.querySelectorAll("#tab4 .arrow li")
        ,document.querySelector("#tab4")
    );

    //TabArrowAuto 实例5
    new TabArrowAuto(
        document.querySelectorAll("#banner .tab li")
        ,document.querySelectorAll("#banner .img li")
        ,document.querySelectorAll("#banner .arrow div")
        ,document.querySelector("#banner")
    );

    /*只能点击下标按钮改变图片 */
    /*(function(){
        //抽象成面向对象
        function Tab(tabDOM,contentDOM){
            this.tabDOM=tabDOM;
            this.contentDOM=contentDOM;
            this.len=tabDOM.length;
            this.tabClick();
        }
        Tab.prototype.tabClick=function(){
            var  This=this;
            this.tabDOM.forEach(function(ele,index){
                ele.onclick=function(){
                    for(var i=0;i<This.len;i++){
                        var op = i === index?"add":"remove";
                        This.tabDOM[i].classList[op]("active");
                        This.contentDOM[i].classList[op]("active");
                    }
                };
            });
        };
        //实例
        new Tab(
            document.querySelectorAll("#tab .tab li"),
            document.querySelectorAll("#tab .content li")
        );
    })();*/
})();