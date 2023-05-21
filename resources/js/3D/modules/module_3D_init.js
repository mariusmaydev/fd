

import SPLINT from 'SPLINT';
// import test from '@SPLINT_MODULES_DIR/ThreeJS/loader/models.js';

import * as converter from "./lighter/converter/Core.js";
import * as index from "./lighter/index/Core.js";
import * as project from "./lighter/project/Core.js";
import * as projectNew from "./lighter/projectNew/Core.js";
import * as background from "./background/Core.js";

SPLINT.threeJS.scenes = new SPLINT.SArray();

function init3D(){
    SPLINT.preloadResources().then(function(){
        
    // test.load(SPLINT.config.URIs.project + "/" + "data/3Dmodels/Lighter/Feuerzeug.glb")
    // test.load(SPLINT.config.URIs.project + "/" + "data/3Dmodels/Lighter/Feuerzeug.glb")
    // test.load(SPLINT.config.URIs.project + "/" + "data/3Dmodels/Lighter/Feuerzeug.glb")
    // test.load(SPLINT.config.URIs.project + "/" + "data/3Dmodels/Lighter/Feuerzeug.glb")
    // test.load(SPLINT.config.URIs.project + "/" + "data/3Dmodels/Lighter/Feuerzeug.glb")
    // test.load(SPLINT.config.URIs.project + "/" + "data/3Dmodels/Lighter/Feuerzeug.glb")
    });
    // setTimeout(async function(){
    //     SPLINT.Events.onLoadingComplete.dispatch();
    // }, 5000);
    function callback(records) {
        
        records.forEach(function (record) {
            record.removedNodes.forEach(function (node) {
                if(node instanceof HTMLElement){
                    let elements = node.querySelectorAll('[saveContext=false]');
                    if(elements.length > 0){
                        for(const ele of elements){
                            for(const i in SPLINT.threeJS.scenes){
                                if(ele.firstChild.id == SPLINT.threeJS.scenes[i].canvas.id){
                                    console.log(ele);
                                    SPLINT.threeJS.scenes[i].remove();
                                    SPLINT.threeJS.scenes.splice(i, 1);
                                }
                            }
                        }
                    }
                }
            });
            let element = record.target;
            switch(element.getAttribute("render")){
                case '3D_Lighter_INDEX' :       SPLINT.threeJS.scenes.push(index.draw.get(element.firstChild)); break;
                case '3D_Lighter_CONVERTER' :   SPLINT.threeJS.scenes.push(converter.draw.get(element.firstChild)); break;
                case '3D_Lighter_PROJECT' :     SPLINT.threeJS.scenes.push(project.draw.get(element.firstChild)); break;
                case '3D_Lighter_PROJECT_NEW' : SPLINT.threeJS.scenes.push(projectNew.draw.get(element.firstChild)); break;
                case '3D_Background' :          SPLINT.threeJS.scenes.push(background.draw.get(element.firstChild)); break;
            }
        });
      }
      
      let observer = new MutationObserver(callback);
      observer.observe(document.body, {
        childList: true,
        attributes: false,
        characterData: false,
        subtree: true
      });
}

init3D();

function hasChildWithClass(element, className, callback = function(child){}){
    if(element.children == undefined){
        return false;
    }
    for(const child of element.children){
        if(child.className == className){
            callback(child);
            return;
        } else {
            hasChildWithClass(child, className, callback);
        }
    }
    return false;
}

function renderList() {
    var tlist = threeList;
    for ( var i = 0; i < tlist.length; i++ ) {
        var threeDict = tlist[i];
        threeDict["renderer"].render( threeDict["scene"], threeDict["camera"] );
    }
}
