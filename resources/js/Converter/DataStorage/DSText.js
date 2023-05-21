class DataStorageText_C {  
    static TEXT_ID               = "TextID";
    static TEXT_NAME             = "TextName";
    static TEXT_VALUE            = "TextValue";
    static TEXT_POS_X            = "TextPosX";
    static TEXT_POS_Y            = "TextPosY";
    static TEXT_ALIGN            = "TextAlign";
    static TEXT_LINE_HEIGHT      = "TextLineHeight";
    static TEXT_ORIENTATION      = "TextOrientation";

    static FONT_FAMILY           = "FontFamily";
    static FONT_SIZE             = "FontSize";
    static FONT_WEIGHT           = "FontWeight";
    static FONT_STYLE            = "FontStyle";
    static FONT_ALIGN            = "FontAlign";
    
    TEXT_ID          = DataStorageText_C.TEXT_ID;
    TEXT_NAME        = DataStorageText_C.TEXT_NAME;
    TEXT_VALUE       = DataStorageText_C.TEXT_VALUE;
    TEXT_POS_X       = DataStorageText_C.TEXT_POS_X;
    TEXT_POS_Y       = DataStorageText_C.TEXT_POS_Y;
    TEXT_ALIGN       = DataStorageText_C.TEXT_ALIGN;
    TEXT_LINE_HEIGHT = DataStorageText_C.TEXT_LINE_HEIGHT;
    TEXT_ORIENTATION = DataStorageText_C.TEXT_ORIENTATION;
    FONT_FAMILY      = DataStorageText_C.FONT_FAMILY;
    FONT_SIZE        = DataStorageText_C.FONT_SIZE;
    FONT_WEIGHT      = DataStorageText_C.FONT_WEIGHT;
    FONT_STYLE       = DataStorageText_C.FONT_STYLE;
    FONT_ALIGN       = DataStorageText_C.FONT_ALIGN;

    constructor(){
      this.Storage = [];
    }
    add(data){
      for(let i = 0; i < data.length; i++){
        this.Storage.push(data[i]);
      }
      return this;
    }
    get(index){
      return this.Storage[index];
    }
    log(){
      console.log(this.Storage);
    }
    getIndex(ID){
      for(let i = 0; i < this.Storage.length; i++){
        if(this.Storage[i].TextID == ID){
          return i;
        }
      }
      return -1;
    }
    edit(data){
      this.Storage = _.mergeWith(this.Storage, data, (objValue, srcValue) => {
        if( _.isArray(srcValue)) {
          return srcValue;
        }
      });
      return this;
    }
    getClone(){
      return deepClone(this);
    }
    async remove(index){
      let call = new SPLINT.CallPHP(Text_C.PATH, Text_C.REMOVE);
          call.data.TextID = this.Storage[index].TextID;
          call.onBeforeSend = function(){
            this.Storage.splice(index, 1);
          }.bind(this);
      return call.send();
    }
    parse(index = null){
      if(index != null){
        return this.Storage[index];
      } else {
        return this.Storage;
      }
    }
    length(){
      return this.Storage.length;
    }
    static createDummy(index){
      let data = [];
          data[index] = new Object();
      return data;
    }
    async saveAsync(){
      let call = new SPLINT.CallPHP(Text_C.PATH, Text_C.EDIT);
          call.data.Storage = this.parse();
          call.send();
    }
    async save(){
      let call = new SPLINT.CallPHP(Text_C.PATH, Text_C.EDIT);
          call.data.Storage = this.parse();
          call.sendInSequence();
    }
  }