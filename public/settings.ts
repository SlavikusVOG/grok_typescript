//import * as webix from "../libs/webix/types/webix";

export class Settings{
    private readonly formConfig: webix.ui.formConfig = {
        view:"form",
        id:"settings_form",
        elements:[
            {view:"text", name:"groupName", label:"Group"}
        ]
    };

    private readonly fileUploaderConfig: webix.ui.uploaderConfig = {
        view:"uploader",
        id: "fileUploader",
        value:"Upload file",
         name:"files",
        link:"mylist",
        upload:"http://localhost:3000/upload"
        //,datatype:"json"
    };

    private readonly myListConfig: webix.ui.listConfig = {
        view:"list",
        id:"myList",
        type:"uploader"
    }

    private readonly getValueButtonConfig: webix.ui.buttonConfig = {
        view:"button",
        id:"getValueButton",
        label: "Get value",
        click: function(){
           let text = (<webix.ui.button>webix.$$("getValueButton")).getParentView().getParentView().getValues();
           text = JSON.stringify(text);
           webix.message("<pre>"+text+"</pre>");
        }
    }

    private readonly viewElementsConfig: webix.ui.checkboxConfig[] = [
        {
        view: "checkbox",
        id: "settings_view_switch_checkbox",
        labelRight: "Switch controls",
        value: 0
        }
    ]

    private readonly toolbarConfig: webix.ui.toolbarConfig = {
        view:"toolbar",
        id:"settings_view_toolbar",
        elements: this.viewElementsConfig,
        elementsConfig:{
            on:{
                onChange:function(){
                    let checkboxValue = typeof (<webix.ui.checkbox>webix.$$("settings_view_switch_checkbox")).getValue() == "number" ?
                    (<webix.ui.checkbox>webix.$$("settings_view_switch_checkbox")).getValue().toString() :
                    (<webix.ui.checkbox>webix.$$("settings_view_switch_checkbox")).getValue()
                    
                    if(checkboxValue == "1"){
                        (<webix.ui.layout>webix.$$("settings_view_col1")).hide();
                        (<webix.ui.layout>webix.$$("settings_view_col2")).show();
                        //$$("fileUploader").hide();
                        //$$("myList").hide();
                        //$$("getValueButton").hide();
                        //$$("settings_view_datatable").show();
                        //$$("settings_form").show();
                    }

                    if(checkboxValue == "0"){
                        (<webix.ui.layout>webix.$$("settings_view_col1")).show();
                        (<webix.ui.layout>webix.$$("settings_view_col2")).hide();
                        //$$("fileUploader").hide();
                        //$$("myList").hide();
                        //$$("getValueButton").hide();
                        //$$("settings_view_datatable").show();
                        //$$("settings_form").show();
                    }
                    
                    (<webix.ui.form>webix.$$("settings_view")).refresh();
                }
            }
        }
    }

    private readonly datatableConfig: webix.ui.datatableConfig = {
        view:"datatable",
        id:"settings_view_datatable",
        columns:[
            {id: "groupName", header: ["Group name", {content:"textFilter"}], fillspace: true, sort:"string"},
            {id: "musicStyle", header: ["Music style", {content:"textFilter"}], fillspace: true, sort:"string"},
            {id: "composition", header: ["Compositions", {content:"textFilter"}], fillspace: true, sort:"string"},
            {id: "groupCreationDate", header: ["Group creation date", {content:"textFilter"}], fillspace: true, sort:"date"},
            {id: "countryOfFoundation", header: ["Country of foundation", {content:"textFilter"}], fillspace: true, sort:"string"}
        ]
    }

    private readonly viewConfig: webix.ui.formConfig = {
        id: "settings_view",
        view: "form",
        rows: [
            this.toolbarConfig,
            {
                cols: [
                    {
                        id: "settings_view_col1",
                        rows:[
                            this.fileUploaderConfig,
                            this.myListConfig,
                            this.getValueButtonConfig
                        ]
                    },
                    {
                        id: "settings_view_col2",
                        rows :[
                            this.datatableConfig,
                            this.formConfig
                        ]
                    }
                ]
            }
        ]
    };

    init(){
        return this.viewConfig;
    }
}