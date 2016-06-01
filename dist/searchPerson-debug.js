/**
* Desc: 人物搜索组件，主要区分为接口与非接口模式，不同模式下样式与参数各有些不同!
* Date: 2015年08月25日 09:00
* Creator: TanShenghu
* Email: tanshenghu@163.com
*/
define("widget/searchPerson/1.0.0/searchPerson-debug", [ "$-debug" ], function(require, exports, module) {
    var $ = require("$-debug"), selectPerson = function(options) {
        if (typeof options === "string") {
            options = {
                trigger: options
            };
        }
        options.trigger = $(options.trigger);
        options.type = options.type || "getJSON";
        options.params = typeof options.params !== "object" ? {} : options.params;
        this.options = options;
        this.curNode = null;
        this.init();
        return options.trigger;
    };
    selectPerson.prototype = {
        constructor: selectPerson,
        getPos: function(ele) {
            // 这个功能是计算组件下拉框位置的功能，暂时不提供，等以后有时间再去完善这个组件功能！
            return ele.offset().top + ele.outerHeight(true) + ele.find(".dropDown").outerHeight(true) > Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
        },
        eleInit: function() {
            this.options.trigger.each(function() {
                $(this).append('<div class="cinput"><input type="text"><var></var></div><div class="dropDown"></div>');
            });
            this.getData();
            // 删除
            this.options.remove === true && this.options.trigger.on("click", ".J-del", function() {
                $(this).parent().remove();
            });
        },
        createInput: function(o) {
            var ohtml = "";
            for (var i in o) {
                this.options.field.name;
                ohtml += '<input type="hidden" name="' + (i == "name" ? this.options.field.name || "name" : i == "value" ? this.options.field.value || "id" : i) + '" value="' + o[i] + '">';
            }
            return ohtml;
        },
        createChecked: function(d) {
            if (!d.name) {
                throw new TypeError('eg:{name:"zhangsan",value:"20"}');
            }
            var oparent = this.curNode.parent(), items = oparent.prevAll(), isInput = this.options.url;
            // 单选项
            if (this.options.alone === true && items.length) {
                return;
            }
            if (isInput && this.options.changeErr && items.filter('[data-id="' + d.value + '"]').length == 0) {
                this.curNode.parent().before('<div class="checked-items"' + (isInput ? ' data-id="' + d.value + '"' : "") + '><var title="' + d.name + '">' + d.name + '</var><i class="J-del" title="删除">&times;</i>' + this.createInput(d) + "</div>");
                this.curNode.val("").next().empty();
            } else if (!isInput && this.options.changeErr && items.find('input[value="' + d.name + '"]').length == 0) {
                this.curNode.parent().before('<div class="checked-items"' + (isInput ? ' data-id="' + d.value + '"' : "") + '><var title="' + d.name + '">' + d.name + '</var><i class="J-del" title="删除">&times;</i><input type="hidden" name="' + (this.options.field.name || "name") + '" value="' + d.name + '"></div>');
                this.curNode.val("").next().empty();
            } else {
                typeof this.options.changeErr == "function" && this.options.changeErr.call(this.curNode, d, isInput ? "Exist: id->" + d.value : "Exist: name->" + d.name);
            }
        },
        getData: function() {
            var This = this, tid, val = "", url = This.options.url, oval = {};
            this.options.trigger.find(".cinput :text").on("keyup", function(ev) {
                var $this = $(this), dropbox = $this.parent().next();
                This.curNode = $this;
                val = $this.val();
                $this.next().text(val);
                if (url) {
                    tid = tid || setTimeout(function() {
                        oval[This.options.field.kw || "keyword"] = $this.val();
                        This.options.params = $.extend(This.options.params, oval);
                        $[This.options.type](url, This.options.params, function(res) {
                            if (res.success === true || res.success === "true") {
                                var ohtml = typeof This.options.renderList === "function" ? This.options.renderList.call(dropbox, This.options.params, res) : "";
                                dropbox.html(ohtml);
                                ohtml && dropbox.show();
                            }
                        }, "JSON");
                        tid = clearTimeout(tid);
                    }, 300);
                } else {
                    if (ev.keyCode == 13 || ev.which == 13 || ev.charCode == 13 || /;/g.test(val)) {
                        var items = val.split(/;/);
                        for (var i = 0, l = items.length; i < l; i++) {
                            items[i] && This.createChecked({
                                name: items[i]
                            });
                        }
                        // 在这里的callback，配置接口模式与非接口模拟是不参数都是不一样的。
                        typeof This.options.change === "function" && This.options.change.call(This.curNode, items);
                    }
                }
            }).on("keypress", function() {
                var $this = $(this);
                $this.next().text($this.val());
            }).on("blur", function() {
                var $this = $(this);
                $this.next().text($this.val());
            }).end().on("mousedown", function(ev) {
                ev.stopPropagation();
                $(this).find(".cinput :text").focus();
                return false;
            });
            // change
            if (url) {
                this.options.trigger.on("click", ".dropDown a", function() {
                    var $this = $(this);
                    typeof This.options.change === "function" && This.createChecked(This.options.change.call($this) || {});
                    $this.parent().hide();
                });
            }
            // hide drop
            $(document).on("mousedown", function() {
                This.options.trigger.find(".dropDown").hide();
            });
        },
        init: function() {
            this.eleInit();
        }
    };
    module.exports = selectPerson;
});
