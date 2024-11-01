


class drawProjectList_ADMIN {
    constructor(parent, name = "", drawNew = true){
      this.id = "ProjectList" + name + "_";
      this.parent = parent;
      this.drawNew = drawNew;
      this.getOriginal = false;
      this.getAll = true;
      this.activeCategory = null;
      window.onhashchange = this.#chooseType.bind(this);
      this.#chooseType();
    }
    async #chooseType(){
      let data = await ProjectHelper.getAllAdmin(this.getOriginal);
      switch(SPLINT.Tools.Location_old.getHashes()){
        case "public" : this.draw(data, true); break;
        case "private" : this.draw(ProjectHelper.getAll(), false); break;
        default : this.draw(data, true); break;
      }
    }
    draw(data, isAdmin = false){
      this.drawCategoryMenu();
      if(!this.getOriginal && !this.getAll){
        for(const index in data){
          let ele = data[index]
          if(ele.Original == "true"){
            data.splice(index, 1);
          }
        }
      }
      if(document.getElementById("Table_Projects_main") != null){
        document.getElementById("Table_Projects_main").remove();
      }
        this.table = new SPLINT.DOMElement.Table(this.parent, "Projects", data);
        this.mainElement = this.table.mainElement;
          if(this.drawNew){
            this.table.func_drawFirstListElement = function(listElement){
              let button_new = new SPLINT.DOMElement.Button(listElement, "addProject", "vorlage erstellen");
                  // button_new.bindIcon("add");
                  button_new.onclick = async function(){
                    let ele = new SPLINT.DOMElement.popupWindow("newExample", true);
                        let products = await productHelper.getProducts();
                            let value = null;
                            let radio = new SPLINT.DOMElement.Button.Radio(ele.content, "radioProducts");
                                radio.Class("radioProducts");
                                for(const product of Object.entries(products)){
                                    radio.dataObj.add(product[0], product[1].viewName, product[0]);
                                }
                                radio.preventLines = true;
                                radio.drawRadio();
                                radio.onChange = function(e){
                                    value = e.target.value;
                                }

                            let btSubmit = new SPLINT.DOMElement.Button(ele.content, "btSumbit", "auswählen");
                                btSubmit.Class("BTsubmit");
                                btSubmit.onclick = async function(){
                                    await SPLINT.SessionsPHP.set("USER_ID", "ADMIN", false);
                                    await SPLINT.SessionsPHP.set("USER_NAME", "ADMIN", false);
                                    await SPLINT.SessionsPHP.set("ADMIN", true, false);
                                    // await SPLINT.SessionsPHP.set("GUEST", false, false);
                                    ProjectHelper.new('ADMIN', value, true, false).then(function(){
                                        SPLINT.Tools.Location.Direct(PATH.location.converter + "#ADMIN");
                                      }   
                                    )           
                                }
                  };
              let button_new_original = new SPLINT.DOMElement.Button(listElement, "addProject_original", "orginal erstellen");
                  button_new_original.onclick = async function(){
                        let ele = new SPLINT.DOMElement.popupWindow("newOriginal", true);
                            let products = await productHelper.getProducts();
                                let value = null;
                                let radio = new SPLINT.DOMElement.Button.Radio(ele.content, "radioProducts");
                                    radio.Class("radioProducts");
                                    for(const product of Object.entries(products)){
                                        radio.dataObj.add(product[0], product[1].viewName, product[0]);
                                    }
                                    radio.preventLines = true;
                                    radio.drawRadio();
                                    radio.onChange = function(e){
                                        value = e.target.value;
                                    }

                                let btSubmit = new SPLINT.DOMElement.Button(ele.content, "btSumbit", "auswählen");
                                    btSubmit.Class("BTsubmit");
                                    btSubmit.onclick = async function(){
                                        await SPLINT.SessionsPHP.set("USER_ID", "ADMIN", false);
                                        await SPLINT.SessionsPHP.set("USER_NAME", "ADMIN", false);
                                        await SPLINT.SessionsPHP.set("ADMIN", true, false);
                                        // await SPLINT.SessionsPHP.set("GUEST", false, false);
                                        ProjectHelper.new('ADMIN', value, true, true).then(function(){
                                            SPLINT.Tools.Location.Direct(PATH.location.converter + "#ADMIN");
                                          }   
                                        )           
                                    }
                    };
                let typeSwitchButton = new SPLINT.DOMElement.Button.Radio(listElement, "typeSwitch");
                    typeSwitchButton.Class("typeSwitchButton");
                    typeSwitchButton.dataObj.add("original", "Originale");
                    typeSwitchButton.dataObj.add("example", "Vorlagen");
                    typeSwitchButton.dataObj.add("all", "alle");
                    typeSwitchButton.preventLines = true;
                    typeSwitchButton.drawRadio();
                    if(this.getAll){
                      typeSwitchButton.setValue('all')
                    } else if(this.getOriginal){
                      typeSwitchButton.setValue('original')
                    } else {
                      typeSwitchButton.setValue('example')
                    }
                    typeSwitchButton.onChange = function(e){
                      if(e.target.value == 'original'){
                        this.drawNew = true;
                        this.getOriginal = true;
                        this.getAll = false;
                        this.#chooseType();
                      } else if(e.target.value == 'example'){
                        this.drawNew = true;
                        this.getOriginal = false;
                        this.getAll = false;
                        this.#chooseType();
                      } else {
                        this.drawNew = true;
                        this.getOriginal = false;
                        this.getAll = true;
                        this.#chooseType();
                      }
                    }.bind(this)
                
                let bt_resetOriginals = new SPLINT.DOMElement.Button(listElement, "resetOriginals", "Originale reparieren");
                    bt_resetOriginals.onclick = async function(){
                        await CategoryHelper.reset_Originals();
                        this.#chooseType();
                    }.bind(this);
                let bt_resetExamples = new SPLINT.DOMElement.Button(listElement, "resetExamples", "Beispiele reparieren");
                    bt_resetExamples.onclick = async function(){
                        await CategoryHelper.reset_Examples();
                        this.#chooseType();
                    }.bind(this);
                let button_openHashtags = new SPLINT.DOMElement.Button(listElement, "openTags", "Tags hinzufügen");
                    button_openHashtags.button.Class("openTags");
                    button_openHashtags.onclick = function(){
                        let id = "window_tags_";
                        let windowTags = new SPLINT.DOMElement.popupWindow("Tags", true, true);
                            windowTags.Class("window_Tags");
                            
                            let inputBody = new SPLINT.DOMElement(id + "inputBody", "div", windowTags.Element);
                                inputBody.Class("inputBody");

                                let input = new SPLINT.DOMElement.InputDiv(inputBody, "newTag", "Tag erstellen");
                                    input.Class("newTag");
                                    let button_submit = new SPLINT.DOMElement.Button(input.inputBody, "submit_newTag");
                                        button_submit.bindIcon("done");
                                        button_submit.onclick = async function(){
                                          await HashtagHelper.addTag(input.value);

                                          let a = await HashtagHelper.getTag();
                                          console.log(a)  
                                          // ProjectHelper.Design().addTags(input.value).then(function(){

                                            // });
                                        }.bind(this);

                            let tagsBody = new SPLINT.DOMElement(id + "tagsBody", "div", windowTags.Element);
                                tagsBody.Class("tagsBody");

                            
                                
                    }
            }.bind(this)
          }
          this.table.func_drawListElement = function(data, index, listElement){
            let id = listElement.id + "_";
                let lighter = new drawLighter3D(listElement, index, drawLighter3D.PROJECT, data.Thumbnail);
            
            let contentBody = new SPLINT.DOMElement(id + "contentBody", "div", listElement);
                contentBody.Class("content");

                this.drawButtonDiv(contentBody, data, index);
                this.drawHashtagDiv(contentBody, data, index)
          }.bind(this)
          this.table.draw();
    }
    drawButtonDiv(contentBody, data, index){
      let id = contentBody.id;
      let buttonDiv = new SPLINT.DOMElement(id + "content_buttons", "div", contentBody);
          buttonDiv.Class("buttonDiv");
          let button_edit = new SPLINT.DOMElement.Button(buttonDiv, index + "_edit");
              button_edit.bindIcon("edit");
              button_edit.onclick = async function(){
                  await SPLINT.SessionsPHP.set(SPLINT.SessionsPHP.PROJECT_ID, data.ProjectID, false);
                  await SPLINT.SessionsPHP.set("USER_ID", "ADMIN", false);
                  await SPLINT.SessionsPHP.set("USER_NAME", "ADMIN", false);
                  await SPLINT.SessionsPHP.set("ADMIN", true, false);
                //   await SPLINT.SessionsPHP.set("GUEST", false, false);
                  SPLINT.Tools.Location.URL = PATH.location.converter;
                //   console.dir(SPLINT.Tools.Location.addParams({"mode": "edit_project"}))
                                            SPLINT.Tools.Location.Direct(PATH.location.converter + "&mode=edit_project#ADMIN");
                //   SPLINT.Tools.Location.addParams({"mode": "edit_project"}).addHash("ADMIN").call();
              }
            let button_remove = new SPLINT.DOMElement.Button(buttonDiv, index + "_remove");
                button_remove.bindIcon("delete");
                button_remove.onclick = async function(){
                  await SPLINT.SessionsPHP.set("USER_ID", "ADMIN", false);
                  await SPLINT.SessionsPHP.set("USER_NAME", "ADMIN", false);
                  await SPLINT.SessionsPHP.set("ADMIN", true, false);
                //   await SPLINT.SessionsPHP.set("GUEST", false, false);
                  let j = contentBody.querySelectorAll("[connected*='true']");
                  if(j.length == 0) {
                      let f = await ProjectHelper.remove(data.ProjectID);
                      contentBody.parentElement.remove();
                  } else {
                        button_remove.button.style.backgroundColor = "red";
                  }
                }.bind(this);

            let button_move = new SPLINT.DOMElement.Button(buttonDiv, index + "_move");
                button_move.bindIcon("delete");
                if(data.Original == false) {
                    button_move.value = "zu Orginale verschieben";
                    button_move.onclick = async function(){
                      await SPLINT.SessionsPHP.set("USER_ID", "ADMIN", false);
                      await SPLINT.SessionsPHP.set("USER_NAME", "ADMIN", false);
                      await SPLINT.SessionsPHP.set("ADMIN", true, false);
                    //   await SPLINT.SessionsPHP.set("GUEST", false, false);
                      data.Original = true;
                      await ProjectHelper.edit(data);
                      contentBody.parentElement.remove();
                    }.bind(this);
                } else {
                    button_move.value = "zu Vorlagen verschieben";
                    button_move.onclick = async function(){
                      await SPLINT.SessionsPHP.set("USER_ID", "ADMIN", false);
                      await SPLINT.SessionsPHP.set("USER_NAME", "ADMIN", false);
                      await SPLINT.SessionsPHP.set("ADMIN", true, false);
                    //   await SPLINT.SessionsPHP.set("GUEST", false, false);
                      data.Original = false;
                      await ProjectHelper.edit(data);
                      contentBody.parentElement.remove();
                    }.bind(this);
                }
    }
    async drawHashtagDiv(contentBody, data, index){
      let manager = new SPLINT.DOMElement.Manager("hashtags_" + index + "_");
      let hashtagDiv = manager.getElement("main", contentBody);
          hashtagDiv.Class("hashtagDiv");
          manager.nameIsClass = true;

          let viewBody = manager.getElement("viewBody", hashtagDiv);
          console.log(data)    
          let obj = ProjectHelper.getDesignObj();
              obj.Hashtags.push("test1", "test2", "test3");
              obj.Categories.push("aw", "bg");
        //   console.log(ProjectHelper.Design(data.ProjectID, "ADMIN").addCategories("a", "b", "c"));//(obj, data.ProjectID, "ADMIN"));
        //   console.log(ProjectHelper.Design(data.ProjectID, "ADMIN").addTags("a", "b", "c"));
        //   console.log(ProjectHelper.Design(data.ProjectID, "ADMIN").removeCategories("a", "c"));
        //   console.log(ProjectHelper.removeFromDesign(obj, data.ProjectID, "ADMIN"));
        //   console.log(ProjectHelper.get(data.ProjectID, "ADMIN"));
          let content1 = []
          let obj1 = null;
          if(this.getOriginal){
            obj1 = await CategoryHelper.get_Originals();
          } else {
            obj1 = await CategoryHelper.get_Examples();
          }
        let nestingElement = new SPLINT.DOMElement.Nesting(viewBody, "test__" + index, obj1);
            nestingElement.onEnter = function(e, entries){
                let last = nestingElement.obj;
                for(const entry of entries){
                    if(Object.hasOwn(last[entry], entry) && typeof last[entry] != 'object'){
                        last[entry] = new Object();
                    }
                    last = last[entry];
                }
                last[e.target.value] = new Object();
                if(this.getOriginal){
                  CategoryHelper.edit_Originals(nestingElement.obj).then(function(a){});
                } else {
                  CategoryHelper.edit_Examples(nestingElement.obj).then(function(a){});
                }
                this.#chooseType();
            }.bind(this);
            nestingElement.onAdd = function(e, entries, v){
                let last = nestingElement.obj;
                for(const entry of entries){
                    if(Object.hasOwn(last[entry], entry) && typeof last[entry] != 'object'){
                        last[entry] = new Object();
                    }
                    last = last[entry];
                }
                last[v] = new Object();
                if(this.getOriginal){
                  CategoryHelper.edit_Originals(nestingElement.obj).then(function(a){});
                } else {
                  CategoryHelper.edit_Examples(nestingElement.obj).then(function(a){});
                }
                this.#chooseType();
            }.bind(this);
            nestingElement.onEdit = function(e, entries, v){
                let name = entries[entries.length - 1];
                let last = nestingElement.obj;
                for(const index in entries){
                    let entry = entries[index];
                    if(index >= entries.length -2 && Object.hasOwn(last[entry], name)){
                        Object.defineProperty(last[entry], v, Object.getOwnPropertyDescriptor(last[entry], name))
                        delete last[entry][name];
                        break;
                    }
                    last = last[entry];
                }
                if(this.getOriginal){
                  CategoryHelper.edit_Originals(nestingElement.obj).then(function(a){});
                } else {
                  CategoryHelper.edit_Examples(nestingElement.obj).then(function(a){});
                }
                this.#chooseType();
              console.log(e, entries, v);
            }.bind(this);
            nestingElement.onRemove = function(e, entries){
                let name = entries[entries.length - 1];
                let last = nestingElement.obj;
                for(const index in entries){
                    let entry = entries[index];
                    if(index >= entries.length -2 && Object.hasOwn(last[entry], name)){
                        delete last[entry][name];
                        break;
                    }
                    last = last[entry];
                }
                console.log(nestingElement)
                if(this.getOriginal){
                  CategoryHelper.edit_Originals(nestingElement.obj).then(function(a){});
                } else {
                  CategoryHelper.edit_Examples(nestingElement.obj).then(function(a){});
                }
                this.#chooseType();
            }.bind(this);
            nestingElement.callBack = function(ele, path, key, index, id, obj){
                console.dir(nestingElement)
                if(typeof obj[key].attr == 'object' && typeof obj[key].attr.data == 'object'){
                    // console.log(obj[key])
                    if(obj[key].attr.data.includes(data.ProjectID)){
                        ele.setAttribute("connected", true);
                        console.log("connected", data)
                    }
                }
                ele.onclick = function(event){
                    console.log("edit")
                    event.stopPropagation();
                    // console.log(ele);
                    let c = ele.attributes.ivalue.value;
                    let path = c.split(".");
                        path.splice(0, 1);
                    let last = nestingElement.obj;
                    for(const entry of path){
                        if(Object.hasOwn(last[entry], entry) && typeof last[entry] != 'object'){
                            last[entry] = new Object();
                        }
                        last = last[entry];
                    }
                    if(typeof last.attr != 'object'){
                        last.attr = new Object();
                    }
                    if(typeof last.attr.data != 'object'){
                        last.attr.data = [];
                    }
                    if(ele.getAttribute("connected") == "true"){
                        last.attr.data.splice(last.attr.data.indexOf(data.ProjectID), 1);
                        ele.setAttribute("connected", false)
                    } else {
                        last.attr.data.push(data.ProjectID);
                    }
                    if(this.getOriginal){
                      CategoryHelper.edit_Originals(nestingElement.obj).then(function(a){});
                    } else {
                      CategoryHelper.edit_Examples(nestingElement.obj).then(function(a){});
                    }
                    this.#chooseType();
                }.bind(this);
                ele.onmouseover = function(event){
                    event.stopPropagation()
                    ele.state().setActive();
                }
                ele.onmouseout = function(event){
                    event.stopPropagation()
                    ele.state().unsetActive();
                }
            }.bind(this);
            nestingElement.draw();
          // manager.nameIsClass = false;
          // for(const index in data.Design.Tags){
          //   let tag = data.Design.Tags[index];
          //     let tagElement = manager.getElement("tag_" + index, viewBody);
          //         tagElement.Class("hashtag");
          //         let button = new Button(tagElement, "hashtag_tag_" + index + "_" + tag, tag);
          //             button.onclick = function(){

          //             }.bind(this);
          // }
    }
    async drawCategoryMenu(){
      if(this.categoryMenuMain != undefined){
        this.categoryMenuMain.remove();
      }
      this.categoryMenuMain = new SPLINT.DOMElement(this.id + "CategoryBody", "div", this.parent);
      this.categoryMenuMain.Class("CategoryMenuMain");
      let obj1 = null;
      if(this.getOriginal){
        obj1 = await CategoryHelper.get_Originals();
      } else {
        obj1 = await CategoryHelper.get_Examples();
      }
        let nestingElement = new SPLINT.DOMElement.Nesting(this.categoryMenuMain, "test1__", obj1);
        this.categoryMenuNestingElement = nestingElement;
            nestingElement.onEnter = function(e, entries){
                let last = nestingElement.obj;
                for(const entry of entries){
                    if(Object.hasOwn(last[entry], entry) && typeof last[entry] != 'object'){
                        last[entry] = new Object();
                    }
                    last = last[entry];
                }
                last[e.target.value] = new Object();
                if(this.getOriginal){
                  CategoryHelper.edit_Originals(nestingElement.obj).then(function(a){});
                } else {
                  CategoryHelper.edit_Examples(nestingElement.obj).then(function(a){});
                }
                this.#chooseType();
            }.bind(this);
            nestingElement.onAdd = function(e, entries, v){
                let last = nestingElement.obj;
                for(const entry of entries){
                    if(Object.hasOwn(last[entry], entry) && typeof last[entry] != 'object'){
                        last[entry] = new Object();
                    }
                    last = last[entry];
                }
                last[v] = new Object();
                if(this.getOriginal){
                  CategoryHelper.edit_Originals(nestingElement.obj).then(function(a){});
                } else {
                  CategoryHelper.edit_Examples(nestingElement.obj).then(function(a){});
                }
                this.#chooseType();
            }.bind(this);
            nestingElement.onEdit = function(e, entries, v){
                let name = entries[entries.length - 1];
                let last = nestingElement.obj;
                for(const index in entries){
                    let entry = entries[index];
                    if(index >= entries.length -2 && Object.hasOwn(last[entry], name)){
                        Object.defineProperty(last[entry], v, Object.getOwnPropertyDescriptor(last[entry], name))
                        delete last[entry][name];
                        break;
                    }
                    last = last[entry];
                }
                if(this.getOriginal){
                  CategoryHelper.edit_Originals(nestingElement.obj).then(function(a){});
                } else {
                  CategoryHelper.edit_Examples(nestingElement.obj).then(function(a){});
                }
                this.#chooseType();
              console.log(e, entries, v);
            }.bind(this);
            nestingElement.onRemove = function(e, entries){
                let name = entries[entries.length - 1];
                let last = nestingElement.obj;
                for(const index in entries){
                    let entry = entries[index];
                    if(index >= entries.length -2 && Object.hasOwn(last[entry], name)){
                        delete last[entry][name];
                        break;
                    }
                    last = last[entry];
                }
                if(this.getOriginal){
                  CategoryHelper.edit_Originals(nestingElement.obj).then(function(a){});
                } else {
                  CategoryHelper.edit_Examples(nestingElement.obj).then(function(a){});
                }
                this.#chooseType();
            }.bind(this);
            nestingElement.callBack = function(ele, path, key, index, id, obj){
                ele.onclick = function(event){
                    event.stopPropagation();
                    // console.log(ele);
                    let c = ele.attributes.ivalue.value;
                    this.activeCategory = c;
                    let path = c.split(".");
                        path.splice(0, 1);
                    let last = nestingElement.obj;
                    for(const entry of path){
                        if(Object.hasOwn(last[entry], entry) && typeof last[entry] != 'object'){
                            last[entry] = new Object();
                        }
                        last = last[entry];
                    }
                    if(typeof last.attr != 'object'){
                        last.attr = new Object();
                    }
                    if(typeof last.attr.data != 'object'){
                        last.attr.data = [];
                    }
                    this.draw(last.attr.data);
                    if(this.getOriginal){
                      CategoryHelper.edit_Originals(nestingElement.obj).then(function(a){});
                    } else {
                      CategoryHelper.edit_Examples(nestingElement.obj).then(function(a){});
                    }
                    // console.log(last.attr.data);
                }.bind(this);
                ele.onmouseover = function(event){
                    event.stopPropagation()
                    ele.state().setActive();
                }
                ele.onmouseout = function(event){
                    event.stopPropagation()
                    ele.state().unsetActive();
                }
            }.bind(this);
            nestingElement.draw();

            let element = document.querySelector('[ivalue="' + this.activeCategory + '"]');
            if(element != null){
              element.style.backgroundColor = "red";
            }
    }
  }

//   let testOBJ = new SPLINT.autoObject("OBJ", true);
// testOBJ.b.attr.name = "test";
// testOBJ.b.b.attr.name = "o";
// testOBJ.a.f.h.d.attr.name = "ok";
// testOBJ.a.f.h.f.attr.name = "ok";
// console.dir(testOBJ.a.f.h.f.attr.stack);
// testOBJ.toDOMStructure(document.body, function(element, entry, key, index){
//   console.log(index);
//   if(key != "attr"){
//     let ele = new SPLINT.DOMElement("/UID()/", "div", element);
//         let headBody = new SPLINT.DOMElement(ele.id + "_headBody", "div", ele);
//             headBody.Class("I_headBody");

//           if(entry.attr != undefined){
//             let head = new SPLINT.DOMElement.SpanDiv(headBody, "head", entry.attr.name);
//                 head.Class("I_header");
//           } else {
//             let head = new SPLINT.DOMElement.SpanDiv(headBody, "head", key);
//                 head.Class("I_header");
//           }

//           if(index == 0){
//             let ele1 = new SPLINT.DOMElement("/UID()/_inputBody", "div", headBody);
//                 ele1.Class("I_inputBody");
//                 let input = new SPLINT.DOMElement.InputDiv(ele1, "I_input", "test", 0);
//                     input.disableAnimation();
//           }
//         ele.Class("I_expander");
//     return ele;
//   }
//   return false;
// });