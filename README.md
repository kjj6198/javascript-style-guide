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
