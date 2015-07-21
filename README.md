##javascript設計模式

<br>

* 模式可以幫助我們使用前人已經驗證過的優良實踐方式(O)
* 模式經過長期的驗證和改良，在領域裡面具有重要的地位，提供了一定程度的抽象化概念。
* 增強了彼此之間的溝通(工廠模式：這個就是先將類別統一放到某個固定類別裡面生產)你會更希望聽到工廠
  模式。

===

雖然javascript是屬於弱型別的程式語言，但用JS實作還是能夠解決某些問題。

* 設計模式
* 編碼模式
* 反模式

首先，要有一個小概念，JS沒有`class`。js只處理物件。 所以你不需要定義class，你只要new出來物件就
可以了。
<br>
再來，js裡並沒有繼承，而是用原型操作來實現繼承的功能。`prototype原型`是一個物件，而且每個函式都
具有`prototype`屬性。

===

###javascript撰寫規範###

<br>
* 減少使用全域變數：
  任何沒有宣告var的變數都會自動變成全域變數，為了預防此情形發生，應該隨時用var宣告變數。如果同時
  出現兩個相同的變數，則會直接採用後來宣告的。因此應該使用命名空間模式(namespacing pattern)、
  立即執行函式(immediate function)。

* 單一var模式：
  ```javascript
    var a = 1,
        b = 2,
        sum = 123,
        i,
  ```
  儘量也在變數宣告時就給予初始值，以免邏輯上的錯誤發生。

* 所有變數應該在開頭全部宣告。

* 迭代的方式
  ```javascript
    for(var i = 0; i < a.length; i++){  //不太好，因為每次的回圈都要存取陣列長度
      //do something
    }

    for(var i = 0,length = a.length; i < length; i++){
      //do something
    }

  ```

* 儘量不要擴充內建型別的原型，除非你很清楚你在做什麼，且和團隊溝通、文件化(太自由的缺點？)

* switch模式：
  ```javascript
    var inspect_me = 0,
        result = '';
    switch (inspect_me) {
      case 0:
        result = "zero";
        break;
      case 1:
        result = "one";
      default:
        result = "unknown";

    }
  ```

* 避免使用eval()跟隱含的型別轉換(使用 `===` 和 `!==`)

* 使用`parseInt`來轉型
* 建構式首字大寫

* `private` 和 `protected` 分別使用"__ 和 _ "

* 撰寫註解、拋棄第1份實作。因為第一個永遠還有很多思考尚未完整的地方。

* 自訂建構式函式
  ```javascript
    var a = new Object(); //bad!
    var s = new String("lalala") //very bad

    var kalan = new Person(); //good
    kalan.say();

    var Person = function(name){ //good
      this.name = name;
      this.say = function(){ //not really good
        return "I'm" + this.name;
      }

    }
    Person.prototype.say = function(){ //直接套用原型加入方法比較好！
      return "I'm GOOD" + this.name;
    }
  ```
* 命名慣例`that`
  ```javascript
    function Waffle(){
      var that = {};
      that.tastes = "yummy";
      return that;
    }
  ```
* 自我呼叫的建構式：
  ```javascript
    function Waffle(){
      if(!(this instanceof Waffle)){
        return new Waffle();
      }

      this.taste = "yummy";
    }
    Waffle.prototype.wantAnother = true;
  ```

* 陣列宣告：
  ```javascript
  var a = new Array(3); //bad
  var a = []; //good
  ```
* 宣告正規表達式：
  ```javascript
  var reg = new RegExp();
  ```

* 一些範例：
  ```javascript
  //bad!
    var o = new Object(); //bad
    var a = new Array(); //bad
    var re = new RegExp(); //bad
    var s = new String(); //bad
    var n = new Number(); //bad
    //good!
    var o = {}; //good
    var a = [];
    var re = /[a-z]/g;
    var s = "";
    var n = 0;
  ```

###關於函式：

javascript的精髓就是function的使用。關於函式宣告和函式表達。優良的函式可以更容易撰寫API文件、
讓程式碼看起來更簡潔有力。
<br>
乍看之下你的物件裡面有可能會有很多function，這是剛開始很多人會不習慣的地方，但是用久了之後就會發
現他的強大之處和彈性。一般來說，看到function應該聯想到物件，只是他可以被呼叫！這樣的概念比較清楚。

```javascript
  var add = new Function('a,b','return a + b');
  add(1,2);

  var add = function add(){ //具名函式表示式
    return a + b;
  }
  var add = function(){ //匿名函式

  }

  function gotoDie(){ //函式宣告式

  }
```

* 回呼模式(call back)
  函式是個物件，代表他可以當作引數傳遞。
  ```javascript
  var findNodes = function(callback){
    var i = 150,
        nodes = [],
        found;
    if(typeof callback !== "function"){
      callback = false;
    }

    while(i){
      i -= 1;
      //do something

      if(callback){
        callback(found);
      }
      nodes.push(found);
    }
    return nodes;
  };
  ```


* 非同步事件監聽器：
  回呼模式有許多日常用途，完成某件事情之後，再開始作某件事。

* 設定值物件：
  當函式需要建立大量的DOM元素，或是設定CSS屬性，這個方法就相當的實用。你不需要知道順序，可以選用
  你想要的元素來實作！
  ```javascript
  function addPerson(name,job,gender,address){
    //參數太長，不方便設定
  }

  var conf = {
    username: "kalan",
    first: "Bruce",
    last: "Wayne"
  };
  addPerson(conf);
  ```




##物件建立模式

在javascript建立物件相當容易，但因為太容易了，所以往往缺非其他語言的特色，如命名空間、模組、套件
、屬性和靜態成員方法。所以後來又有一些人研究出了javascript的設計方法給他們使用。

* 命名空間模式：
  你不應該增加全域變數或物件的使用。為了確保你的程式在不同的地方都能發揮作用，應該將程式碼統一包裝
  在一個全域物件當中，物件的名字可以為函式庫名稱、公司名稱等等。
  ```javascript
  //bad
  function Parent(){};
  function Child(){};

  //good
  var MYAPP = {}; //not really good
  if(typeof MYAPP === "undefined"){
    var MYAPP = {};
  }

  MYAPP.Parent = function(){};
  MYAPP.Child = function(){};
  MYAPP.moudles.moudle1 = {};

  // very good
  var MYAPP = MYAPP || {};
  MYAPP.namespace = function(ns_string){
    var parts = ns_string.split('.'),
        parent = MYAPP,
        i;

        if(parts[0] === "MYAPP"){
          parts = parts.slice(1);
        }

        for(i = 0; i < parts.length; i+=1){
          if(typeof parent[[parts[i]] === "undefined"){
            parent = parent[parts[i]];
          }

        }
        return parent;

  }


  ```

* private屬性與方法：使用閉包(定義在建構式當中)

  ```javascript
  function Myfunction(){
    var name = "kalan";
    this.getName = function(){
      return name;
    }
  }

  var kalan = new Myfunction();
  ```
* 只提供必要的方法和資訊給使用者，以免資料被竄改。如果真的要回傳整個物件，使用複製函式。

* prototype與隱私權：使用建構式產生的private屬性有幾個缺點，就是每次產生新物件時，都會再次建立
  同樣的方法與變數，浪費不必要的空間。搭配prototype，可以將靜態方法與變數放在建構式裡面，然後使
  用prototype為物件建立public方法。

* 模組模式：
  1. 建立命名空間
  2. 定義模組。使用立即函式，提供private作用域，以及public介面給客戶使用。
  3. 新增方法到介面上。

  ```javascript
    MYAPP.namespace('MYAPP.utilities.array');

    MYAPP.utilities.array = (function(){
      //宣告相依性
      var uobj = MYAPP.utilities.object,
          ulang = MYAPP.utilities.lang,

          array_string = "[Object Array]",
          ops = Object.prototype.toString;

          //private方法

          //初始化
      //public API
      return {
        inArray :function(needle, hackStack){
          //DO SOME
        },

        isArray: function(){},
        //更多方法與屬性

      };

    }());
  ```

* 物件常數：
  ```javascript
    var Widget = function(){};

    Widget.MAX_WIDTH = 480;
    Widget.MAX_HEIGHT = 320;

    //常數常用函式實作

    var constant = (function(){
      var constants = {},
          ownProp = Object.prototype.hasOwnProperty,
          allowed = {
            string : 1,
            number : 1,
            boolean: 1
          },
          prefix = (MATH.random() + "_").slice(2);
      return {
        set : function(name, value){
          if(this.isDefined(name)){
            return false;
          }
          if(!ownProp.call(allowed,typeof value)){
            return false;
          }
          constants[prefix + name] = value;
          return true;
        },
        isDefined: function(name){
          return ownProp.call(constants, prefix + name);

        },
        get: function(name){
          if(this.isDefined(name)){
            return constants[prefix + name];
          }
          return null
        }
      };
    }());
  ```

###程式碼重用模式：繼承！
===

* 原型繼承，利用`prototype`的方式做繼承
  ```javascript
  function Person(){
    this.name = "Adam";
  }

  //在原型中新增屬性
  Person.prototype.getName = function(){
    return this.name;
  }

  var papa = new Person();
  var child = Object.create();
  //也可直接增加屬性
  var child = Object.create(parent,{age:{value : 2}});

  //用複製屬性實作繼承
  function extend(parent,child){
    var i;
    child = child || {};
    for(i in parent){
      if(parent.hasOwnProperty(i)){
        child[i] = parent[i];
      }
    }
  }

  function extendDeep(parent, child){
    var i,
        toStr = Object.prototype.toString;
        astr  = "[object Array]";

        child = child || {};
        for(i in parent){
          if(typeof parent[i] === "object"){
            child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
            extendDeep(parent[i],child[i]);
          }else{
            child[i] = parent[i];
          }
        }
        return child;
  }
  ```
* 借用方法：有時候因為我們只需要用到父類別的某個方法，或者只實作某些方法，這時候可以用「借」的，這
  樣就不用大費周張繼承一大堆不必要的方法。

  ```javascript
  var one = {
    name : "object",
    say  : function(greet){
      return greet + "," + this.name;
    };
  }
  one.say("hi"); //hi,object

  //現在有個two沒有say()方法，可以從one上面調用
  var two = {
    name : "another object"
  };
  one.say.apply(two,['hello']);


  ```

* 建構實體：

  ```javascript
  //閉包的實體
  function Universe(){
    var instance = this;

    this.start_time = 0;
    this.bang = "big";

    Universe = function(){ //重新定義建構式
      return instance;
    }
  }
  ```

* 工廠模式(factory):
  ```javascript
    function CarMaker(){};
    CarMaker.prototype.drive = function(){
      return "I have " + this.door + "doors";
    }

    CarMaker.factory = function(type){ //靜態方法
      var conStr = type,
          newCar;

      if(typeof CarMaker[conStr] !== "function"){
        throw{
          name : "error",
          message : conStr + "doesn't exist"
        };
      }

      if(typeof CarMaker[conStr].prototype.drive !== "function"){
        CarMaker[conStr].prototype = new CarMaker(); //繼承
      }
      newcar = new CarMaker[conStr]();
      return newcar;
    };

    CarMaker.Compact = function(){
      this.doors = 4;
    }
    CarMaker.Convertible = function(){
      this.doors = 2;
    }
    CarMaker.SUV = function(){
      this.doors = 24;
    }
  ```
  將可重複使用的程式碼抽取成為方法！

* 迭代器模式實作：
  next()
  ```javascript

  function Iterator(data){
    var index = 0,
        length = data.length;
    return {
      next: function(){
        var element;
        if(!this.hasNext()){
          return null;
        }
        element = data[index];
        index += 1;
        return element;
      },
      hasNext: function(){
        return index < length;
      }
    }
  }
  var iterator = (function(){
    var index = 0,
        data = [1,2,3,4,5],
        length = data.length;
    return {
      next : function(){
        var element;
        if(!this.hasNext()){
          return null;
        }
        element = data[index];
        index = index + 2;
        return element;
      },
      hasNext : function(){
        return index < length;
      }

    }

  }());

  ```

* 策略模式(Strategy)
  在執行時期選擇演算法(？)。例如使用驗證器來驗證資料是否符合規定。

  ```javascript
    var data = {
      first_name : "Super",
      last_name  : "Man",
      age        : "unknown",
      username   : "kalan"
    };

    validator.config = {
      first_name : 'isNonEmpty',
      age        : 'isNumber',
      username   : 'isAlphaNum'
    };

    //驗證資料
    validator.validate(data);
    if(validator.hasErrors()){
      console.log(validator.message.join("\n"));

    }

    //驗證模式
    validator.types.isNonEmpty = {
      validate: function(value){
        return value !== "";
      },
      instruction : "the value cannot be empty";
    };

    validator.types.isNumber = {
      validate: function(value){
        return !isNaN(value);
      },
      instruction : "the value can only be a valid number";
    };

    validator.types.isAlphaNum = {
      validate: function(value){
        return !/[^a-z0-9]/i.test(value);
      },
      instruction : "the value can only be number or characters";
    }

    var validator = {
      //屬性
      types:{},
      message: [],
      config : {},

      //介面的方法
      validate: function(data){
        var i,
            msg,
            type,
            checker,
            result_ok;
        this.messages = [];
        for(i in data){
          if(data.hasOwnProperty(i)){
            type = this.config[i];
            checker = this.type[type];

            if(!type){
              continue;
            }
            if(!ichecker){
              throw{
                name: "ValidationErroe",
                message: "No handler to validate type" + type
              };
            }
            if(!result_ok){
              msg = "Invalid value for *" + i + "*," + check.instruction;
              this.messages.push(msg);
            }
          }
        }
        return this.hasErrors();
      },
      hasErrors: function(){
        return this.messages.length !== 0;
      }
    }


  ```

* 外觀模式：
  舉例來說，處理瀏覽器事件時，你有以下方法：
  stopPropagation() preventDefault()

  他們是兩個單獨的方法，有種不同的目的，也應該保持獨立。但程式中卻又常常兩個方法一起呼叫，這個時候
  就可以設定一個函式，專門用來呼叫這兩種方法。

  ```javascript
    var myEvent = {
      stop: function(e){
        if(typeof e.preventDefault === "function"){
          e.preventDefault();
        }
        if(typeof e.stopPropagation === "function"){
          e.stopPropagation();
        }

      }
    }
  ```
* 代理器模式(Proxy)
  將實際工作代理到自己的物件上面。用來保護對於物件的存取。
  一個應用的實例是延遲初始。倘若一個對象的初始化非常昂貴，而客戶對他初始化，卻並未真正使用他，就可
  以使用代理器，先告訴客戶說：「我全部都做好囉！」，直到客戶真正使用他時，在傳入物件。例如：網頁中，
  最珍貴的操作就是 **網路請求**。

  ```javascript
    //video 物件
    var videos = {
      getInfo:function(id){
        vat info = $('info' +id);
        if(!info){
          http.makeRequest([id],"videos.updatelist");
          return;
        }

        if(info.style.display === "none"){
          info.style.display = '';
        }
        else{
          info.style.display = 'none';
        }
      }
    };

    var http = {
      makeRequest: function(ids, callback){
        var url = 'http://query.yahooapis.com/v1/public/yql?q=',
            sql = 'select * from music.video.id where ids IN ("%ID%")',
            format = "format=json",
            handler = "callback=" + callback,
            script = document.createElement('script');

        sql = sql.replace('%ID%',ids.join('","'));
        sql = encodeURIComponent(sql);

        url += sql + '&' + format + '&' + handler;
        script.src = url;

        document.body.appendChild(script);
      }
    }

  //proxy 模式
  var proxy = {
    ids: [],
    delay: 50,
    timeout: null,
    callback: null,
    context : null,
    makeRequest:function(id,callback,context){
      this.ids.push(id);
      this.callback = callback;
      this.context = context;

      //timeout
      if(!this.timeout){
        this.timeout = setTimeout(function(){
          proxy.flush();
        },this.delay);
      }  
    },
    flush: function(){
      http.makeRequest(this.ids, "proxy.handler");
      this.timeout = null;
      this.ids = [];
      //清除timeout 和 ID
    }，
    handler: function(){
      var i,max;
      if(parseInt(data.query.count,10) === 1){
        proxy.callback.call(proxy.context, data.qery.results.Video);
        return;
      }

      for(i = 0, max = data.query.results.Video.length; i < max; i+=1){
        proxy.callback.call(proxy.context, data,query.results.Video[i]);
      }
    }
  }
  ```
* 中介者模式(Mediator):
  當程式龐大時，我們希望減少每個模組間的耦合性，此時可以利用中介者來完成。

  ```javascript
  function Player(name){
    this.points = 0;
    this.name = name;
  }
  Player.prototype.play = function(){
    this.points += 1;
    mediator.played();
  }

  var scoreboard = {
    element : document.getElementById('results'),
    update  : function(score){
      var i, msg = '';
      for(i in score){
        if(score.hasOwnProperty(i)){
          msg += '<p><strong>' + i + '</p><\/strong>';
          msg += score[i];
          msg +=
        }
      }
      this.innerHTML = msg;
    }
  }

  var mediator = {
    players: {},
    setup: function(){
      var players = this.players;
      players.home = new Player('home');
      players.guest = new Player('Guest');
    }

    played: function(){
      var players = this.players;
      score = {
        Home: players.home.points,
        Guest: players.guest.points
      };

      scoreboard.update(score);
    },

    keypress: function(e){
      e = e || window.event;
      if(e.which === 49){
        mediator.players.home.play();
        return;
      }
      if(e.which === 48){
        mediator.players.guest.play();
        return;
      }
    }
  };

  mediator.setup();
  window.onkeypress = mediator.keypress;

  setTimeout(function(){
    window.onkeypress = null;
    alert("Game Over");
  },30000)
  ```

###監聽事件、DOM操作###
這邊是js最大的精髓，卻也是最難操作的部份之一。

* 延遲載入實作
* 預先載入實作

```javascript
  //遠端操作 XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.onreadystatchange = handlerResponse;//提供回呼

  xhr.open("GET","page.html",true);
  xhr.send(); //非同步的意思是，瀏覽器不會停止下來等待回應，這絕對是更好的使用者體驗。非同步參數應該總是傳入ture


```
