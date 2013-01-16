AUI.add("aui-tree-node",function(ag){var V=ag.Lang,aJ=V.isString,aA=V.isBoolean,aS="alwaysShowHitArea",R="",t="boundingBox",g="children",aF="clearfix",y="collapsed",a="container",ae="content",w="contentBox",n="draggable",j="expanded",q="helper",Y="hidden",f="hitAreaEl",K="hitarea",W="icon",aR="iconEl",c="invalid",au="id",al="label",Z="labelEl",U="lastSelected",aE="leaf",r="node",an="over",ab="ownerTree",e="parentNode",ay="radio",aP="rendered",aD="selected",u=" ",h="tree",L="tree-node",aN=function(){return Array.prototype.slice.call(arguments).join(u);},aq=function(A){return(A instanceof ag.TreeNode);},aL=function(A){return(A instanceof ag.TreeView);},J=ag.getClassName,ai=J(q,aF),C=J(h,y),b=J(h,a),az=J(h,w),aT=J(h,j),v=J(h,Y),av=J(h,K),I=J(h,W),k=J(h,al),aB=J(h,r),H=J(h,r,ae),D=J(h,r,ae,c),aw=J(h,r,Y,K),i=J(h,r,aE),aI=J(h,r,an),M=J(h,r,aD),af='<div class="'+av+'"></div>',s='<div class="'+I+'"></div>',d='<div class="'+k+'"></div>',aQ="<ul></ul>",x='<li class="'+aB+'"></li>',ac='<div class="'+aN(ai,H)+'"></div>';var P=ag.Component.create({NAME:L,ATTRS:{boundingBox:{valueFn:function(){return ag.Node.create(x);}},contentBox:{valueFn:function(){return ag.Node.create(ac);}},draggable:{value:true,validator:aA},ownerTree:{value:null},label:{value:R,validator:aJ},expanded:{value:false,validator:aA},id:{validator:aJ,valueFn:function(){return ag.guid();}},leaf:{value:true,setter:function(A){if(A&&this.get(g).length){return false;}return A;},validator:aA},nextSibling:{getter:"_getSibling",value:null,validator:aq},prevSibling:{getter:"_getSibling",value:null,validator:aq},parentNode:{value:null,validator:function(A){return aq(A)||aL(A);}},labelEl:{setter:ag.one,valueFn:function(){var A=this.get(al);return ag.Node.create(d).html(A).unselectable();}},hitAreaEl:{setter:ag.one,valueFn:function(){return ag.Node.create(af);}},alwaysShowHitArea:{value:true,validator:aA},iconEl:{setter:ag.one,valueFn:function(){return ag.Node.create(s);}},tabIndex:{value:null},rendered:{validator:aA,value:false}},AUGMENTS:[ag.TreeData],EXTENDS:ag.Base,prototype:{BOUNDING_TEMPLATE:x,CONTENT_TEMPLATE:ac,initializer:function(){var A=this;var aW=A.get(t);aW.setData(L,A);A._syncTreeNodeBBId();A._uiSetDraggable(A.get(n));A._uiSetExpanded(A.get(j));A._uiSetLeaf(A.get(aE));},bindUI:function(){var A=this;A.after("childrenChange",ag.bind(A._afterSetChildren,A));A.after("draggableChange",ag.bind(A._afterDraggableChange,A));A.after("expandedChange",ag.bind(A._afterExpandedChange,A));A.after("idChange",A._afterSetId,A);A.after("leafChange",ag.bind(A._afterLeafChange,A));},render:function(aW){var A=this;if(!A.get(aP)){A.renderUI();A.bindUI();A.syncUI();A.set(aP,true);}if(aW){A.get(t).appendTo(aW);}},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncHitArea(A.get(g));},_afterDraggableChange:function(aW){var A=this;A._uiSetDraggable(aW.newVal);},_afterExpandedChange:function(aW){var A=this;A._uiSetExpanded(aW.newVal);},_afterLeafChange:function(aW){var A=this;A._uiSetLeaf(aW.newVal);},_afterSetChildren:function(aW){var A=this;A._syncHitArea(aW.newVal);},_renderContentBox:function(aY){var A=this;var aW=A.get(w);if(!A.isLeaf()){var aX=A.get(j);aW.addClass(aX?aT:C);if(aX){A.expand();}}return aW;},_renderBoundingBox:function(){var A=this;var aX=A.get(t);var aW=A.get(w);aW.append(A.get(aR));aW.append(A.get(Z));aX.append(aW);var aY=A.get(a);if(aY){if(!A.get(j)){aY.addClass(v);}aX.append(aY);}return aX;},_createNodeContainer:function(){var A=this;var aW=A.get(a)||ag.Node.create(aQ);aW.addClass(b);A.set(a,aW);return aW;},_syncHitArea:function(aW){var A=this;if(A.get(aS)||aW.length){A.showHitArea();}else{A.hideHitArea();A.collapse();}},appendChild:function(){var A=this;if(!A.isLeaf()){ag.TreeNode.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;A.set(j,false);},collapseAll:function(){var A=this;ag.TreeNode.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(A){return A.isAncestor(this);},expand:function(){var A=this;A.set(j,true);},expandAll:function(){var A=this;ag.TreeNode.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var aW=this;var aX=0;var A=aW.get(e);while(A){++aX;A=A.get(e);}return aX;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&ag.TreeNode.superclass.hasChildNodes.apply(this,arguments));},isSelected:function(){return this.get(w).hasClass(M);},isLeaf:function(){var A=this;return A.get(aE);},isAncestor:function(aX){var aW=this;var A=aW.get(e);while(A){if(A===aX){return true;}A=A.get(e);}return false;},toggle:function(){var A=this;if(A.get(j)){A.collapse();}else{A.expand();}},select:function(){var A=this;var aW=A.get(ab);if(aW){aW.set(U,A);}A.get(w).addClass(M);A.fire("select");},unselect:function(){var A=this;A.get(w).removeClass(M);A.fire("unselect");},over:function(){this.get(w).addClass(aI);},out:function(){this.get(w).removeClass(aI);},showHitArea:function(){var A=this;var aW=A.get(f);aW.removeClass(aw);},hideHitArea:function(){var A=this;var aW=A.get(f);aW.addClass(aw);},_syncTreeNodeBBId:function(aW){var A=this;A.get(t).attr(au,A.get(au));},_getSibling:function(aZ,aW){var A=this;var aY="_"+aW;var aX=A[aY];if(aX!==null&&!aq(aX)){aX=null;A[aY]=aX;}return aX;},_uiSetDraggable:function(aX){var A=this;var aW=A.get(w);aW.toggleClass(D,!aX);},_uiSetExpanded:function(aY){var A=this;if(!A.isLeaf()){var aX=A.get(a);var aW=A.get(w);if(aY){aW.replaceClass(C,aT);if(aX){aX.removeClass(v);}}else{aW.replaceClass(aT,C);if(aX){aX.addClass(v);}}}},_uiSetLeaf:function(aX){var A=this;var aW=A.get(w);if(aX){A.get(a).remove();A.get(f).remove();}else{aW.prepend(A.get(f));A._createNodeContainer();A._uiSetExpanded(A.get(j));}aW.toggleClass(i,aX);}}});ag.TreeNode=P;var ax=V.isFunction,aK="cache",am="io",aO="loaded",aU="loading",ak="paginator",at="tree-node-io",B=J(h,r,am,aU);var O=ag.Component.create({NAME:at,ATTRS:{loading:{value:false,validator:aA},loaded:{value:false,validator:aA},cache:{value:true,validator:aA},leaf:{value:false,validator:aA}},AUGMENTS:[ag.TreeViewPaginator,ag.TreeViewIO],EXTENDS:ag.TreeNode,prototype:{bindUI:function(){var A=this;
ag.TreeNodeIO.superclass.bindUI.apply(this,arguments);A.on("ioRequestSuccess",A._onIOSuccess,A);},syncUI:function(){var A=this;ag.TreeNodeIO.superclass.syncUI.apply(this,arguments);},createNodes:function(aW){var A=this;ag.Array.each(ag.Array(aW),function(aY){var aX=A.createNode(aY);A.appendChild(aX);});A._syncPaginatorUI(aW);},expand:function(){var A=this;var aW=A.get(aK);var aZ=A.get(am);var aX=A.get(aO);var aY=A.get(aU);if(!aW){A.set(aO,false);}if(aZ&&!aX&&!aY&&!this.hasChildNodes()){if(!aW){A.empty();}A.initIO();}else{ag.TreeNodeIO.superclass.expand.apply(this,arguments);}},_inheritOwnerTreeAttrs:function(){var aW=this;var aX=aW.get(ab);if(aX){if(!aW.get(am)){aW.set(am,ag.clone(aX.get(am)));}if(!aW.get(ak)){var A=aX.get(ak);if(A&&A.element){A.element=A.element.clone();}aW.set(ak,A);}}},_onIOSuccess:function(aW){var A=this;A.expand();}}});ag.TreeNodeIO=O;var l="checkbox",p="checked",ad="checkContainerEl",aG="checkEl",Q="checkName",aa=".",m="name",E="tree-node-check",aj=J(h,r,l),ap=J(h,r,l,a),ar=J(h,r,p),T='<div class="'+ap+'"></div>',ao='<input class="'+aj+'" type="checkbox" />';var aC=ag.Component.create({NAME:E,ATTRS:{checked:{value:false,validator:aA},checkName:{value:E,validator:aJ},checkContainerEl:{setter:ag.one,valueFn:function(){return ag.Node.create(T);}},checkEl:{setter:ag.one,valueFn:function(){var A=this.get(Q);return ag.Node.create(ao).attr(m,A);}}},EXTENDS:ag.TreeNodeIO,prototype:{initializer:function(){var A=this;A._uiSetChecked(A.get(p));},renderUI:function(){var aW=this;ag.TreeNodeCheck.superclass.renderUI.apply(aW,arguments);var aX=aW.get(Z);var A=aW.get(aG);var aY=aW.get(ad);A.hide();aY.append(A);aX.placeBefore(aY);if(aW.isChecked()){aW.check();}},bindUI:function(){var A=this;var aW=A.get(w);var aX=A.get(Z);ag.TreeNodeCheck.superclass.bindUI.apply(A,arguments);A.after("checkedChange",ag.bind(A._afterCheckedChange,A));aW.delegate("click",ag.bind(A.toggleCheck,A),aa+ap);aW.delegate("click",ag.bind(A.toggleCheck,A),aa+k);aX.swallowEvent("dblclick");},check:function(aW){var A=this;A.set(p,true,{originalTarget:aW});},uncheck:function(aW){var A=this;A.set(p,false,{originalTarget:aW});},toggleCheck:function(){var aW=this;var A=aW.get(aG);var aX=A.attr(p);if(!aX){aW.check();}else{aW.uncheck();}},isChecked:function(){var A=this;return A.get(p);},_afterCheckedChange:function(aW){var A=this;A._uiSetChecked(aW.newVal);},_uiSetChecked:function(aW){var A=this;if(aW){A.get(w).addClass(ar);A.get(aG).attr(p,p);}else{A.get(w).removeClass(ar);A.get(aG).attr(p,R);}}}});ag.TreeNodeCheck=aC;var F="child",S="tree-node-task",N="unchecked",aH=function(A){return A instanceof ag.TreeNodeCheck;},ah=J(h,r,F,N);var aV=ag.Component.create({NAME:S,EXTENDS:ag.TreeNodeCheck,prototype:{check:function(aX){var A=this;var aW=A.get(w);aX=aX||A;if(!A.isLeaf()){A.eachChildren(function(aY){if(aH(aY)){aY.check(aX);}});}A.eachParent(function(aY){if(aH(aY)&&!aY.isChecked()){aY.get(w).addClass(ah);}});aW.removeClass(ah);ag.TreeNodeTask.superclass.check.call(this,aX);},uncheck:function(aX){var A=this;var aW=A.get(w);aX=aX||A;if(!A.isLeaf()){A.eachChildren(function(aY){if(aY instanceof ag.TreeNodeCheck){aY.uncheck(aX);}});}A.eachParent(function(aY){if(aH(aY)&&!aY.isChecked()){aY.get(w).removeClass(ah);}});aW.removeClass(ah);ag.TreeNodeTask.superclass.uncheck.call(this,aX);}}});ag.TreeNodeTask=aV;var G="tree-node-radio",o=function(A){return A instanceof ag.TreeNodeRadio;},z=J(h,r,ay),X=J(h,r,ay,p);var aM=ag.Component.create({NAME:G,EXTENDS:ag.TreeNodeTask,prototype:{renderUI:function(){var A=this;ag.TreeNodeRadio.superclass.renderUI.apply(A,arguments);A.get(w).addClass(z);},check:function(){var A=this;A._uncheckNodesRadio();ag.TreeNodeRadio.superclass.check.apply(this,arguments);},_uiSetChecked:function(aW){var A=this;if(aW){A.get(w).addClass(X);A.get(aG).attr(p,p);}else{A.get(w).removeClass(X);A.get(aG).attr(p,R);}},_uncheckNodesRadio:function(aY){var A=this;var aX;if(aY){aX=aY.get(g);}else{var aW=A.get(ab);if(aW){aX=aW.get(g);}else{return;}}ag.Array.each(aX,function(a0,aZ,a1){if(!a0.isLeaf()){A._uncheckNodesRadio(a0);}if(o(a0)){a0.uncheck();}});}}});ag.TreeNodeRadio=aM;ag.TreeNode.nodeTypes={radio:ag.TreeNodeRadio,task:ag.TreeNodeTask,check:ag.TreeNodeCheck,node:ag.TreeNode,io:ag.TreeNodeIO};},"@VERSION@",{skinnable:false,requires:["aui-tree-data","aui-tree-io","aui-tree-paginator","json","querystring-stringify"]});