(function(){var t={4869:function(t,e,s){"use strict";var n=s(6369),a=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("el-container",[e("el-header",{staticStyle:{"text-align":"left","font-size":"12px"}},[e("el-space",{attrs:{size:"middle",spacer:"spacer"}},[e("el-button",[e("router-link",{attrs:{to:"/"}},[t._v(" 查看 ")])],1),e("el-button",[e("router-link",{attrs:{to:"/edit"}},[t._v(" 编辑 ")])],1),e("el-dropdown",[e("i",{staticClass:"el-icon-menu",staticStyle:{"margin-right":"15px"}}),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",[t._v("查看")]),e("el-dropdown-item",[t._v("编辑")])],1)],1)],1)],1),e("el-main",[e("router-view")],1)],1)],1)},i=[],o={name:"App",components:{}},r=o,l=s(1001),c=(0,l.Z)(r,a,i,!1,null,null,null),d=c.exports,h=s(2631),u=function(){var t=this,e=t._self._c;return e("div",{on:{mousewheel:function(t){t.preventDefault()}}},[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}}),e("el-container",{staticStyle:{width:"100%"}},[e("el-header",{staticStyle:{"background-color":"aliceblue"}},[e("el-row",{attrs:{gutter:10}},[e("el-col",{attrs:{span:4}},[e("el-button",{attrs:{round:"","data-set":"rect"},on:{click:t.addRect}},[t._v("新增矩形")])],1),e("el-col",{attrs:{span:4}},[e("el-button",{attrs:{round:"","data-set":"round"},on:{click:t.addRect}},[t._v("新增圆形")])],1),e("el-col",{attrs:{span:4}},[e("el-button",{attrs:{round:"","data-set":"text"},on:{click:t.addRect}},[t._v("新增标签")])],1),e("el-col",{attrs:{span:4}},[e("el-button",{attrs:{round:""},on:{click:t.undo}},[t._v("撤销")])],1),e("el-col",{attrs:{span:4}},[e("el-select",{attrs:{placeholder:"报警频率"},model:{value:t.alertValue,callback:function(e){t.alertValue=e},expression:"alertValue"}},t._l(t.options,(function(t,s){return e("el-option",{key:s,attrs:{label:t.label,value:t.value}})})),1)],1),e("el-col",{attrs:{span:4}},[e("el-button",{attrs:{round:""},on:{click:t.saveToJson}},[t._v("保存")])],1)],1)],1),e("el-main",{},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:18}},[e("canvas",{ref:"canvas",staticStyle:{border:"1px solid #ccc"},attrs:{width:t.canvasW,height:t.canvasH,id:"canvas"}})]),e("el-col",{attrs:{span:6}},[e("el-card",{attrs:{"body-style":{padding:"0px"}}},[e("img",{staticClass:"image",attrs:{src:"https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+t.ticket}}),e("div",{staticStyle:{padding:"14px"}},[e("span",[t._v("微信扫码")]),e("div",{staticClass:"bottom clearfix"},[e("p",{staticClass:"time"},[t._v("订阅警报")])])])])],1)],1)],1)],1)],1)},p=[],f=(s(7658),s(7968)),v=s(4161),g={name:"IndexPage",data(){return{canvas:null,canvasW:800,canvasH:500,origin:null,border:null,objList:[],position:{},historyPosition:[],ticket:"",alertValue:5,options:[{label:"5min/次",value:5},{label:"10min/次",value:10},{label:"30min/次",value:30},{label:"1h/次",value:60},{label:"24h/次",value:3600}]}},mounted(){const t=new f.fabric.Canvas("canvas",{width:this.$refs.canvas.parentNode.clientWidth,height:this.$refs.canvas.parentNode.clientHeight});this.canvas=t,this.canvasW=this.$refs.canvas.parentNode.clientWidth,this.canvasH=this.$refs.canvas.parentNode.clientHeight;const e=new f.fabric.Rect({top:10,left:10,width:this.canvasW-20,height:this.canvasH-20,fill:"white",opacity:.5,stroke:"red"});this.border=e,t.add(e);const s=new f.fabric.Circle({radius:8,top:50,left:50,fill:"green"});this.origin=s,t.add(s),t.on("mouse:wheel",(e=>{let s=e.e.deltaY,n=t.getZoom();n*=.999**s,n>20&&(n=20),n<.01&&(n=.01),t.setZoom(n)})),this.createQrcode()},watch:{position:{handler(){this.updatePosition()}}},methods:{createQrcode(){v.Z.get("http://127.0.0.1:8000/api/qrcode").then((t=>{const{data:e}=t;1===e.code&&(this.ticket=JSON.parse(e.data).ticket)})).catch((t=>{console.log(t)}))},addRect(t){let e=t.currentTarget.dataset.set,s=null;console.log(e),s="round"===e?new f.fabric.Circle({radius:30,top:20,left:20,fill:"orange",stroke:"green"}):"rect"===e?new f.fabric.Rect({top:100,left:100,width:30,height:30,fill:"red"}):new f.fabric.IText("新建文本"),this.canvas.add(s),this.objList.push(s)},undo(){this.canvas.remove(this.objList[this.objList.length-1]),this.objList.pop()},saveToJson(){this.canvas.remove(this.origin);const t=this.canvas.toJSON(),e={x:this.border.left,y:this.border.top,w:this.border.width,h:this.border.height};v.Z.post("http://127.0.0.1:8000/api/init",{data:JSON.stringify(t),border:e,period:this.alertValue}).then((t=>{const{data:e}=t;200===e.code?this.warn("保存成功","success"):this.warn("保存失败","error"),console.log(t)})).catch((t=>{console.log(t)}))},warn(t,e){this.$message({message:t,type:e})}}},m=g,b=(0,l.Z)(m,u,p,!1,null,"ff35848e",null),w=b.exports,y=s(8499),k=s.n(y),x=function(){var t=this,e=t._self._c;return e("div",{on:{mousewheel:function(t){t.preventDefault()}}},[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}}),e("el-container",{staticStyle:{width:"100%"}},[e("el-header",{staticStyle:{"background-color":"aliceblue"}},[e("el-row",{attrs:{gutter:10}},[e("el-col",{attrs:{span:4}},[t._v(" 轨迹保留时间：1 min 导出数据 ")]),e("el-col",{attrs:{span:4}},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"请先输入要导出的时间，单位分钟，例如 15 后点击导出。查询结果按照1μs间隔取均值聚合，数据中的时间为UTC时间",placement:"bottom-start"}},[e("el-input",{attrs:{placeholder:"时间(分钟) 默认值5分钟"},model:{value:t.exportPeriod,callback:function(e){t.exportPeriod=e},expression:"exportPeriod"}})],1)],1),e("el-col",{attrs:{span:4}},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"请先输入要导出的时间，单位分钟，例如 15 后点击导出。查询结果按照1μs间隔取均值聚合，数据中的时间为UTC时间",placement:"bottom-start"}},[e("a",{attrs:{href:"http://127.0.0.1:8000/api/query?range="+t.exportPeriod}},[e("i",{staticClass:"el-icon-edit-outline"}),t._v("导出")])])],1)],1)],1),e("el-main",{},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:18}},[e("canvas",{ref:"canvas",staticStyle:{border:"1px solid #ccc"},attrs:{width:t.canvasW,height:t.canvasH,id:"canvas"}})]),e("el-col",{attrs:{span:6}},[e("el-card",{staticStyle:{"margin-left":"1rem"}},[e("el-descriptions",{attrs:{title:"基站位置信息(单位:m)x/y",direction:"vertical",column:4,border:"",size:"small"}},t._l(t.anc,(function(s,n){return e("el-descriptions-item",{key:n,attrs:{label:"基站"+n}},[e("el-input",{on:{change:function(e){return t.handleChange(n,"x")}},model:{value:t.anc[n].x,callback:function(e){t.$set(t.anc[n],"x",e)},expression:"anc[idx].x"}}),e("el-input",{on:{change:function(e){return t.handleChange(n,"x")}},model:{value:t.anc[n].y,callback:function(e){t.$set(t.anc[n],"y",e)},expression:"anc[idx].y"}})],1)})),1),e("el-descriptions",{attrs:{title:"标签信息(单位:m)",direction:"vertical",column:1,border:"",size:"small"}},[e("el-descriptions-item",{attrs:{label:"坐标"}},[e("el-tag",{attrs:{size:"small"}},[t._v("（"+t._s(this.position.avx)+","+t._s(this.position.avy)+"）")])],1)],1),e("el-descriptions",{attrs:{direction:"vertical",column:3,border:""}},[e("el-descriptions-item",{attrs:{label:"距离1"}},[t._v(t._s(t.position.anc1||0))]),e("el-descriptions-item",{attrs:{label:"距离2"}},[t._v(t._s(t.position.anc2||0))]),e("el-descriptions-item",{attrs:{label:"距离3"}},[t._v(t._s(t.position.anc3||0))])],1),e("el-descriptions",{attrs:{title:"比例信息",direction:"vertical",column:2,size:"small"}},[e("el-descriptions-item",{attrs:{label:"画布宽度"}},[e("el-tag",{attrs:{size:"small"}},[t._v(t._s(t.canvasW)+"px")])],1),e("el-descriptions-item",{attrs:{label:"画布高度"}},[e("el-tag",{attrs:{size:"small"}},[t._v(t._s(t.canvasH)+"px")])],1),e("el-descriptions-item",{attrs:{label:"场地长度"}},[e("el-tag",{attrs:{size:"small"}},[t._v(t._s(t.realWidth)+"m")])],1),e("el-descriptions-item",{attrs:{label:"场地宽度"}},[e("el-tag",{attrs:{size:"small"}},[t._v(t._s(t.realHeight)+"m")])],1),e("el-descriptions-item",{attrs:{label:"比例尺"}},[e("el-tag",{attrs:{size:"small"}},[t._v(t._s(t.scale(t.canvasW,t.realWidth)))])],1),e("el-descriptions-item",{attrs:{label:"比例尺"}},[e("el-tag",{attrs:{size:"small"}},[t._v(t._s(t.scale(t.canvasH,t.realHeight)))])],1)],1)],1)],1)],1)],1)],1)],1)},_=[],S={name:"ViewDetail",data(){return{socket:null,canvas:null,canvasW:800,canvasH:500,origin:null,objList:[],position:{},historyPosition:[],path:null,realWidth:8,realHeight:7,anc:[{x:0,y:0},{x:8,y:0},{x:4,y:6.9}],ancr:{},lines:[],timer:null,exportPeriod:null,ancobj:{type:"circle",version:"5.3.0",originX:"left",originY:"top",left:-.96,top:495.7,width:60,height:60,fill:"orange",stroke:"green",strokeWidth:1,strokeDashArray:null,strokeLineCap:"butt",strokeDashOffset:0,strokeLineJoin:"miter",strokeUniform:!1,strokeMiterLimit:4,scaleX:.19,scaleY:.19,angle:0,flipX:!1,flipY:!1,opacity:1,shadow:null,visible:!0,backgroundColor:"",fillRule:"nonzero",paintFirst:"fill",globalCompositeOperation:"source-over",skewX:0,skewY:0,radius:30,startAngle:0,endAngle:360}}},computed:{normalAnc:function(){let t=[];for(let e=0;e<this.anc.length;e++){let s={...this.ancobj};console.log(s,this.anc[e]);let n=this.anc[e].x*(this.canvasW/this.realWidth);s.left=n?n-20:0;let a=this.canvasH-this.anc[e].y*(this.canvasH/this.realHeight);s.top=a?a-3:0,t.push(s)}return t}},beforeDestroy(){console.log("清除定时器"),clearInterval(this.timer)},mounted(){this.timer=setInterval((()=>{this.historyPosition=[];for(let t=0;t<this.lines.length;t++)this.canvas.remove(this.lines[t]);console.log("执行了",this.historyPosition)}),6e4),this.canvasW=this.$refs.canvas.parentNode.clientWidth,this.canvasH=this.$refs.canvas.parentNode.clientHeight,this.socket=new WebSocket("ws://localhost:8000/ws"),this.socket.addEventListener("open",this.onOpen),this.socket.addEventListener("message",this.onMessage),this.socket.addEventListener("error",this.onError),this.socket.addEventListener("close",this.onClose)},watch:{position:{handler(){this.updatePosition()}}},methods:{onOpen(){console.log("WebSocket连接已经建立"),this.warn("连接已经建立","success")},onMessage(t){if(console.log("zhe shi e:",t),"null\n"==t.data||!t.data)return;let{data:e}=t;if(e=JSON.parse(e),console.log(e),!e.dataType)return this.configStr=e.data,void this.init();this.position=e,this.historyPosition.push(e),console.log("接收到WebSocket服务器发送的消息：",e)},onError(t){this.warn("连接发生错误","success"),console.error("WebSocket发生错误：",t)},onClose(t){this.warn("连接已经关闭","success"),console.warn("WebSocket连接已经关闭：",t)},init(){let t=JSON.parse(this.configStr);for(let n=0;n<this.normalAnc.length;n++){let e=new f.fabric.IText(`基站${n}(${this.anc[n].x},${this.anc[n].y})`,{left:this.normalAnc[n].left+8,top:this.normalAnc[n].top?this.normalAnc[n].top-5:0,fontSize:10});t.objects.push(e),t.objects.push(this.normalAnc[n])}for(let n=0;n<t.objects.length;n++)t.objects[n].selectable=!1;const e=new f.fabric.Canvas("canvas",{width:this.$refs.canvas.parentNode.clientWidth,height:this.$refs.canvas.parentNode.clientHeight});e.loadFromJSON(t),this.canvas=e;const s=new f.fabric.Circle({radius:8,top:50,left:50,fill:"green"});this.origin=s,e.add(s),e.on("mouse:wheel",(t=>{let s=t.e.deltaY,n=e.getZoom();n*=.999**s,n>20&&(n=20),n<.01&&(n=.01),e.zoomToPoint({x:t.e.offsetX,y:t.e.offsetY},n)}))},updatePosition(){const t=this.position.avx*(this.canvasW/this.realWidth),e=this.canvasH-this.position.avy*(this.canvasH/this.realHeight);this.origin.set({left:t,top:e});const s=this.drawEndArrow(t,e);this.lines.push(s),this.canvas.add(s)},drawEndArrow(t,e){return new f.fabric.Triangle({width:8,height:8,left:t,top:e,fill:"rgba(0,195,244)",opacity:1,angle:180,centeredRotation:!0,originX:"center",originY:"center",selectable:!0,hasControls:!1})},scale(t,e){const s=t/e;return Number.isInteger(s)?`${s}:1`:`${s.toFixed(3)}:1`},handleChange(t,e){this.anc[t][e]=parseFloat(this.anc[t][e]),this.init()},outdata(){console.log("ddd"),v.Z.get("http://127.0.0.1:8000/api/query?range="+this.exportPeriod).then((t=>{const{data:e}=t;1===e.code&&(this.ticket=JSON.parse(e.data).ticket)})).catch((t=>{console.log(t)}))},warn(t,e){this.$message({message:t,type:e})}}},W=S,C=(0,l.Z)(W,x,_,!1,null,"12a450bf",null),O=C.exports;n["default"].use(k()),n["default"].config.productionTip=!1,n["default"].use(h.ZP);const H=[{path:"/",name:"view",component:O},{path:"/edit",name:"edit",component:w}],P=new h.ZP({routes:H});new n["default"]({router:P,el:"#app",render:t=>t(d)}).$mount("#app")},4960:function(){},6759:function(){},6272:function(){}},e={};function s(n){var a=e[n];if(void 0!==a)return a.exports;var i=e[n]={id:n,loaded:!1,exports:{}};return t[n].call(i.exports,i,i.exports,s),i.loaded=!0,i.exports}s.m=t,function(){s.amdO={}}(),function(){var t=[];s.O=function(e,n,a,i){if(!n){var o=1/0;for(d=0;d<t.length;d++){n=t[d][0],a=t[d][1],i=t[d][2];for(var r=!0,l=0;l<n.length;l++)(!1&i||o>=i)&&Object.keys(s.O).every((function(t){return s.O[t](n[l])}))?n.splice(l--,1):(r=!1,i<o&&(o=i));if(r){t.splice(d--,1);var c=a();void 0!==c&&(e=c)}}return e}i=i||0;for(var d=t.length;d>0&&t[d-1][2]>i;d--)t[d]=t[d-1];t[d]=[n,a,i]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){s.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,n){var a,i,o=n[0],r=n[1],l=n[2],c=0;if(o.some((function(e){return 0!==t[e]}))){for(a in r)s.o(r,a)&&(s.m[a]=r[a]);if(l)var d=l(s)}for(e&&e(n);c<o.length;c++)i=o[c],s.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return s.O(d)},n=self["webpackChunkuwb"]=self["webpackChunkuwb"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=s.O(void 0,[998],(function(){return s(4869)}));n=s.O(n)})();
//# sourceMappingURL=app.256b27f5.js.map