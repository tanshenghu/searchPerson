## `searchPerson` By TanShenghu

<br>

**searchPerson组件是一个搜人选人组件，类似于邮箱搜索发件人**

[demo](http://www.tanshenghu.com/widget/searchPerson/examples/searchPerson.html)

```javascript
seajs.use(['searchPerson'], function(SearchPerson) {
    
    // 接口
    var oselect= new SearchPerson({
        trigger: 'div',
        type: 'get',
        params: {},
        alone: false,
        remove: true,
        field:{
            kw: 'keyworld',
            name: 'name',
            value: 'key'
        },
        renderList: function( o, data ){
            // this => dropbox
        },
        change: function(){
            //  this => 下拉框中的选项A标签
        }
    });
    // 非接口
    var oselect= new SearchPerson({
        trigger: 'div',
        alone: false,
        remove: true,
        field:{
            name: ''
        },
        change: function( val ){
            // this => 当前的trigger div
        }
    });
    
})
```

### 完
The End