SPLINT.require('@PROJECT_ROOT/ADMIN/testspace/test_chartJS.js');
class ADMIN_testSpace {
    constructor(parent = document.body){
        this.parent = parent;
        this.id = "ADMIN_testSpace_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("ADMIN_testSpace_Main");
        this.draw();
        this.chart = new test_chartJS(this.mainElement);
    }
    draw(){
        console.dir(navigator)
        // new ADMIN_test_Nesting(this.mainElement);
        let button = new SPLINT.DOMElement.Button(this.mainElement, "user", "user");
            button.setStyleTemplate(SPLINT.DOMElement.Button.STYLE_DEFAULT);
            button.onclick = async function(){
                // let a  = await managerCallPHP.editUser("ADMIN", 123);
                let a = await SPLINT.API.IPinfo.get();
                let b = await SPLINT.API.IPapi.get();
                console.log(a);
                console.log(b);
                // ManagerHelper.take();
            }.bind(this);

        let button1 = new SPLINT.DOMElement.Button(this.mainElement, "stop", "stop");
            button1.setStyleTemplate(SPLINT.DOMElement.Button.STYLE_DEFAULT);   
            button1.onclick = function(){
                this.S_time.end();
                // ManagerHelper.take();
            }.bind(this);

        let button2 = new SPLINT.DOMElement.Button(this.mainElement, "send", "send");
            button2.setStyleTemplate(SPLINT.DOMElement.Button.STYLE_DEFAULT);
            button2.onclick = async function(){
                // let b = S_DateTime.parseToMySqlDateTime(new Date());
                // console.log(b)
                let a = S_DateTime.parseToMySqlDateTime((new Date()));
                let b = S_DateTime.parseToMySqlDateTime((new Date()));
                let call = await ManagerHelper.add('2023-05-08 04:28:02', a, "USER19", "ADMIN");
                console.log(call);
                console.log(await ManagerHelper.get('2023-05-09 01:28:02'));
                // ManagerHelper.take();
            }.bind(this);
    }

}