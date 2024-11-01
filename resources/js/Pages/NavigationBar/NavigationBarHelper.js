
class NavigationBarHelper {
    static get BurgerMenu(){
        return class BurgerMenu {
            constructor(name, buttonParent, menuParent){
                this.name = name;
                this.id = "BurgerMenu_" + name + "_";
                this.buttonParent = buttonParent;
                this.menuParent = menuParent;
                this.isOpen = false;
                this.isDrawn = false;
            }
            #onOpenList = [];
            set onOpen(func){
                this.#onOpenList.push(func);
            }
            get onOpenList() {
                return this.#onOpenList;
            }
            draw(){
                this.drawButton();
                this.drawMenu();
                this.isDrawn = true;
            }
            drawButton(){
                this.buttonContainer = new SPLINT.DOMElement("NavBar_BurgerMenuDiv", "div", this.buttonParent);
                this.buttonContainer.Class("burgerMenu");
                    this.button = new SPLINT.DOMElement.Button(this.buttonContainer, "burgerMenu");
                    this.button.bindIcon("menu")
                    this.button.button.onclick = function() {
                        if(this.isOpen){
                            this.close();
                            this.button.bindIcon("menu")
                        } else {
                            this.open();
                            this.button.bindIcon("close")
                            for(const e of this.#onOpenList){
                                e();
                            }
                        }
                    }.bind(this);

            }
            drawMenu(){
                this.mainElement = new SPLINT.DOMElement("NavBar_BurgerMenuContainer", "div", this.menuParent);
                this.mainElement.before(NavBar.contentElement);
                this.mainElement.Class("BurgerMenuContainer");
                this.mainElement.state().unsetActive();
                this.contentElement = new SPLINT.DOMElement("NavBar_BurgerMenuContent", "div", this.mainElement);
                this.contentElement.Class("BurgerMenuContent");

                    // let btHome = new SPLINT.DOMElement.Button(this.contentElement, "BTHome", "Home");
                    //     btHome.Class("btHome");
                    //     btHome.onclick = function(){
                    //         this.close();
                    //         LoaderMain.goto("index");
                    //     }.bind(this);

                    let btCreate = new SPLINT.DOMElement.Button(this.contentElement, "BTCreate", "Jetzt erstellen");
                        btCreate.Class("btCreate");
                        btCreate.onclick = async function(){
                            this.close();
                            await ProjectHelper.new("neues Projekt", "LIGHTER_BASE_GOLD_custom", false, false, false, "base");
                            LoaderMain.goto("converter");
                        }.bind(this);

                    let btOriginals = new SPLINT.DOMElement.Button(this.contentElement, "BTOriginals", "Kollektionen");
                        btOriginals.Class("btOriginals");
                        btOriginals.onclick = function(){
                            // SPLINT.Tools.Location.addHash("originals");
                            LoaderMain.goto("converterStart", "originals");
                        //    SPLINT.Tools.Location_old.goto(PATH.location.converterStart).setHash("originals").call();
                            this.close();
                        }.bind(this);

                    let btExamples = new SPLINT.DOMElement.Button(this.contentElement, "BTExamples", "Vorlagen");
                        btExamples.Class("btExamples");
                        btExamples.onclick = function(){
                            LoaderMain.goto("converterStart", "public");
                            this.close();
                        }.bind(this);
                            
                    let btPrivate = new SPLINT.DOMElement.Button(this.contentElement, "BTPrivate", "Deine Designs");
                        btPrivate.Class("btPrivate");
                        btPrivate.onclick = function(){
                            this.close();
                            LoaderMain.goto("converterStart", "private_storage");
                        }.bind(this);

                    let btContact = new SPLINT.DOMElement.Button(this.contentElement, "BTContact", "Kontakt");
                        btContact.Class("btContact");
                        btContact.onclick = function(){

                            this.close();
                        }.bind(this);

                    let containerFooter = new SPLINT.DOMElement("NavBar_BurgerMenuFooterContainer", "div", this.contentElement);
                        containerFooter.Class("BurgerMenuFooter");
                        let btImprint = new SPLINT.DOMElement.Button(containerFooter, "BTImprint", "Impressum");
                            btImprint.Class("btImprint");
                            btImprint.onclick = function(){
                                LoaderMain.goto("imprint");
                            //    SPLINT.Tools.Location_old.goto(PATH.location.imprint).call();
                                this.close();
                            }.bind(this);
                            
                        let btData = new SPLINT.DOMElement.Button(containerFooter, "BTData", "Datenschutz");
                            btData.Class("btData");
                            btData.onclick = function(){
                                LoaderMain.goto("dataProtection");
                                this.close();
                            }.bind(this);
                            
                        let btAGB = new SPLINT.DOMElement.Button(containerFooter, "BT_AGB", "AGBs");
                            btAGB.Class("btAGB");
                            btAGB.onclick = function(){
                                LoaderMain.goto("AGB");
                                this.close();
                            }.bind(this);
                            
                        let btVersand = new SPLINT.DOMElement.Button(containerFooter, "BTSending", "Versand");
                            btVersand.Class("btSending");
                            btVersand.onclick = function(){

                                this.close();
                            }.bind(this);
                SPLINT.Events.onPopStateChange = function(){
                    if(this.isOpen){
                        this.close();
                    }
                }.bind(this)
                this.mainElement.state().onStateChange = function(state){
                    // if(state == "active"){
                    //     this.#drawContent();
                    // }
                }.bind(this)
            }
            remove(){
                if(!this.isDrawn){
                    return false;
                }
                this.mainElement.remove();
                this.buttonContainer.remove();
                this.isDrawn = false;
                this.isOpen = false;
                return true;
            }
            open(){
                if(!this.isDrawn){
                    return false;
                }
                NavBar.setTransparent()
                this.menuParent.state().setActive();
                this.isOpen = true;
                this.mainElement.state().setActive();
                this.button.bindIcon("close")
            }
            close(){
                if(!this.isDrawn){
                    return false;
                }
                NavBar.setSolid();
                this.menuParent.state().unsetActive();
                this.isOpen = false;
                this.mainElement.state().unsetActive();
                this.button.bindIcon("menu")
            }

        }
    }
}