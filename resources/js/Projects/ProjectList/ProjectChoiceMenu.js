class drawProjectChoiceMenu {
    constructor(parent){
      this.parent = parent;
      this.id = "ProjectChoiceMenu_";
      this.CategoryMenu = null;
      this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
      this.mainElement.Class("ProjectContainer");
      this.listBody = new SPLINT.DOMElement(this.id + "listBody", "div", this.mainElement);
      this.listBody.Class("ProjectListBody");
      this.draw();
      window.onhashchange = this.#chooseType.bind(this);
      this.#chooseType();
    }
    removeMobileMenuButton(){

        if(this.mobileMenuButton != null){
            this.mobileMenuButton.button.remove();
            this.closemobileMenuButton.button.remove();
            this.closemobileMenuButtonContainer.remove();
            this.mobileMenuBackground.remove();
        }
    }
    drawMobileMenuButton(){
        this.mobileMenuButton = null;
        this.mobileMenuBackground = new SPLINT.DOMElement("MobileMenuBackground", "div", this.buttonDiv);
        this.mobileMenuBackground.before(this.buttonDiv.firstChild);
        this.mobileMenuBackground.Class("MobileMenuBackground");
        this.mobileMenuBackground.onclick = function(){
            this.buttonDiv.state().unsetActive();
            this.mobileMenuButton.button.state().setActive();
        }.bind(this)

        this.closemobileMenuButtonContainer = new SPLINT.DOMElement("MobileMenuCloseButtonContainer", "div", this.buttonContentDiv);
        this.closemobileMenuButtonContainer.Class("MobileMenuCloseButtonContainer");
        this.closemobileMenuButtonContainer.before(this.buttonContentDiv.firstChild);
            let headline = new SPLINT.DOMElement.SpanDiv(this.closemobileMenuButtonContainer, "headline", "Auswahl");
                headline.Class("headline");

            this.closemobileMenuButton = new SPLINT.DOMElement.Button(this.closemobileMenuButtonContainer, "MobileMenuCloseButton");
            this.closemobileMenuButton.bindIcon("close");
            this.closemobileMenuButton.Class("MobileMenuButtonClose");
            this.closemobileMenuButton.onclick = function(){
                this.buttonDiv.state().unsetActive();
                this.mobileMenuButton.button.state().setActive();
            }.bind(this);

            this.mobileMenuButton = new SPLINT.DOMElement.Button(this.parent, "MobileMenuButton", "test");
            this.mobileMenuButton.Class("MobileMenuButton");
            this.mobileMenuButton.bindIcon("menu");
            this.mobileMenuButton.onclick = function(){
                this.buttonDiv.state().setActive();
                this.mobileMenuButton.button.state().unsetActive();
            }.bind(this);
    }
    draw(){
      let headlineDiv = new SPLINT.DOMElement.SpanDiv(this.mainElement, "headline", "Entwürfe");
          headlineDiv.div.Class("headline");
          
          if(false && SPLINT.ViewPort.getSize() != "mobile-small"){
            let buttonCreateContainer = new SPLINT.DOMElement("ContainerButtonCreate", "div", headlineDiv.div);
                buttonCreateContainer.Class("buttonCreateContainer");
                let buttonCreate = new SPLINT.DOMElement.Button(buttonCreateContainer, "create", "erstellen");
                    buttonCreate.Class("buttonCreate");
                    buttonCreate.onclick = async function(){
                        await ProjectHelper.new("neues Projekt", "LIGHTER_BASE_GOLD_custom", false, false, false, "base");
                        SPLINT.Tools.Location_old.goto(PATH.location.converter).call();
                }.bind(this);
          }
          
        this.buttonDiv = new SPLINT.DOMElement(this.id + "buttonDiv", "div", this.mainElement);
        this.buttonDiv.Class("buttons");
            this.buttonContentDiv = new SPLINT.DOMElement(this.id + "buttonContentDiv", "div", this.buttonDiv);
            this.buttonContentDiv.Class("buttonsContent");
            let buttonsCategoryMenuDiv = new SPLINT.DOMElement(this.id + "buttonsCategoryMenuDiv", "div", this.buttonDiv);
                buttonsCategoryMenuDiv.Class("buttonsCategoryContainer");
        
                
            // NavBar.logo.div.style.position= "relative";
                // buttonsCategoryMenuDiv.
      let div_originals = this.buttonContentDiv.newDiv("div_originals", "originals");
        this.bt_originals = new SPLINT.DOMElement.Button(div_originals, "project_originals", "Orginale");

            this.CategoryMenu_originals = new ProjectCategoryMenu(div_originals, true, true);

        this.bt_originals.setStyleTemplate(S_Button.STYLE_DEFAULT);
        this.bt_originals.button.state().setActive();
        this.bt_originals.button.onclick = function(){
            if(this.bt_originals.button.state().isActive()) {
                this.bt_originals.button.setAttribute("hide", true);
                this.bt_originals.button.state().unsetActive();
                this.CategoryMenu_originals.hide = true;
            } else {
                this.bt_originals.button.setAttribute("hide", false);
                this.bt_originals.button.state().setActive();
                this.CategoryMenu_originals.hide = false;
            }
            //   this.bt_originals.button.state().setActive();
            //   this.bt_public.button.state().unsetActive();
            //   this.bt_private.button.state().unsetActive();
              setTimeout(async function(){
                  SPLINT.Tools.Location_old.setHash("originals");
              }, 500);
            }.bind(this);

        div_originals.onmouseenter = function(){
            this.CategoryMenu_originals.hide = false;
            this.CategoryMenu_originals.expandAll();
            this.bt_originals.button.setAttribute("hide", false);
        }.bind(this);
        this.bt_originals.button.onmouseleave = function(){
            if(!this.bt_originals.button.state().isActive()) {
                this.CategoryMenu_originals.foldAll();
                this.CategoryMenu_originals.hide = true;
                this.bt_originals.button.setAttribute("hide", true);
            }
        }.bind(this);
          this.CategoryMenu_originals.callBack = function(data){
            this.public(true, data);
          }.bind(this);

      let div_public = this.buttonContentDiv.newDiv("div_public", "public");
        this.bt_public = new SPLINT.DOMElement.Button(div_public, "project_public", "Vorlagen");

        this.CategoryMenu_public = new ProjectCategoryMenu(div_public, false, true);

        this.bt_public.setStyleTemplate(S_Button.STYLE_DEFAULT);
        this.bt_public.button.state().setActive();
        this.bt_public.button.onclick = function(){
            if(this.bt_public.button.state().isActive()) {
                this.bt_public.button.setAttribute("hide", true);
                this.bt_public.button.state().unsetActive();
                this.CategoryMenu_public.hide = true;
            } else {
                this.bt_public.button.setAttribute("hide", false);
                this.bt_public.button.state().setActive();
                this.CategoryMenu_public.hide = false;
            }
            setTimeout(async function(){
                SPLINT.Tools.Location_old.setHash("public");
            }, 500);
        }.bind(this);

        this.bt_public.button.onmouseenter = function(){
            this.CategoryMenu_public.hide = false;
            this.bt_public.button.setAttribute("hide", false);
            this.CategoryMenu_public.expandAll();
        }.bind(this);

        div_public.onmouseleave = function(){
            if(!this.bt_public.button.state().isActive()) {
                this.CategoryMenu_public.foldAll();
                this.CategoryMenu_public.hide = true;
                this.bt_public.button.setAttribute("hide", true);
            }
        }.bind(this);
          this.CategoryMenu_public.callBack = function(data, inst){
            this.public(false, data, inst);
          }.bind(this);
        // }
      
      let div_private = this.buttonContentDiv.newDiv("div_private", "private");
          this.bt_private = new SPLINT.DOMElement.Button(div_private, "project_private", "deine Designs");
          this.bt_private.setStyleTemplate(S_Button.STYLE_DEFAULT);
          this.bt_private.button.state().unsetActive();
          this.bt_private.onclick = function(){
                if(this.bt_private.button.state().isActive()) {
                    this.bt_private.button.setAttribute("hide", true);
                } else {
                    this.bt_private.button.setAttribute("hide", false);
                }
                setTimeout(async function(){
                    SPLINT.Tools.Location_old.setHash("private_storage");
                }, 500);
              }.bind(this);

        this.bt_private.button.onmouseenter = function(){
            this.bt_private.button.setAttribute("hide", false);
            this.CategoryMenu_public.expandAll();
        }.bind(this);
        div_private.onmouseleave = function(){
            if(!this.bt_private.button.state().isActive()) {
                this.bt_private.button.setAttribute("hide", true);
            }
        }.bind(this);
      
        // if(SPLINT.ViewPort.getSize() != "mobile-small"){
            let div_create = this.buttonContentDiv.newDiv("div_create", "erstellen");
                this.bt_create = new SPLINT.DOMElement.Button(div_create, "bt_create", "jetzt erstellen");
                this.bt_create.setStyleTemplate(S_Button.STYLE_DEFAULT);
                this.bt_create.button.state().unsetActive();
                this.bt_create.onclick = async function(){
                        let res = await ProjectHelper.new("neues Projekt", "LIGHTER_BASE_GOLD_custom", false, false, false, "base");
                    console.dir(res);
                        SPLINT.SessionsPHP.showAll();
                        LoaderMain.goto("converter");
                        // SPLINT.Tools.Location_old.goto(PATH.location.converter).call();
                    }.bind(this)

        this.#changeViewPortSize(this);
        SPLINT.ViewPort.onViewPortChanged = this.#changeViewPortSize.bind(this);
    }
    #changeViewPortSize(){
        let vp = SPLINT.ViewPort.getSize();
        if(vp == "mobile-small"){
            this.drawMobileMenuButton();
            Footer.remove();
        } else {
            Footer.drawFooterAsBox(this.buttonDiv);
            this.removeMobileMenuButton();
            this.CategoryMenu_originals.move(div_originals);
            this.CategoryMenu_public.move(div_public);
        }
    };
    #chooseType(){
      // if(this.CategoryMenu != null){
      //   this.CategoryMenu.remove();
      // }
      // this.draw();
      let hashes = SPLINT.Tools.Location.getHashes();
      let type = hashes;
      let state = "NORMAL";
      if(Array.isArray(hashes)){
        type  = hashes[0];
        state = hashes[1];
      }
      switch(type){
        case "public" :  this.public(); break;
        case "originals" :  this.public(true); break;
        case "private_cart" : this.private(true); break;
        case "private_storage" : this.private(false); break;
        default : this.private(); break;
      }
    }
    async private(isCart = false){
      this.CategoryMenu_originals.hide = true;
      this.CategoryMenu_public.hide = true;
      this.bt_originals.button.state().unsetActive();
      this.bt_public.button.state().unsetActive();
      this.bt_private.button.state().setActive();
      if(this.list_public != undefined){
        this.list_public.remove();
        this.list_public = undefined;
      }
      if(isCart){
        if(this.list_private_NORMAL != undefined){
          this.list_private_NORMAL.remove();
          this.list_private_NORMAL = undefined;
          this.list_private_NORMAL = undefined;
        }
        let data = await ProjectHelper.getAll("CART");
        this.list_private_CART = new drawProjectList(this.listBody, "CART", data, false);
            // let head_c = new SPLINT.DOMElement("CART_head", "div", this.list_private_CART.mainElement);
            //     head_c.before(this.list_private_CART.table.mainElement);
            //     let text_c = new SPLINT.DOMElement.SpanDiv(head_c, "CART_head_span", "im Einkaufswagen");
            //     let hr_c = new SPLINT.DOMElement.HorizontalLine(head_c);
      } else {
        if(this.list_private_CART != undefined){
          this.list_private_CART.remove();
          this.list_private_CART = undefined;
        }
        if(this.list_original != undefined){
          this.list_original.remove();
          this.list_original = undefined;
        }
            let data = await ProjectHelper.getAll("NORMAL");
            let res = null;
            if(data != null){
                res = [];
                res.push({
                    path: "n.n",
                    value: data,
                    ID: "private"
                })
            }
            this.list_private_NORMAL = new drawProjectList(this.listBody, "NORMAL", res, false, true);
                // let head_N = new SPLINT.DOMElement("NORMAL_head", "div", this.list_private_NORMAL.mainElement);
                //     head_N.before(this.list_private_NORMAL.table.mainElement);
                //     let text_N = new SPLINT.DOMElement.SpanDiv(head_N, "NORMAL_head_span", "deine Designs");
                //     let hr_N = new SPLINT.DOMElement.HorizontalLine(head_N);

      }
      
    }
    async public(isOriginal = false, data = null, inst = null, reload = false) {
        let categories = await new Promise(async function(resolve){
            if(inst != null) {
                resolve(inst.data);
            } else {
                let res;
                if(isOriginal){
                    res = await CategoryHelper.get_Originals();
                } else {
                    res = await CategoryHelper.get_Examples();
                }
                resolve(res);
            }
        });
      this.bt_private.button.state().unsetActive();
      if(this.list_private_NORMAL != undefined){
        this.list_private_NORMAL.remove();
        this.list_private_NORMAL = undefined;
      }
      if(this.list_private_CART != undefined){
        this.list_private_CART.remove();
        this.list_private_CART = undefined;
      }
      if(isOriginal){
            this.CategoryMenu_originals.hide = false;
            this.CategoryMenu_public.hide = true;
            this.bt_public.button.state().unsetActive();
            this.bt_originals.button.state().setActive();
            if(this.list_public != undefined){
                this.list_public.remove();
                this.list_public = undefined;
            }
        
            if(reload || this.list_original == undefined){

                if(data == null){
                    data = await ProjectHelper.getAllAdmin(true);
                }
                let result1 = getAllPaths(categories, 'data');
                for(const i in result1) {
                    let e = result1[i];
                    e.ID = e.path.replace(".attr.data", "");
                    if(!e.ID.includes(".")){
                    result1.splice(i,1);
                    continue; 
                    }
                    for(const [key, val] of Object.entries(e.value)){
                        for(const k of data) {
                            if(val == k.ProjectID){
                                e.value[key] = k;
                            }
                        }
                    }
                }

                this.list_original = new drawProjectList(this.listBody, "ORIGINAL", result1, true);
            } else if(this.list_original != undefined){
                let ID = (this.CategoryMenu_originals.activeCategory.replace("start.", ""))
                this.list_original.focusSection(ID)
            }
      } else {
            this.CategoryMenu_public.hide = false;
            this.CategoryMenu_originals.hide = true;
            this.bt_public.button.state().setActive();
            this.bt_originals.button.state().unsetActive();
            if(this.list_original != undefined){
                this.list_original.remove();
                this.list_original = undefined;
            }
            if(reload || this.list_public == undefined){
                if(data == null){
                    data = await ProjectHelper.getAllAdmin(false);
                }
                let result1 = getAllPaths(categories, 'data');
                for(const i in result1) {
                    let e = result1[i];
                    e.ID = e.path.replace(".attr.data", "");
                    if(!e.ID.includes(".")){
                       result1.splice(i,1);
                       continue; 
                    }
                    for(const [key, val] of Object.entries(e.value)){
                        for(const k of data) {
                            if(val == k.ProjectID){
                                e.value[key] = k;
                            }
                        }
                    }
                }

                this.list_public = new drawProjectList(this.listBody, "PUBLIC", result1, true);
            } else if(this.list_public != undefined){
                let ID = (this.CategoryMenu_public.activeCategory.replace("start.", ""))
                this.list_public.focusSection(ID)
            }

        
        // this.list_public = new drawProjectList(this.listBody, "PUBLIC", data, true);
        //   let head = new SPLINT.DOMElement("PUBLIC_head", "div", this.list_public.mainElement);
        //       head.before(this.list_public.table.mainElement);
        //       let text = new SPLINT.DOMElement.SpanDiv(head, "PUBLIC_head_span", "Vorlagen");
        //       let hr = new SPLINT.DOMElement.HorizontalLine(head);
      }
    }
  }

  function getAllPaths(obj, key, prev = '') {
    const result = []
  
    for (let k in obj) {
      let path = prev + (prev ? '.' : '') + k;
  
      if (k == key) {
        result.push({ path: path, value: obj[k] })
      } else if (typeof obj[k] == 'object') {
        result.push(...getAllPaths(obj[k], key, path))
      }
    }
  
    return result
  }
  