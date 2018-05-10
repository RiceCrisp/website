var tns=function(){function e(){for(var e,t,n,i=arguments[0]||{},a=1,r=arguments.length;a<r;a++)if(null!==(e=arguments[a]))for(t in e)n=e[t],i!==n&&void 0!==n&&(i[t]=n);return i}function t(e){return["true","false"].indexOf(e)>=0?JSON.parse(e):e}function n(e,t,n){return n&&localStorage.setItem(e,t),t}function i(){var e=window.tnsId;return window.tnsId=e?e+1:1,"tns"+window.tnsId}function a(){var e=document,t=e.body;return t||(t=e.createElement("body"),t.fake=!0),t}function r(e){var t="";return e.fake&&(t=A.style.overflow,e.style.background="",e.style.overflow=A.style.overflow="hidden",A.appendChild(e)),t}function o(e,t){e.fake&&(e.remove(),A.style.overflow=t,A.offsetHeight)}function s(e){var t=document.createElement("style");return e&&t.setAttribute("media",e),document.querySelector("head").appendChild(t),t.sheet?t.sheet:t.styleSheet}function l(e,t,n,i){"insertRule"in e?e.insertRule(t+"{"+n+"}",i):e.addRule(t,n,i)}function c(e){return("insertRule"in e?e.cssRules:e.rules).length}function u(e,t){return Math.atan2(e,t)*(180/Math.PI)}function d(e,t){var n=!1,i=Math.abs(90-Math.abs(e));return i>=90-t?n="horizontal":i<=t&&(n="vertical"),n}function f(e,t){return e.className.indexOf(t)>=0}function v(e,t){f(e,t)||(e.className+=" "+t)}function h(e,t){f(e,t)&&(e.className=e.className.replace(t,""))}function p(e,t){return e.hasAttribute(t)}function m(e,t){return e.getAttribute(t)}function y(e){return void 0!==e.item}function g(e,t){if(e=y(e)||e instanceof Array?e:[e],"[object Object]"===Object.prototype.toString.call(t))for(var n=e.length;n--;)for(var i in t)e[n].setAttribute(i,t[i])}function b(e,t){e=y(e)||e instanceof Array?e:[e],t=t instanceof Array?t:[t];for(var n=t.length,i=e.length;i--;)for(var a=n;a--;)e[i].removeAttribute(t[a])}function x(e){p(e,"hidden")||g(e,{hidden:""})}function T(e){p(e,"hidden")&&b(e,"hidden")}function E(e){return"boolean"==typeof e.complete?e.complete:"number"==typeof e.naturalWidth?0!==e.naturalWidth:void 0}function C(e){for(var t=document.createElement("fakeelement"),n=(e.length,0);n<e.length;n++){var i=e[n];if(void 0!==t.style[i])return i}return!1}function w(e,t){var n=!1;return/^Webkit/.test(e)?n="webkit"+t+"End":/^O/.test(e)?n="o"+t+"End":e&&(n=t.toLowerCase()+"end"),n}function D(e,t){for(var n in t){var i=("touchstart"===n||"touchmove"===n)&&W;e.addEventListener(n,t[n],i)}}function N(e,t){for(var n in t){var i=["touchstart","touchmove"].indexOf(n)>=0&&W;e.removeEventListener(n,t[n],i)}}function O(){return{topics:{},on:function(e,t){this.topics[e]=this.topics[e]||[],this.topics[e].push(t)},off:function(e,t){if(this.topics[e])for(var n=0;n<this.topics[e].length;n++)if(this.topics[e][n]===t){this.topics[e].splice(n,1);break}},emit:function(e,t){this.topics[e]&&this.topics[e].forEach(function(e){e(t)})}}}function k(e,t,n,i,a,r,o){function s(){r-=l,u+=d,e.style[t]=n+u+c+i,r>0?setTimeout(s,l):o()}var l=Math.min(r,10),c=a.indexOf("%")>=0?"%":"px",a=a.replace(c,""),u=Number(e.style[t].replace(n,"").replace(i,"").replace(c,"")),d=(a-u)/r*l;setTimeout(s,l)}Object.keys||(Object.keys=function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}),function(){"use strict";"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)})}();var A=document.documentElement,P=!1;try{var M=Object.defineProperty({},"passive",{get:function(){P=!0}});window.addEventListener("test",null,M)}catch(e){}var W=!!P&&{passive:!0},I=navigator.userAgent,S=!0,H={};try{H=localStorage,H.tnsApp?H.tnsApp!==I&&(H.tnsApp=I,["tC","tSP","tMQ","tTf","tTDu","tTDe","tADu","tADe","tTE","tAE"].forEach(function(e){H.removeItem(e)})):H.tnsApp=I}catch(e){S=!1}var L=document,z=window,B={ENTER:13,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40},R=t(H.tC)||n("tC",function(){var e=document,t=a(),n=r(t),i=e.createElement("div"),s=!1;t.appendChild(i);try{for(var l,c=["calc(10px)","-moz-calc(10px)","-webkit-calc(10px)"],u=0;u<3;u++)if(l=c[u],i.style.width=l,10===i.offsetWidth){s=l.replace("(10px)","");break}}catch(e){}return t.fake?o(t,n):i.remove(),s}(),S),j=t(H.tSP)||n("tSP",function(){var e,t,n=document,i=a(),s=r(i),l=n.createElement("div"),c=n.createElement("div");return l.style.cssText="width: 10px",c.style.cssText="float: left; width: 5.5px; height: 10px;",e=c.cloneNode(!0),l.appendChild(c),l.appendChild(e),i.appendChild(l),t=c.offsetTop!==e.offsetTop,i.fake?o(i,s):l.remove(),t}(),S),q=t(H.tMQ)||n("tMQ",function(){var e,t=document,n=a(),i=r(n),s=t.createElement("div"),l=t.createElement("style"),c="@media all and (min-width:1px){.tns-mq-test{position:absolute}}";return l.type="text/css",s.className="tns-mq-test",n.appendChild(l),n.appendChild(s),l.styleSheet?l.styleSheet.cssText=c:l.appendChild(t.createTextNode(c)),e=window.getComputedStyle?window.getComputedStyle(s).position:s.currentStyle.position,n.fake?o(n,i):s.remove(),"absolute"===e}(),S),G=t(H.tTf)||n("tTf",C(["transform","WebkitTransform","MozTransform","msTransform","OTransform"]),S),F=t(H.tTDu)||n("tTDu",C(["transitionDuration","WebkitTransitionDuration","MozTransitionDuration","OTransitionDuration"]),S),U=t(H.tTDe)||n("tTDe",C(["transitionDelay","WebkitTransitionDelay","MozTransitionDelay","OTransitionDelay"]),S),X=t(H.tADu)||n("tADu",C(["animationDuration","WebkitAnimationDuration","MozAnimationDuration","OAnimationDuration"]),S),V=t(H.tADe)||n("tADe",C(["animationDelay","WebkitAnimationDelay","MozAnimationDelay","OAnimationDelay"]),S),Y=t(H.tTE)||n("tTE",w(F,"Transition"),S),K=t(H.tAE)||n("tAE",w(X,"Animation"),S);return q||(j=!1),function(t){function n(){return z.innerWidth||L.documentElement.clientWidth||L.body.clientWidth}function a(e){var n=t[e];return!n&&ct&&lt.indexOf(e)>=0&&ct.forEach(function(t){st[t][e]&&(n=!0)}),n}function r(e,n){n=n?n:dt;var i,a={slideBy:"page",edgePadding:!1,autoHeight:!0};if(!Ye&&e in a)i=a[e];else if("items"===e&&r("fixedWidth"))i=Math.floor(ot/(r("fixedWidth")+r("gutter")));else if("autoHeight"===e&&"outer"===gt)i=!0;else if(i=t[e],ct&&lt.indexOf(e)>=0)for(var o=0,s=ct.length;o<s;o++){var l=ct[o];if(!(n>=l))break;e in st[l]&&(i=st[l][e])}return"slideBy"===e&&"page"===i&&(i=r("items")),i}function o(e){return R?R+"("+100*e+"% / "+Mt+")":100*e/Mt+"%"}function y(e,t,n){var i="";if(e){var a=e;t&&(a+=t),i=n?"margin: 0px "+(ot%(n+t)+t)/2+"px":_e?"margin: 0 "+e+"px 0 "+a+"px;":"padding: "+a+"px 0 "+e+"px 0;"}else if(t&&!n){var r="-"+t+"px",o=_e?r+" 0 0":"0 "+r+" 0";i="margin: 0 "+o+";"}return i}function C(e,t,n){return e?(e+t)*Mt+"px":R?R+"("+100*Mt+"% / "+n+")":100*Mt/n+"%"}function w(e,t,n){var i="";if(_e){if(i="width:",e)i+=e+t+"px";else{var a=Ye?Mt:n;i+=R?R+"(100% / "+a+")":100/a+"%"}i+=Jt+";"}return i}function A(e){var t="";if(e!==!1){t=(_e?"padding-":"margin-")+(_e?"right":"bottom")+": "+e+"px;"}return t}function P(e){e=e||z.event,clearTimeout(ht),ht=setTimeout(function(){var t=n();dt!==t&&(dt=t,M(),"outer"===gt&&Ft.emit("outerResized",Ge(e)))},100)}function M(){var e=ut,t=zt,n=mt,i=Qt;if(ot=et.clientWidth,$e=tt.clientWidth,ct&&W(),e!==ut||Tt){var a=Et,o=Nt,s=Tt,u=xt,d=bt,f=Yt;if(mt=r("items"),yt=r("slideBy"),Yt=r("disable"),Qt=!!Yt||!!Kt&&rt<=mt,mt!==n&&(jt=Mt-mt,Kn()),Yt!==f&&H(Yt),Qt!==i&&(Qt&&(zt=Ye?Pt:0),I()),e!==ut&&(Ct=r("speed"),xt=r("edgePadding"),bt=r("gutter"),Tt=r("fixedWidth"),Yt||Tt===s||fe(),(Nt=r("autoHeight"))!==o&&(Nt||(tt.style.height=""))),Et=!Qt&&r("arrowKeys"),Et!==a&&(Et?D(L,tn):N(L,tn)),rn){var v=pn,h=mn;pn=!Qt&&r("controls"),mn=r("controlsText"),pn!==v&&(pn?T(yn):x(yn)),mn!==h&&(dn.innerHTML=mn[0],fn.innerHTML=mn[1])}if(on){var p=bn;bn=!Qt&&r("nav"),bn!==p&&(bn?(T(xn),qe()):x(xn))}if(ln){var m=Gn;Gn=!Qt&&r("touch"),Gn!==m&&Ye&&(Gn?D(nt,nn):N(nt,nn))}if(cn){var g=Vn;Vn=!Qt&&r("mouseDrag"),Vn!==g&&Ye&&(Vn?D(nt,an):N(nt,an))}if(sn){var b=kn,E=Wn,O=zn,k=Mn;if(Qt?kn=Wn=zn=!1:(kn=r("autoplay"),kn?(Wn=r("autoplayHoverPause"),zn=r("autoplayResetOnVisibility")):Wn=zn=!1),Mn=r("autoplayText"),An=r("autoplayTimeout"),kn!==b&&(kn?(In&&T(In),Sn||Ee()):(In&&x(In),Sn&&Ce())),Wn!==E&&(Wn?D(nt,_t):N(nt,_t)),zn!==O&&(zn?D(L,en):N(L,en)),In&&Mn!==k){var P=kn?1:0,M=In.innerHTML,z=M.length-k[P].length;M.substring(z)===k[P]&&(In.innerHTML=M.substring(0,z)+Mn[P])}}if(!q){if(Qt||xt===u&&bt===d||(tt.style.cssText=y(xt,bt,Tt)),Ye&&_e&&(Tt!==s||bt!==d||mt!==n)&&(nt.style.width=C(Tt,bt,mt)),_e&&(mt!==n||bt!==d||Tt!=s)){var B=w(Tt,bt,mt)+A(bt);Ot.removeRule(c(Ot)-1),l(Ot,"#"+Vt+" > .tns-item",B,c(Ot))}Tt||zt!==t||he(0)}zt!==t&&(Ft.emit("indexChanged",Ge()),he(0),Bt=zt),mt!==n&&(ee(),$(),navigator.msMaxTouchPoints&&ie())}_e||Yt||(ne(),Re(),fe()),S(!0),$()}function W(){ut=0,ct.forEach(function(e,t){dt>=e&&(ut=t+1)})}function I(){var e="tns-transparent",t="0px"===tt.style.margin;if(Qt){if(!t&&(xt&&(tt.style.margin="0px"),Pt))for(var n=Pt;n--;)v(at[n],e),v(at[Mt-n-1],e)}else if(t&&(xt&&!Tt&&q&&(tt.style.margin=""),Pt))for(var n=Pt;n--;)h(at[n],e),h(at[Mt-n-1],e)}function S(e){Tt&&xt&&(Qt||ot<=Tt+bt?"0px"!==tt.style.margin&&(tt.style.margin="0px"):e&&(tt.style.cssText=y(xt,bt,Tt)))}function H(e){var t=at.length;if(e){if(Ot.disabled=!0,nt.className=nt.className.replace(Xt.substring(1),""),nt.style="",Dt)for(var n=Pt;n--;)Ye&&x(at[n]),x(at[t-n-1]);if(_e&&Ye||(tt.style=""),!Ye)for(var i=zt;i<zt+rt;i++){var a=at[i];a.style="",h(a,Ke),h(a,Ze)}}else{if(Ot.disabled=!1,nt.className+=Xt,_e||ne(),fe(),Dt)for(var n=Pt;n--;)Ye&&T(at[n]),T(at[t-n-1]);if(!Ye)for(var i=zt;i<zt+rt;i++){var a=at[i],r=i<zt+mt?Ke:Ze;a.style.left=100*(i-zt)/mt+"%",v(a,r)}}}function Q(){Sn&&(Ce(),Hn=!0)}function J(){!Sn&&Hn&&(Ee(),Hn=!1)}function Z(){if(kt&&!Yt){var e=zt,t=zt+mt;for(xt&&(e-=1,t+=1);e<t;e++)[].forEach.call(at[e].querySelectorAll(".tns-lazy-img"),function(e){var t={};t[Y]=function(e){e.stopPropagation()},D(e,t),f(e,"loaded")||(e.src=m(e,"data-src"),v(e,"loaded"))})}}function $(){if(Nt&&!Yt){for(var e=[],t=zt;t<zt+mt;t++)[].forEach.call(at[t].querySelectorAll("img"),function(t){e.push(t)});0===e.length?te():_(e)}}function _(e){e.forEach(function(t,n){E(t)&&e.splice(n,1)}),0===e.length?te():setTimeout(function(){_(e)},16)}function ee(){Z(),ae(),ce(),qe(),re()}function te(){for(var e,t=[],n=zt;n<zt+mt;n++)t.push(at[n].offsetHeight);e=Math.max.apply(null,t),tt.style.height!==e&&(F&&ue(Ct),tt.style.height=e+"px")}function ne(){vt=[0];for(var e,t=at[0].getBoundingClientRect().top,n=1;n<Mt;n++)e=at[n].getBoundingClientRect().top,vt.push(e-t)}function ie(){et.style.msScrollSnapPointsX="snapInterval(0%, "+100/mt+"%)"}function ae(){for(var e=Mt;e--;){var t=at[e];e>=zt&&e<zt+mt?p(t,"tabindex")&&(g(t,{"aria-hidden":"false"}),b(t,["tabindex"]),v(t,un)):(p(t,"tabindex")||g(t,{"aria-hidden":"true",tabindex:"-1"}),f(t,un)&&h(t,un))}}function re(){if(bn&&(wn=Cn!==-1?Cn:zt%rt,Cn=-1,wn!==Dn)){var e=gn[Dn],t=gn[wn];g(e,{tabindex:"-1","aria-selected":"false"}),g(t,{tabindex:"0","aria-selected":"true"}),h(e,Nn),v(t,Nn)}}function oe(e){return"button"===e.nodeName.toLowerCase()}function se(e){return"true"===e.getAttribute("aria-disabled")}function le(e,t,n){e?t.disabled=n:t.setAttribute("aria-disabled",n.toString())}function ce(){if(pn&&!Dt){var e=vn?dn.disabled:se(dn),t=hn?fn.disabled:se(fn),n=zt===Rt,i=!wt&&zt===jt;n&&!e&&le(vn,dn,!0),!n&&e&&le(vn,dn,!1),i&&!t&&le(hn,fn,!0),!i&&t&&le(hn,fn,!1)}}function ue(e,t){e=e?e/1e3+"s":"",t=t||nt,t.style[F]=e,Ye||(t.style[X]=e),_e||(tt.style[F]=e)}function de(){var e;if(_e)if(Tt)e=-(Tt+bt)*zt+"px";else{var t=G?Mt:mt;e=100*-zt/t+"%"}else e=-vt[zt]+"px";return e}function fe(e){e||(e=de()),nt.style[St]=Ht+e+Lt}function ve(e,t,n,i){for(var a=e,r=e+mt;a<r;a++){var o=at[a];i||(o.style.left=100*(a-zt)/mt+"%"),F&&ue(Ct,o),Je&&U&&(o.style[U]=o.style[V]=Je*(a-e)/1e3+"s"),h(o,t),v(o,n),i&&At.push(o)}}function he(e,t){void 0===e&&(e=Ct),F&&ue(e),Qn(e,t)}function pe(e,t){It&&Kn(),(zt!==Bt||t)&&(Ft.emit("indexChanged",Ge()),Ft.emit("transitionStart",Ge()),Sn&&e&&["click","keydown"].indexOf(e.type)>=0&&Ce(),qt=!0,he())}function me(e){return e.toLowerCase().replace(/-/g,"")}function ye(e){if(Ye||qt){if(Ft.emit("transitionEnd",Ge(e)),!Ye&&At.length>0)for(var t=0;t<mt;t++){var n=At[t];n.style.left="",F&&ue(0,n),Je&&U&&(n.style[U]=n.style[V]=""),h(n,Qe),v(n,Ze)}if(!e||!Ye&&e.target.parentNode===nt||e.target===nt&&me(e.propertyName)===me(St)){if(!It){var i=zt;Kn(),zt!==i&&(Ft.emit("indexChanged",Ge()),F&&ue(0),fe())}$(),"inner"===gt&&Ft.emit("innerLoaded",Ge()),qt=!1,Dn=wn,Bt=zt}}}function ge(e,t){if(!Qt)if("prev"===e)be(t,-1);else if("next"===e)be(t,1);else if(!qt){var n=zt%rt,i=0;if(n<0&&(n+=rt),"first"===e)i=-n;else if("last"===e)i=rt-mt-n;else if("number"!=typeof e&&(e=parseInt(e)),!isNaN(e)){var a=e%rt;a<0&&(a+=rt),i=a-n}zt+=i,zt%rt!=Bt%rt&&pe(t)}}function be(e,t){if(!qt){var n;if(!t){e=e||z.event;for(var i=e.target||e.srcElement;i!==yn&&[dn,fn].indexOf(i)<0;)i=i.parentNode;var a=[dn,fn].indexOf(i);a>=0&&(n=!0,t=0===a?-1:1)}if(t===-1)zt-=yt;else if(1===t){if(wt&&zt===jt)return void ge(0,e);zt+=yt}pe(n||e&&"keydown"===e.type?e:null)}}function xe(e){if(!qt){e=e||z.event;for(var t,n=e.target||e.srcElement;n!==xn&&!p(n,"data-nav");)n=n.parentNode;p(n,"data-nav")&&(t=Cn=[].indexOf.call(gn,n),ge(t,e))}}function Te(e,t){g(In,{"data-action":e}),In.innerHTML=Ln[0]+e+Ln[1]+t}function Ee(){De(),In&&Te("stop",Mn[1]),Sn=!0}function Ce(){we(),In&&Te("start",Mn[0]),Sn=!1}function we(){Sn="paused",clearInterval(On)}function De(){Sn!==!0&&(clearInterval(On),On=setInterval(function(){be(null,Pn)},An))}function Ne(){Sn?Ce():Ee()}function Oe(){Bn!=L.hidden&&Sn!==!1&&(L.hidden?we():De()),Bn=L.hidden}function ke(e){switch(e=e||z.event,e.keyCode){case B.LEFT:be(e,-1);break;case B.RIGHT:be(e,1)}}function Ae(e){switch(e=e||z.event,e.keyCode){case B.LEFT:case B.UP:case B.PAGEUP:dn.disabled||be(e,-1);break;case B.RIGHT:case B.DOWN:case B.PAGEDOWN:fn.disabled||be(e,1);break;case B.HOME:ge(0,e);break;case B.END:ge(rt-1,e)}}function Pe(e){e.focus()}function Me(e){function n(e){return t.navContainer?e:Tn[e]}var i=L.activeElement;if(p(i,"data-nav")){e=e||z.event;var a=e.keyCode,r=[].indexOf.call(gn,i),o=Tn.length,s=Tn.indexOf(r);switch(t.navContainer&&(o=rt,s=r),a){case B.LEFT:case B.PAGEUP:s>0&&Pe(gn[n(s-1)]);break;case B.UP:case B.HOME:s>0&&Pe(gn[n(0)]);break;case B.RIGHT:case B.PAGEDOWN:s<o-1&&Pe(gn[n(s+1)]);break;case B.DOWN:case B.END:s<o-1&&Pe(gn[n(o-1)]);break;case B.ENTER:case B.SPACE:Cn=r,ge(r,e)}}}function We(){he(0,nt.scrollLeft()),Bt=zt}function Ie(e){return e.target||e.srcElement}function Se(e){return e.type.indexOf("touch")>=0}function He(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function Le(e){if(Xn=0,pt=!1,Fn=Un=null,!qt){e=e||z.event;var t;Se(e)?(t=e.changedTouches[0],Ft.emit("touchStart",Ge(e))):(t=e,He(e),Ft.emit("dragStart",Ge(e))),Fn=parseInt(t.clientX),Un=parseInt(t.clientY),Rn=parseFloat(nt.style[St].replace(Ht,"").replace(Lt,""))}}function ze(e){if(!qt&&null!==Fn){e=e||z.event;var n;if(Se(e)?n=e.changedTouches[0]:(n=e,He(e)),jn=parseInt(n.clientX)-Fn,qn=parseInt(n.clientY)-Un,0===Xn&&(Xn=d(u(qn,jn),15)===t.axis),Xn){Se(e)?Ft.emit("touchMove",Ge(e)):(Yn||(Yn=!0),Ft.emit("dragMove",Ge(e))),pt||(pt=!0);var i=Rn;if(_e)if(Tt)i+=jn,i+="px";else{var a=G?jn*mt*100/($e*Mt):100*jn/$e;i+=a,i+="%"}else i+=qn,i+="px";G&&ue(0),nt.style[St]=Ht+i+Lt}}}function Be(e){if(!qt&&pt){e=e||z.event;var t;Se(e)?(t=e.changedTouches[0],Ft.emit("touchEnd",Ge(e))):(t=e,Ft.emit("dragEnd",Ge(e))),jn=parseInt(t.clientX)-Fn,qn=parseInt(t.clientY)-Un;var n=Boolean(_e?jn:qn);if(Xn=0,pt=!1,Fn=Un=null,_e){var i=-jn*mt/$e;i=jn>0?Math.floor(i):Math.ceil(i),zt+=i}else{var a=-(Rn+qn);if(a<=0)zt=Rt;else if(a>=vt[vt.length-1])zt=jt;else{var r=0;do{r++,zt=qn<0?r+1:r}while(r<Mt&&a>=vt[r+1])}}if(pe(e,n),Yn){Yn=!1;var o=Ie(e);D(o,{click:function e(t){He(t),N(o,{click:e})}})}}}function Re(){tt.style.height=vt[zt+mt]-vt[zt]+"px"}function je(){Tn=[];for(var e=zt%rt%mt;e<rt;)!Dt&&e+mt>rt&&(e=rt-mt),Tn.push(e),e+=mt;(Dt&&Tn.length*mt<rt||!Dt&&Tn[0]>0)&&Tn.unshift(0)}function qe(){bn&&!t.navContainer&&Tn.indexOf(zt%rt)<0&&(je(),Tn!==En&&(En.length>0&&En.forEach(function(e){x(gn[e])}),Tn.length>0&&Tn.forEach(function(e){T(gn[e])}),En=Tn))}function Ge(e){return{container:nt,slideItems:at,navContainer:xn,navItems:gn,controlsContainer:yn,hasControls:rn,prevButton:dn,nextButton:fn,items:mt,slideBy:yt,cloneCount:Pt,slideCount:rt,slideCountNew:Mt,index:zt,indexCached:Bt,navCurrentIndex:wn,navCurrentIndexCached:Dn,visibleNavIndexes:Tn,visibleNavIndexesCached:En,event:e||{}}}if(t=e({container:L.querySelector(".slider"),mode:"carousel",axis:"horizontal",items:1,gutter:0,edgePadding:0,fixedWidth:!1,slideBy:1,controls:!0,controlsText:["prev","next"],controlsContainer:!1,nav:!0,navContainer:!1,arrowKeys:!1,speed:300,autoplay:!1,autoplayTimeout:5e3,autoplayDirection:"forward",autoplayText:["start","stop"],autoplayHoverPause:!1,autoplayButton:!1,autoplayButtonOutput:!0,autoplayResetOnVisibility:!0,loop:!0,rewind:!1,autoHeight:!1,responsive:!1,lazyload:!1,touch:!0,mouseDrag:!1,nested:!1,freezable:!0,onInit:!1},t||{}),["container","controlsContainer","navContainer","autoplayButton"].forEach(function(e){"string"==typeof t[e]&&(t[e]=L.querySelector(t[e]))}),t.container&&t.container.nodeName&&!(t.container.children.length<2)){if(t.responsive){var Fe={},Ue=t.responsive;for(var Xe in Ue){var Ve=Ue[Xe];Fe[Xe]="number"==typeof Ve?{items:Ve}:Ve}t.responsive=Fe,Fe=null,0 in t.responsive&&(t=e(t,t.responsive[0]),delete t.responsive[0])}var Ye="carousel"===t.mode;if(!Ye){t.axis="horizontal",t.rewind=!1,t.loop=!0,t.edgePadding=!1;var Ke="tns-fadeIn",Qe="tns-fadeOut",Je=!1,Ze=t.animateNormal||"tns-normal";Y&&K&&(Ke=t.animateIn||Ke,Qe=t.animateOut||Qe,Je=t.animateDelay||Je)}var $e,_e="horizontal"===t.axis,et=L.createElement("div"),tt=L.createElement("div"),nt=t.container,it=nt.parentNode,at=nt.children,rt=at.length,ot=it.clientWidth,st=t.responsive,lt=[],ct=!1,ut=0,dt=n();if(st){ct=Object.keys(st).map(function(e){return parseInt(e)}).sort(function(e,t){return e-t}),ct.forEach(function(e){lt=lt.concat(Object.keys(st[e]))});var ft=[];lt.forEach(function(e){ft.indexOf(e)<0&&ft.push(e)}),lt=ft,W()}var vt,ht,pt,mt=r("items"),yt="page"===r("slideBy")?mt:r("slideBy"),gt=t.nested,bt=r("gutter"),xt=r("edgePadding"),Tt=r("fixedWidth"),Et=r("arrowKeys"),Ct=r("speed"),wt=t.rewind,Dt=!wt&&t.loop,Nt=r("autoHeight"),Ot=s(),kt=t.lazyload,At=[],Pt=Dt?2*rt:0,Mt=Ye?rt+2*Pt:rt+Pt,Wt=!(!Tt||Dt||xt),It=!Ye||!Dt,St=_e?"left":"top",Ht="",Lt="",zt=Ye?Pt:0,Bt=zt,Rt=0,jt=Mt-mt,qt=!1,Gt=t.onInit,Ft=new O,Ut=nt.id,Xt=" tns-slider tns-"+t.mode,Vt=nt.id||i(),Yt=r("disable"),Kt=t.freezable,Qt=!!Yt||!!Kt&&rt<=mt,Jt="inner"===gt?" !important":"",Zt={click:be,keydown:Ae},$t={click:xe,keydown:Me},_t={mouseover:Q,mouseout:J},en={visibilitychange:Oe},tn={keydown:ke},nn={touchstart:Le,touchmove:ze,touchend:Be,touchcancel:Be},an={mousedown:Le,mousemove:ze,mouseup:Be,mouseleave:Be},rn=a("controls"),on=a("nav"),sn=a("autoplay"),ln=a("touch"),cn=a("mouseDrag"),un="tns-slide-active";if(rn)var dn,fn,vn,hn,pn=r("controls"),mn=r("controlsText"),yn=t.controlsContainer;if(on)var gn,bn=r("nav"),xn=t.navContainer,Tn=[],En=Tn,Cn=-1,wn=0,Dn=0,Nn="tns-nav-active";if(sn)var On,kn=r("autoplay"),An=r("autoplayTimeout"),Pn="forward"===t.autoplayDirection?1:-1,Mn=r("autoplayText"),Wn=r("autoplayHoverPause"),In=t.autoplayButton,Sn=!1,Hn=!1,Ln=["<span class='tns-visually-hidden'>"," animation</span>"],zn=r("autoplayResetOnVisibility"),Bn=!1;if(ln)var Rn,jn,qn,Gn=r("touch"),Fn=null,Un=null,Xn=0;if(cn)var Vn=r("mouseDrag"),Yn=!1;Qt&&(pn=bn=Gn=Vn=Et=kn=Wn=zn=!1),G&&(St=G,Ht="translate",Ht+=_e?"X(":"Y(",Lt=")"),function(){et.appendChild(tt),it.insertBefore(et,nt),tt.appendChild(nt),$e=tt.clientWidth;var e="tns-outer",n="tns-inner",i=a("gutter");if(Ye?_e&&(a("edgePadding")||i&&!t.fixedWidth)?e+=" tns-ovh":n+=" tns-ovh":i&&(e+=" tns-ovh"),et.className=e,tt.className=n,tt.id=Vt+"-iw",Nt&&(tt.className+=" tns-ah",tt.style[F]=Ct/1e3+"s"),""===nt.id&&(nt.id=Vt),Xt+=j?" tns-subpixel":" tns-no-subpixel",Xt+=R?" tns-calc":" tns-no-calc",Ye&&(Xt+=" tns-"+t.axis),nt.className+=Xt,Ye&&Y){var s={};s[Y]=ye,D(nt,s)}e=n=null;for(var u=0;u<rt;u++){var d=at[u];d.id||(d.id=Vt+"-item"+u),v(d,"tns-item"),!Ye&&Ze&&v(d,Ze),g(d,{"aria-hidden":"true",tabindex:"-1"})}if(Dt||xt){for(var f=L.createDocumentFragment(),p=L.createDocumentFragment(),m=Pt;m--;){var T=m%rt,E=at[T].cloneNode(!0);if(b(E,"id"),p.insertBefore(E,p.firstChild),Ye){var N=at[rt-1-T].cloneNode(!0);b(N,"id"),f.appendChild(N)}}nt.insertBefore(f,nt.firstChild),nt.appendChild(p),at=nt.children}for(var O=zt;O<zt+Math.min(rt,mt);O++){var d=at[O];g(d,{"aria-hidden":"false"}),b(d,["tabindex"]),v(d,un),Ye||(d.style.left=100*(O-zt)/mt+"%",v(d,Ke),h(d,Ze))}if(Ye&&_e&&(j?(l(Ot,"#"+Vt+" > .tns-item","font-size:"+z.getComputedStyle(at[0]).fontSize+";",c(Ot)),l(Ot,"#"+Vt,"font-size:0;",c(Ot))):[].forEach.call(at,function(e,t){e.style.marginLeft=o(t)})),q){var k=y(t.edgePadding,t.gutter,t.fixedWidth);l(Ot,"#"+Vt+"-iw",k,c(Ot)),Ye&&_e&&(k="width:"+C(t.fixedWidth,t.gutter,t.items),l(Ot,"#"+Vt,k,c(Ot))),(_e||t.gutter)&&(k=w(t.fixedWidth,t.gutter,t.items)+A(t.gutter),l(Ot,"#"+Vt+" > .tns-item",k,c(Ot)))}else if(tt.style.cssText=y(xt,bt,Tt),Ye&&_e&&(nt.style.width=C(Tt,bt,mt)),_e||bt){var k=w(Tt,bt,mt)+A(bt);l(Ot,"#"+Vt+" > .tns-item",k,c(Ot))}if(_e||Yt||(ne(),Re()),st&&q&&ct.forEach(function(e){var t=st[e],n="",i="",o="",s="",l=r("items",e),c=r("fixedWidth",e),u=r("edgePadding",e),d=r("gutter",e);("edgePadding"in t||"gutter"in t)&&(i="#"+Vt+"-iw{"+y(u,d,c)+"}"),Ye&&_e&&("fixedWidth"in t||"gutter"in t||"items"in t)&&(o="#"+Vt+"{width:"+C(c,d,l)+"}"),("fixedWidth"in t||a("fixedWidth")&&"gutter"in t||!Ye&&"items"in t)&&(s+=w(c,d,l)),"gutter"in t&&(s+=A(d)),s.length>0&&(s="#"+Vt+" > .tns-item{"+s+"}"),n=i+o+s,n.length>0&&Ot.insertRule("@media (min-width: "+e/16+"em) {"+n+"}",Ot.cssRules.length)}),Ye&&!Yt&&fe(),navigator.msMaxTouchPoints&&(v(et,"ms-touch"),D(et,{scroll:We}),ie()),on){var W=Ye?Pt:0;if(xn)g(xn,{"aria-label":"Carousel Pagination"}),gn=xn.children,[].forEach.call(gn,function(e,t){g(e,{"data-nav":t,tabindex:"-1","aria-selected":"false","aria-controls":at[W+t].id})});else{for(var B="",O=0;O<rt;O++)B+='<button data-nav="'+O+'" tabindex="-1" aria-selected="false" aria-controls="'+at[W+O].id+'" hidden type="button"></button>';B='<div class="tns-nav" aria-label="Carousel Pagination">'+B+"</div>",et.insertAdjacentHTML("afterbegin",B),xn=et.querySelector(".tns-nav"),gn=xn.children,qe()}if(F){var G=F.substring(0,F.length-18).toLowerCase(),k="transition: all "+Ct/1e3+"s";G&&(k="-"+G+"-"+k),l(Ot,"[aria-controls^="+Vt+"-item]",k,c(Ot))}g(gn[0],{tabindex:"0","aria-selected":"true"}),v(gn[0],Nn),D(xn,$t),bn||x(xn)}if(sn){var U=kn?"stop":"start";In?g(In,{"data-action":U}):t.autoplayButtonOutput&&(tt.insertAdjacentHTML("beforebegin",'<button data-action="'+U+'" type="button">'+Ln[0]+U+Ln[1]+Mn[0]+"</button>"),In=et.querySelector("[data-action]")),In&&D(In,{click:Ne}),kn?(Ee(),Wn&&D(nt,_t),zn&&D(nt,en)):In&&x(In)}rn&&(yn?(dn=yn.children[0],fn=yn.children[1],g(yn,{"aria-label":"Carousel Navigation",tabindex:"0"}),g(dn,{"data-controls":"prev"}),g(fn,{"data-controls":"next"}),g(yn.children,{"aria-controls":Vt,tabindex:"-1"})):(et.insertAdjacentHTML("afterbegin",'<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="'+Vt+'" type="button">'+mn[0]+'</button><button data-controls="next" tabindex="-1" aria-controls="'+Vt+'" type="button">'+mn[1]+"</button></div>"),yn=et.querySelector(".tns-controls"),dn=yn.children[0],fn=yn.children[1]),vn=oe(dn),hn=oe(fn),Dt||le(vn,dn,!0),D(yn,Zt),pn||x(yn)),Gn&&D(nt,nn),Vn&&D(nt,an),Et&&D(L,tn),"inner"===gt?Ft.on("outerResized",function(){M(),Ft.emit("innerLoaded",Ge())}):(D(z,{resize:P}),"outer"===gt&&Ft.on("innerLoaded",$)),Z(),$(),I(),S(),Ft.on("indexChanged",ee),"function"==typeof Gt&&Gt(Ge()),"inner"===gt&&Ft.emit("innerLoaded",Ge()),Yt&&H(!0)}();var Kn=function(){return Dt?function(){var e=Rt+yt,t=jt-yt;if(xt)e+=1,t-=1;else if(Tt){var n=bt?bt:0;ot%(Tt+n)>n&&(t-=1)}if(zt>t)for(;zt>=e+rt;)zt-=rt;else if(zt<e)for(;zt<=t-rt;)zt+=rt}:function(){zt=Math.max(Rt,Math.min(jt,zt))}}(),Qn=function(){return Ye?function(e,t){t||(t=de()),Wt&&zt===jt&&(t=-((Tt+bt)*Mt-$e)+"px"),F||!e?(fe(t),0===Ct&&ye()):k(nt,St,Ht,Lt,t,Ct,ye),_e||Re()}:function(){At=[];var e={};e[Y]=e[K]=ye,N(at[Bt],e),D(at[zt],e),ve(Bt,Ke,Qe,!0),ve(zt,Ze,Ke),Y&&K&&0!==Ct||setTimeout(ye,0)}}();return{getInfo:Ge,events:Ft,goTo:ge,destroy:function(){if(Ot.disabled=!0,Dt)for(var e=Pt;e--;)Ye&&at[0].remove(),at[at.length-1].remove();var n=["tns-item",un];Ye||(n=n.concat("tns-normal",Ke));for(var i=rt;i--;){var a=at[i];a.id.indexOf(Vt+"-item")>=0&&(a.id=""),n.forEach(function(e){h(a,e)})}if(b(at,["style","aria-hidden","tabindex"]),at=Vt=rt=Mt=Pt=null,pn&&(N(yn,Zt),t.controlsContainer&&(b(yn,["aria-label","tabindex"]),b(yn.children,["aria-controls","aria-disabled","tabindex"])),yn=dn=fn=null),bn&&(N(xn,$t),t.navContainer&&(b(xn,["aria-label"]),b(gn,["aria-selected","aria-controls","tabindex"])),xn=gn=null),kn&&(clearInterval(On),In&&N(In,{click:Ne}),N(nt,_t),N(nt,en),t.autoplayButton&&b(In,["data-action"])),nt.id=Ut||"",nt.className=nt.className.replace(Xt,""),nt.style="",Ye&&Y){var r={};r[Y]=ye,N(nt,r)}N(nt,nn),N(nt,an),it.insertBefore(nt,et),et.remove(),et=tt=nt=null,N(L,tn),N(z,{resize:P})}}}}}();
//# sourceMappingURL=../sourcemaps/tiny-slider.js.map
