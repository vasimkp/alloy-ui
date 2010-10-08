var GLOBAL_ENV=YUI.Env;if(!GLOBAL_ENV._ready){GLOBAL_ENV._ready=function(){GLOBAL_ENV.DOMReady=true;GLOBAL_ENV.remove(YUI.config.doc,"DOMContentLoaded",GLOBAL_ENV._ready);};GLOBAL_ENV.add(YUI.config.doc,"DOMContentLoaded",GLOBAL_ENV._ready);}YUI.add("event-base",function(E){E.publish("domready",{fireOnce:true,async:true});if(GLOBAL_ENV.DOMReady){E.fire("domready");}else{E.Do.before(function(){E.fire("domready");},YUI.Env,"_ready");}var B=E.UA,D={},A={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9,63272:46,63273:36,63275:35},C=function(H){if(!H){return H;}try{if(H&&3==H.nodeType){H=H.parentNode;}}catch(G){return null;}return E.one(H);},F=function(G,H,I){this._event=G;this._currentTarget=H;this._wrapper=I||D;this.init();};E.extend(F,Object,{init:function(){var I=this._event,J=this._wrapper.overrides,G=I.pageX,L=I.pageY,K,H=this._currentTarget;this.altKey=I.altKey;this.ctrlKey=I.ctrlKey;this.metaKey=I.metaKey;this.shiftKey=I.shiftKey;this.type=(J&&J.type)||I.type;this.clientX=I.clientX;this.clientY=I.clientY;this.pageX=G;this.pageY=L;K=I.keyCode||I.charCode||0;if(B.webkit&&(K in A)){K=A[K];}this.keyCode=K;this.charCode=K;this.button=I.which||I.button;this.which=this.button;this.target=C(I.target);this.currentTarget=C(H);this.relatedTarget=C(I.relatedTarget);if(I.type=="mousewheel"||I.type=="DOMMouseScroll"){this.wheelDelta=(I.detail)?(I.detail*-1):Math.round(I.wheelDelta/80)||((I.wheelDelta<0)?-1:1);}if(this._touch){this._touch(I,H,this._wrapper);}},stopPropagation:function(){this._event.stopPropagation();this._wrapper.stopped=1;this.stopped=1;},stopImmediatePropagation:function(){var G=this._event;if(G.stopImmediatePropagation){G.stopImmediatePropagation();}else{this.stopPropagation();}this._wrapper.stopped=2;this.stopped=2;},preventDefault:function(G){var H=this._event;H.preventDefault();H.returnValue=G||false;this._wrapper.prevented=1;this.prevented=1;},halt:function(G){if(G){this.stopImmediatePropagation();}else{this.stopPropagation();}this.preventDefault();}});F.resolve=C;E.DOM2EventFacade=F;E.DOMEventFacade=F;(function(){E.Env.evt.dom_wrappers={};E.Env.evt.dom_map={};var O=E.Env.evt,H=E.config,L=H.win,Q=YUI.Env.add,J=YUI.Env.remove,N=function(){YUI.Env.windowLoaded=true;E.Event._load();J(L,"load",N);},G=function(){E.Event._unload();},I="domready",K="~yui|2|compat~",M=function(S){try{return(S&&typeof S!=="string"&&E.Lang.isNumber(S.length)&&!S.tagName&&!S.alert);}catch(R){return false;}},P=function(){var T=false,U=0,S=[],V=O.dom_wrappers,R=null,W=O.dom_map;return{POLL_RETRYS:1000,POLL_INTERVAL:40,lastError:null,_interval:null,_dri:null,DOMReady:false,startInterval:function(){if(!P._interval){P._interval=setInterval(P._poll,P.POLL_INTERVAL);}},onAvailable:function(X,c,g,Y,d,f){var e=E.Array(X),Z,b;for(Z=0;Z<e.length;Z=Z+1){S.push({id:e[Z],fn:c,obj:g,override:Y,checkReady:d,compat:f});}U=this.POLL_RETRYS;setTimeout(P._poll,0);b=new E.EventHandle({_delete:function(){if(b.handle){b.handle.detach();return;}var h,a;for(h=0;h<e.length;h++){for(a=0;a<S.length;a++){if(e[h]===S[a].id){S.splice(a,1);}}}}});return b;},onContentReady:function(b,Z,a,Y,X){return P.onAvailable(b,Z,a,Y,true,X);},attach:function(a,Z,Y,X){return P._attach(E.Array(arguments,0,true));},_createWrapper:function(d,c,X,Y,b){var a,e=E.stamp(d),Z="event:"+e+c;if(false===b){Z+="native";}if(X){Z+="capture";}a=V[Z];if(!a){a=E.publish(Z,{silent:true,bubbles:false,contextFn:function(){if(Y){return a.el;}else{a.nodeRef=a.nodeRef||E.one(a.el);return a.nodeRef;}}});a.overrides={};a.el=d;a.key=Z;a.domkey=e;a.type=c;a.fn=function(f){a.fire(P.getEvent(f,d,(Y||(false===b))));};a.capture=X;if(d==L&&c=="load"){a.fireOnce=true;R=Z;}V[Z]=a;W[e]=W[e]||{};W[e][Z]=a;Q(d,c,a.fn,X);}return a;},_attach:function(d,c){var i,k,a,h,X,Z=false,b,e=d[0],f=d[1],Y=d[2]||L,l=c&&c.facade,j=c&&c.capture,g=c&&c.overrides;if(d[d.length-1]===K){i=true;}if(!f||!f.call){return false;}if(M(Y)){k=[];E.each(Y,function(n,m){d[2]=n;k.push(P._attach(d,c));});return new E.EventHandle(k);}else{if(E.Lang.isString(Y)){if(i){a=E.DOM.byId(Y);}else{a=E.Selector.query(Y);switch(a.length){case 0:a=null;break;case 1:a=a[0];break;default:d[2]=a;return P._attach(d,c);}}if(a){Y=a;}else{b=P.onAvailable(Y,function(){b.handle=P._attach(d,c);},P,true,false,i);return b;}}}if(!Y){return false;}if(E.Node&&E.instanceOf(Y,E.Node)){Y=E.Node.getDOMNode(Y);}h=P._createWrapper(Y,e,j,i,l);if(g){E.mix(h.overrides,g);}if(Y==L&&e=="load"){if(YUI.Env.windowLoaded){Z=true;}}if(i){d.pop();}X=d[3];b=h._on(f,X,(d.length>4)?d.slice(4):null);if(Z){h.fire();}return b;},detach:function(e,f,Z,c){var d=E.Array(arguments,0,true),h,a,g,b,X,Y;if(d[d.length-1]===K){h=true;}if(e&&e.detach){return e.detach();}if(typeof Z=="string"){if(h){Z=E.DOM.byId(Z);}else{Z=E.Selector.query(Z);a=Z.length;if(a<1){Z=null;}else{if(a==1){Z=Z[0];}}}}if(!Z){return false;}if(Z.detach){d.splice(2,1);return Z.detach.apply(Z,d);}else{if(M(Z)){g=true;for(b=0,a=Z.length;b<a;++b){d[2]=Z[b];g=(E.Event.detach.apply(E.Event,d)&&g);}return g;}}if(!e||!f||!f.call){return P.purgeElement(Z,false,e);}X="event:"+E.stamp(Z)+e;Y=V[X];if(Y){return Y.detach(f);}else{return false;}},getEvent:function(a,Y,X){var Z=a||L.event;return(X)?Z:new E.DOMEventFacade(Z,Y,V["event:"+E.stamp(Y)+a.type]);},generateId:function(X){var Y=X.id;if(!Y){Y=E.stamp(X);X.id=Y;}return Y;},_isValidCollection:M,_load:function(X){if(!T){T=true;if(E.fire){E.fire(I);}P._poll();}},_poll:function(){if(P.locked){return;}if(E.UA.ie&&!YUI.Env.DOMReady){P.startInterval();return;}P.locked=true;var Y,X,c,Z,b,d,a=!T;if(!a){a=(U>0);}b=[];d=function(g,h){var f,e=h.override;if(h.compat){if(h.override){if(e===true){f=h.obj;}else{f=e;}}else{f=g;}h.fn.call(f,h.obj);}else{f=h.obj||E.one(g);h.fn.apply(f,(E.Lang.isArray(e))?e:[]);}};for(Y=0,X=S.length;Y<X;++Y){c=S[Y];if(c&&!c.checkReady){Z=(c.compat)?E.DOM.byId(c.id):E.Selector.query(c.id,null,true);if(Z){d(Z,c);S[Y]=null;}else{b.push(c);}}}for(Y=0,X=S.length;Y<X;++Y){c=S[Y];if(c&&c.checkReady){Z=(c.compat)?E.DOM.byId(c.id):E.Selector.query(c.id,null,true);
if(Z){if(T||(Z.get&&Z.get("nextSibling"))||Z.nextSibling){d(Z,c);S[Y]=null;}}else{b.push(c);}}}U=(b.length===0)?0:U-1;if(a){P.startInterval();}else{clearInterval(P._interval);P._interval=null;}P.locked=false;return;},purgeElement:function(a,X,e){var c=(E.Lang.isString(a))?E.Selector.query(a,null,true):a,g=P.getListeners(c,e),b,d,f,Z,Y;if(X&&c){g=g||[];Z=E.Selector.query("*",c);b=0;d=Z.length;for(;b<d;++b){Y=P.getListeners(Z[b],e);if(Y){g=g.concat(Y);}}}if(g){b=0;d=g.length;for(;b<d;++b){f=g[b];f.detachAll();J(f.el,f.type,f.fn,f.capture);delete V[f.key];delete W[f.domkey][f.key];}}},getListeners:function(b,a){var c=E.stamp(b,true),X=W[c],Z=[],Y=(a)?"event:"+c+a:null,d=O.plugins;if(!X){return null;}if(Y){if(d[a]&&d[a].eventDef){Y+="_synth";}if(X[Y]){Z.push(X[Y]);}Y+="native";if(X[Y]){Z.push(X[Y]);}}else{E.each(X,function(f,e){Z.push(f);});}return(Z.length)?Z:null;},_unload:function(X){E.each(V,function(Z,Y){Z.detachAll();J(Z.el,Z.type,Z.fn,Z.capture);delete V[Y];delete W[Z.domkey][Y];});J(L,"unload",G);},nativeAdd:Q,nativeRemove:J};}();E.Event=P;if(H.injected||YUI.Env.windowLoaded){N();}else{Q(L,"load",N);}if(E.UA.ie){E.on(I,P._poll);}Q(L,"unload",G);P.Custom=E.CustomEvent;P.Subscriber=E.Subscriber;P.Target=E.EventTarget;P.Handle=E.EventHandle;P.Facade=E.EventFacade;P._poll();})();E.Env.evt.plugins.available={on:function(I,H,K,J){var G=arguments.length>4?E.Array(arguments,4,true):null;return E.Event.onAvailable.call(E.Event,K,H,J,G);}};E.Env.evt.plugins.contentready={on:function(I,H,K,J){var G=arguments.length>4?E.Array(arguments,4,true):null;return E.Event.onContentReady.call(E.Event,K,H,J,G);}};},"@VERSION@",{requires:["event-custom-base"]});YUI.add("event-delegate",function(G){var D=G.Array,B=G.Lang,A=B.isString,F=G.Selector.test,C=G.Env.evt.handles;function E(Q,S,J,I){var O=D(arguments,0,true),P=A(J)?J:null,N=Q.split(/\|/),L,H,K,R,M;if(N.length>1){R=N.shift();Q=N.shift();}L=G.Node.DOM_EVENTS[Q];if(B.isObject(L)&&L.delegate){M=L.delegate.apply(L,arguments);}if(!M){if(!Q||!S||!J||!I){return;}H=(P)?G.Selector.query(P,null,true):J;if(!H&&A(J)){M=G.on("available",function(){G.mix(M,G.delegate.apply(G,O),true);},J);}if(!M&&H){O.splice(2,2,H);M=G.Event._attach(O,{facade:false});M.sub.filter=I;M.sub._notify=E.notifySub;}}if(M&&R){K=C[R]||(C[R]={});K=K[Q]||(K[Q]=[]);K.push(M);}return M;}E.notifySub=function(O,J,N){J=J.slice();if(this.args){J.push.apply(J,this.args);}var M=E._applyFilter(this.filter,J,N),L,K,H,I;if(M){M=D(M);L=J[0]=new G.DOMEventFacade(J[0],N.el,N);L.container=G.one(N.el);for(K=0,H=M.length;K<H&&!L.stopped;++K){L.currentTarget=G.one(M[K]);I=this.fn.apply(this.context||L.currentTarget,J);if(I===false){break;}}return I;}};E.compileFilter=G.cached(function(H){return function(J,I){return F(J._node,H,I.currentTarget._node);};});E._applyFilter=function(K,J,N){var M=J[0],H=N.el,L=M.target||M.srcElement,I=[];if(L.nodeType===3){L=L.parentNode;}J.unshift(L);if(A(K)){while(L&&L!==H){if(F(L,K,H)){I.push(L);}L=L.parentNode;}}else{J[0]=G.one(L);J[1]=new G.DOMEventFacade(M,H,N);while(L&&L!==H){if(K.apply(J[0],J)){I.push(L);}L=L.parentNode;J[0]=G.one(L);}J[1]=M;}if(I.length<=1){I=I[0];}J.shift();return I;};G.delegate=G.Event.delegate=E;},"@VERSION@",{requires:["node-base"]});YUI.add("event-synthetic",function(B){var H=B.Env.evt.dom_map,D=B.Array,G=B.Lang,J=G.isObject,C=G.isString,E=B.Selector.query,I=function(){};function F(L,K){this.handle=L;this.emitFacade=K;}F.prototype.fire=function(Q){var K=D(arguments,0,true),O=this.handle,P=O.evt,M=O.sub,R=M.context,L=M.filter,N=Q||{};if(this.emitFacade){if(!Q||!Q.preventDefault){N=P._getFacade();if(J(Q)&&!Q.preventDefault){B.mix(N,Q,true);K[0]=N;}else{K.unshift(N);}}N.type=P.type;N.details=K.slice();if(L){N.container=P.host;}}else{if(L&&J(Q)&&Q.currentTarget){K.shift();}}M.context=R||N.currentTarget||P.host;P.fire.apply(P,K);M.context=R;};function A(){this._init.apply(this,arguments);}B.mix(A,{Notifier:F,getRegistry:function(Q,P,N){var O=Q._node,M=B.stamp(O),L="event:"+M+P+"_synth",K=H[M]||(H[M]={});if(!K[L]&&N){K[L]={type:"_synth",fn:I,capture:false,el:O,key:L,domkey:M,notifiers:[],detachAll:function(){var R=this.notifiers,S=R.length;while(--S>=0){R[S].detach();}}};}return(K[L])?K[L].notifiers:null;},_deleteSub:function(L){if(L&&L.fn){var K=this.eventDef,M=(L.filter)?"detachDelegate":"detach";this.subscribers={};this.subCount=0;K[M](L.node,L,this.notifier,L.filter);K._unregisterSub(L);delete L.fn;delete L.node;delete L.context;}},prototype:{constructor:A,_init:function(){var K=this.publishConfig||(this.publishConfig={});this.emitFacade=("emitFacade" in K)?K.emitFacade:true;K.emitFacade=false;},processArgs:I,on:I,detach:I,delegate:I,detachDelegate:I,_on:function(M,O){var N=[],K=M[2],Q=O?"delegate":"on",L,P;L=(C(K))?E(K):D(K);if(!L.length&&C(K)){P=B.on("available",function(){B.mix(P,B[Q].apply(B,M),true);},K);return P;}B.each(L,function(T){var U=M.slice(),R,S;T=B.one(T);if(T){R=this.processArgs(U,O);if(O){S=U.splice(3,1)[0];}U.splice(0,4,U[1],U[3]);if(!this.preventDups||!this.getSubs(T,M,null,true)){P=this._getNotifier(T,U,R,S);this[Q](T,P.sub,P.notifier,S);N.push(P);}}},this);return(N.length===1)?N[0]:new B.EventHandle(N);},_getNotifier:function(N,Q,O,M){var S=new B.CustomEvent(this.type,this.publishConfig),P=S.on.apply(S,Q),R=new F(P,this.emitFacade),L=A.getRegistry(N,this.type,true),K=P.sub;P.notifier=R;K.node=N;K.filter=M;K._extra=O;B.mix(S,{eventDef:this,notifier:R,host:N,currentTarget:N,target:N,el:N._node,_delete:A._deleteSub},true);L.push(P);return P;},_unregisterSub:function(M){var K=A.getRegistry(M.node,this.type),L;if(K){for(L=K.length-1;L>=0;--L){if(K[L].sub===M){K.splice(L,1);break;}}}},_detach:function(M){var R=M[2],P=(C(R))?E(R):D(R),Q,O,K,N,L;M.splice(2,1);for(O=0,K=P.length;O<K;++O){Q=B.one(P[O]);if(Q){N=this.getSubs(Q,M);if(N){for(L=N.length-1;L>=0;--L){N[L].detach();}}}}},getSubs:function(L,Q,K,N){var R=A.getRegistry(L,this.type),S=[],M,P,O;if(R){if(!K){K=this.subMatch;}for(M=0,P=R.length;M<P;++M){O=R[M];if(K.call(this,O.sub,Q)){if(N){return O;
}else{S.push(R[M]);}}}}return S.length&&S;},subMatch:function(L,K){return !K[1]||L.fn===K[1];}}},true);B.SyntheticEvent=A;B.Event.define=function(M,L,O){if(!L){L={};}var N=(J(M))?M:B.merge({type:M},L),P,K;if(O||!B.Node.DOM_EVENTS[N.type]){P=function(){A.apply(this,arguments);};B.extend(P,A,N);K=new P();M=K.type;B.Node.DOM_EVENTS[M]=B.Env.evt.plugins[M]={eventDef:K,on:function(){return K._on(D(arguments));},delegate:function(){return K._on(D(arguments),true);},detach:function(){return K._detach(D(arguments));}};}return K;};},"@VERSION@",{requires:["node-base","event-custom"]});YUI.add("event-mousewheel",function(C){var B="DOMMouseScroll",A=function(E){var D=C.Array(E,0,true),F;if(C.UA.gecko){D[0]=B;F=C.config.win;}else{F=C.config.doc;}if(D.length<3){D[2]=F;}else{D.splice(2,0,F);}return D;};C.Env.evt.plugins.mousewheel={on:function(){return C.Event._attach(A(arguments));},detach:function(){return C.Event.detach.apply(C.Event,A(arguments));}};},"@VERSION@",{requires:["node-base"]});YUI.add("event-mouseenter",function(C){function B(G,D){var F=G.currentTarget,E=G.relatedTarget;if(F!==E&&!F.contains(E)){D.fire(G);}}var A={proxyType:"mouseover",on:function(F,D,E){D.onHandle=F.on(this.proxyType,B,null,E);},detach:function(E,D){D.onHandle.detach();},delegate:function(G,E,F,D){E.delegateHandle=C.delegate(this.proxyType,B,G,D,null,F);},detachDelegate:function(E,D){D.delegateHandle.detach();}};C.Event.define("mouseenter",A,true);C.Event.define("mouseleave",C.merge(A,{proxyType:"mouseout"}),true);},"@VERSION@",{requires:["event-synthetic"]});YUI.add("event-key",function(A){A.Env.evt.plugins.key={on:function(E,G,B,K,C){var I=A.Array(arguments,0,true),F,J,H,D;F=K&&K.split(":");if(!K||K.indexOf(":")==-1||!F[1]){I[0]="key"+((F&&F[0])||"press");return A.on.apply(A,I);}J=F[0];H=(F[1])?F[1].split(/,|\+/):null;D=(A.Lang.isString(B)?B:A.stamp(B))+K;D=D.replace(/,/g,"_");if(!A.getEvent(D)){A.on(E+J,function(P){var Q=false,M=false,N,L,O;for(N=0;N<H.length;N=N+1){L=H[N];O=parseInt(L,10);if(A.Lang.isNumber(O)){if(P.charCode===O){Q=true;}else{M=true;}}else{if(Q||!M){Q=(P[L+"Key"]);M=!Q;}}}if(Q){A.fire(D,P);}},B);}I.splice(2,2);I[0]=D;return A.on.apply(A,I);}};},"@VERSION@",{requires:["node-base"]});YUI.add("event-focus",function(E){var D=E.Event,C=E.Lang,A=C.isString,B=C.isFunction(E.DOM.create('<p onbeforeactivate=";"/>').onbeforeactivate);function F(H,G,J){var I="_"+H+"Notifiers";E.Event.define(H,{_attach:function(L,M,K){if(E.DOM.isWindow(L)){return D._attach([H,function(N){M.fire(N);},L]);}else{return D._attach([G,this._proxy,L,this,M,K],{capture:true});}},_proxy:function(O,S,P){var M=O.target,Q=M.getData(I),T=E.stamp(O.currentTarget._node),K=(B||O.target!==O.currentTarget),L=S.handle.sub,R=[M,O].concat(L.args||[]),N;S.currentTarget=(P)?M:O.currentTarget;S.container=(P)?O.currentTarget:null;if(!L.filter||L.filter.apply(M,R)){if(!Q){Q={};M.setData(I,Q);if(K){N=D._attach([J,this._notify,M._node]).sub;N.once=true;}}if(!Q[T]){Q[T]=[];}Q[T].push(S);if(!K){this._notify(O);}}},_notify:function(P,L){var M=P.currentTarget,R=M.getData(I),S=M.get("ownerDocument")||M,Q=M,K=[],T,N,O;if(R){while(Q&&Q!==S){K.push.apply(K,R[E.stamp(Q)]||[]);Q=Q.get("parentNode");}K.push.apply(K,R[E.stamp(S)]||[]);for(N=0,O=K.length;N<O;++N){T=K[N];P.currentTarget=K[N].currentTarget;if(T.container){P.container=T.container;}else{delete P.container;}T.fire(P);}M.clearData(I);}},on:function(M,K,L){K.onHandle=this._attach(M._node,L);},detach:function(L,K){K.onHandle.detach();},delegate:function(N,L,M,K){if(A(K)){L.filter=E.delegate.compileFilter(K);}L.delegateHandle=this._attach(N._node,M,true);},detachDelegate:function(L,K){K.delegateHandle.detach();}},true);}if(B){F("focus","beforeactivate","focusin");F("blur","beforedeactivate","focusout");}else{F("focus","focus","focus");F("blur","blur","blur");}},"@VERSION@",{requires:["event-synthetic"]});YUI.add("event-resize",function(A){(function(){var C,B,E="window:resize",D=function(F){if(A.UA.gecko){A.fire(E,F);}else{if(B){B.cancel();}B=A.later(A.config.windowResizeDelay||40,A,function(){A.fire(E,F);});}};A.Env.evt.plugins.windowresize={on:function(H,G){if(!C){C=A.Event._attach(["resize",D]);}var F=A.Array(arguments,0,true);F[0]=E;return A.on.apply(A,F);}};})();},"@VERSION@",{requires:["node-base"]});YUI.add("event",function(A){},"@VERSION@",{use:["event-base","event-delegate","event-synthetic","event-mousewheel","event-mouseenter","event-key","event-focus","event-resize"]});