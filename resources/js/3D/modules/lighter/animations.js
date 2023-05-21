import SPLINT from 'SPLINT';


export default class LighterAnimations {
    constructor(instance) {
        this.instance = instance;
        this.scene = instance.scene;
        this.init();
        this.define();
    }
    init(){
        this.instance.AnimationMixer = new SPLINT.AnimationMixer(this.instance);
    }
    define(){
        this.lighter_color_double_close = this.#getAnimation(0.4);
        this.lighter_color_double_close.onStart = function(model){
            let obj = [];
                obj[0] = this.#getGroupe(model, 'lighter');
                obj[1] = this.#getGroupe(model, 'lighter2');
            return obj;
        }.bind(this);
        this.lighter_color_double_close.onTick = function(model, progress, g){
            let a = SPLINT.AnimationFX.ease(progress, 2, "in-out") * 0.01;
            if(a < 0 || a > 1){
                return;
            } else {
                g[0].position.x = -0.05*a;
                g[1].position.x = -1.24 +(1.32*a);
            }
            
        }.bind(this);

        this.lighter_color_double_start = this.#getAnimation(0.3);
        this.lighter_color_double_start.onStart = function(model){
            let obj = [];
                obj[0] = this.#getGroupe(model, 'lighter');
                obj[1] = this.#getGroupe(model, 'lighter2');
            return obj;
        }.bind(this);
        this.lighter_color_double_start.onTick = function(model, progress, g){
            let a = SPLINT.AnimationFX.ease(progress, 2, "in-out") * 0.01;
            if(a < 0 || a > 1){
                return;
            } else {
                g[0].position.x = -0.05*a;
                g[1].position.x = +1 -(0.92*a);
            }
            
        }.bind(this);


        this.lighter_color = this.#getAnimation(0.1);
        this.lighter_color.onStart = function(model, name = 'lighter'){
            let groupe = this.#getGroupe(model, name);
            let obj = new Object();
                obj.gold        =  this.#getGroupe(groupe.children[0].children[0], "gold");
                obj.gold1       =  this.#getGroupe(groupe.children[0].children[0], "gold1");
                obj.chrome      =  this.#getGroupe(groupe.children[0].children[0], "chrome");
                obj.chrome1     =  this.#getGroupe(groupe.children[0].children[0], "chrome1");

                obj.gold_1      =  this.#getGroupe(groupe.children[1].children[0], "gold");
                obj.gold1_1     =  this.#getGroupe(groupe.children[1].children[0], "gold1");
                obj.chrome_1    =  this.#getGroupe(groupe.children[1].children[0], "chrome");
                obj.chrome1_1   =  this.#getGroupe(groupe.children[1].children[0], "chrome1");
            return obj;
        }.bind(this);
        this.lighter_color.onTick = function(model, progress, groupe){
            let a = SPLINT.AnimationFX.ease(progress, 2, "in-out");
            // let b = SPLINT.AnimationFX.ease(progress, 2, "in");
            groupe.chrome.material.opacity = (a)/100;
            if(groupe.chrome1 != undefined){
                groupe.chrome1.material.opacity = (a)/100;
            }

            groupe.gold.material.opacity = (100-a)/100;
            if(groupe.gold1 != undefined){
                groupe.gold1.material.opacity = (100-a)/100;
            }

            groupe.chrome_1.material.opacity = (a)/100;
            if(groupe.chrome1_1 != undefined){
                groupe.chrome1_1.material.opacity = (a)/100;
            }

            groupe.gold_1.material.opacity = (100-a)/100;
            if(groupe.gold1_1 != undefined){
                groupe.gold1_1.material.opacity = (100-a)/100;
            }
        }.bind(this);
        
        this.lighter_engraving = this.#getAnimation(0.3);
        this.lighter_engraving.onStart = function(model, name = 'lighter'){
            return this.#getGroupe(model, name);
        }.bind(this);
        this.lighter_engraving.onTick = function(model, progress, groupe){
            // groupe.rotation.z = (10 * (progress / 100)) * (Math.PI / 180);
            let f = SPLINT.AnimationFX.ease(progress, 2, "in-out");
            let d = (f / 100);
            this.instance.camera.fov = 10 + (5 * (d));
            groupe.rotation.y = (25 * d) * (Math.PI / 180);
            groupe.rotation.x = Math.PI / 2 - (30 * d) * (Math.PI / 180);
            groupe.position.y = (0.05 * d);
            // groupe.position.z = (3.2 * d);
            groupe.position.x = (0.01 * d);
            // console.log(10 + (60 * d))
            this.instance.camera.position.z = 3.5 - (2.0 * d);
            this.instance.camera.position.y = 0.35 + (0.05 * d);
            this.instance.camera.rotation.x = -0.05 - (0.1 * d);
            // this.instance.camera.position.y = 0.35 + (0.17 * d);
            this.instance.camera.updateProjectionMatrix();
        }.bind(this);


        this.lighter_explosion_split = this.#getAnimation(0.2);
        this.lighter_explosion_split.onStart = function(model, name = 'lighter'){
            let groupe = this.#getGroupe(model, name);
            let obj = new Object();
                obj.box_top = this.#getGroupe(groupe, "oberes_teil1");
                obj.box_bottom = this.#getGroupe(groupe, "unteres_teil1");
                obj.inner = this.#getGroupe(groupe, "Innenleben11");
                obj.bolt_wheel = this.#getGroupe(groupe, "Bolzen_Rad1");
                obj.bolt_hinge = this.#getGroupe(groupe, "Bolzen_Scharnier2");
                obj.stone_base1 = this.#getGroupe(groupe, "Feuersteinauflage1");
                obj.stone_base2 = this.#getGroupe(groupe, "Feuersteinhalter1");
                obj.wheel = this.#getGroupe(groupe, "Rad1");
                obj.screw = this.#getGroupe(groupe, "Schraube1");
                obj.stick = this.#getGroupe(groupe, "stab1");
                obj.connection_top = this.#getGroupe(groupe, "verbindung_oben1");
                obj.connection_bottom = this.#getGroupe(groupe, "verbindung_unten1");
                obj.feather = this.#getGroupe(groupe, "Feder1");
                obj.stone = this.#getGroupe(groupe, "Feuerstein1");
                obj.hinge = this.#getGroupe(groupe, "Scharnier1");
                obj.wick = this.#getGroupe(groupe, "docht1");
            return obj;
        }.bind(this);
        this.lighter_explosion_split.onTick = function(model, progress, groupe){
            let f = SPLINT.AnimationFX.ease(progress, 2, "in-out");
            let d = (f / 100);
            groupe.inner.position.z = -0.001        -(0.078 * d);
            groupe.bolt_wheel.position.z = -0.0425  -(0.078 * d);
            groupe.bolt_hinge.position.z = -0.03805 -(0.078 * d);
            groupe.hinge.position.z = -0.038        -(0.078 * d);
            groupe.wheel.position.z = -0.0425       -(0.078 * d);
            groupe.stone_base1.position.z = -0.0357 -(0.078 * d);

            groupe.wick.position.z = -0.003         -(0.05 * d);
            groupe.feather.position.z = -0.007      -(0.032 * d);
            groupe.screw.position.z = -0.001        -(0.027 * d);
            groupe.stone_base2.position.z = -0.0327 -(0.0385 * d);
            groupe.stone.position.z = -0.03725      -(0.04 * d);

            groupe.box_top.position.z = -0.04817    +(0.01 * d);
            groupe.box_bottom.position.z =          +(0.01 * d);
            groupe.connection_top.position.z = -0.02335          +(0.01 * d);
            groupe.connection_bottom.position.z = -0.0208         +(0.01 * d);

            groupe.stick.position.z = -0.0343      +(0.01 * d);
        }.bind(this);


        this.lighter_smooth_turn = this.#getAnimation(60);
        this.lighter_smooth_turn.onStart = function(model, name = 'lighter'){
            return this.#getGroupe(model, name);
        }.bind(this);
        this.lighter_smooth_turn.onTick = function(model, progress, groupe){
            // groupe.rotation.z = (10 * (progress / 100)) * (Math.PI / 180);
            let f = SPLINT.AnimationFX.ease(progress, 1, "in-out");
            let d = 0.5 - (f / 100);
            groupe.rotation.z = (30 * d) * (Math.PI / 180);
            // groupe.rotation.x = Math.PI / 2 - (40 * d) * (Math.PI / 180);
            // groupe.position.y = (0.25 * d);
            // groupe.position.z = -(0.4 * d);
            // groupe.position.x = (0.1 * d);
            // this.instance.camera.position.z = 3.5 + (1 * d);
            // this.instance.camera.position.y = 0.35 + (0.17 * d);
            // this.instance.camera.updateProjectionMatrix();
        }.bind(this);

        this.lighter_explosion_turn = this.#getAnimation(0.2);
        this.lighter_explosion_turn.onStart = function(model, name = 'lighter'){
            return this.#getGroupe(model, name);
        }.bind(this);
        this.lighter_explosion_turn.onTick = function(model, progress, groupe){
            // groupe.rotation.z = (10 * (progress / 100)) * (Math.PI / 180);
            let f = SPLINT.AnimationFX.ease(progress, 2, "in-out");
            let d = (f / 100);
            groupe.rotation.y = (65 * d) * (Math.PI / 180);
            groupe.rotation.x = Math.PI / 2 - (40 * d) * (Math.PI / 180);
            groupe.position.y = (0.3 * d);
            // groupe.position.z = -(0.4 * d);
            groupe.position.x = (0.1 * d);
            this.instance.camera.position.z = 3.5 + (1 * d);
            this.instance.camera.position.y = 0.35 + (0.25 * d);
            this.instance.camera.rotation.x = -0.05 - (0.01 * d);
            this.instance.camera.updateProjectionMatrix();
        }.bind(this);



        this.lighter_flame = this.#getAnimation(999999);
        this.lighter_flame.onStart = function(model, name = 'lighter'){
            let g = this.#getGroupe(model, name);
            let flame = this.#getGroupe(this.#getGroupe(g, 'docht1').children[0], 'flame');
                flame.visible = true;
            return flame;
        }.bind(this);
        this.lighter_flame.onTick = function(model, progress, groupe){
            groupe.material.uniforms.time.value = progress * 19999;
        }
        this.lighter_flame.onStop = function(progress, name, groupe){
            if(groupe != null){
                groupe.visible = false;
                this.instance.render();
            }
        }.bind(this);



        this.lighter_turn = this.#getAnimation(0.1);
        this.lighter_turn.onStart = function(model, name = 'lighter'){
            return this.#getGroupe(model, name);
        }.bind(this);
        this.lighter_turn.onTick = function(model, progress, groupe){
            groupe.rotation.z = (10 * (progress / 100)) * (Math.PI / 180);
        }
        this.lighter_open = this.#getAnimation(1);
        this.lighter_open.onStart = function(model, name = 'lighter'){
            return this.#getGroupe(model, name);
        }.bind(this);

        this.lighter_open.onTick = function(model, progress, groupe){
            let a =  360 - SPLINT.AnimationFX.easeOutBounce((progress) * 3.6, 0, 360, 360) * 0.45;
            let b = -(133.7648 +  a) * Math.PI / 180;
            groupe.children[0].children[0].rotation.z = b;
        }

        this.lighter_close = this.#getAnimation(0.25);
        this.lighter_close.onStart = function(model, name = 'lighter'){
            return this.#getGroupe(model, name);
        }.bind(this);
        this.lighter_close.onTick = function(model, progress, groupe){
                let a =  SPLINT.AnimationFX.linear(progress * 3.6, false) * 0.45;
                let b = (-133.7648 +  a) * Math.PI / 180;
                groupe.children[0].children[0].rotation.z = b;
            }

        this.lever_close = this.#getAnimation(0.28);
        this.lever_close.onStart = function(model, name = 'lighter'){
            return this.#getGroupe(model, name);
        }.bind(this);
        this.lever_close.onTick = function(model, progress, groupe){
                let a =  106.5-SPLINT.AnimationFX.linear_lever(progress * 3.6, false) * 0.3;
                let b = (-106.5 +  a) * Math.PI / 180;
                groupe.children[14].rotation.y = b;
            }

        this.lever_open = this.#getAnimation(0.5);
        this.lever_open.onStart = function(model, name = 'lighter'){
            return this.#getGroupe(model, name);
        }.bind(this);
        this.lever_open.onTick = function(model, progress, groupe){
                let a =  106.5-SPLINT.AnimationFX.linear_lever(progress * 3.6) * 0.3;
                let b = (-106.5 +  a) * Math.PI / 180;
                groupe.children[14].rotation.y = b;
            }

        this.wheel_spinn = this.#getAnimation(0.5);
        this.wheel_spinn.onStart = function(model, name = 'lighter'){
            return this.#getGroupe(model, name);
        }.bind(this);
        this.wheel_spinn.onTick = function(model, progress, groupe){
            let f = SPLINT.AnimationFX.ease(progress, 2, "in-out");
            // let d = (f / 100);
                groupe.children[7].rotation.y = f;
            }
        this.instance.AnimationMixer.add(this.wheel_spinn);
        this.instance.AnimationMixer.add(this.lighter_open);
        this.instance.AnimationMixer.add(this.lighter_close);
        this.instance.AnimationMixer.add(this.lever_open);
        this.instance.AnimationMixer.add(this.lever_close);
        this.instance.AnimationMixer.add(this.lighter_turn);
        this.instance.AnimationMixer.add(this.lighter_explosion_turn);
        this.instance.AnimationMixer.add(this.lighter_explosion_split);
        this.instance.AnimationMixer.add(this.lighter_engraving);
        this.instance.AnimationMixer.add(this.lighter_color);
        this.instance.AnimationMixer.add(this.lighter_color_double_start);
        this.instance.AnimationMixer.add(this.lighter_color_double_close);
        this.instance.AnimationMixer.add(this.lighter_flame);
        this.instance.AnimationMixer.add(this.lighter_smooth_turn);
    }
    #getAnimation(duration){
        return new SPLINT.Animation(this.scene, duration, this.instance.AnimationMixer);
    }
    #getGroupe(model, name = 'lighter'){
        return this.instance.setup.getLighterGroupe(model, name);
    }
}