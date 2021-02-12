import * as webix from "../libs/webix/codebase/types/webix"

export class DatasetA{

    // private readonly editdataForm: webix.ui.form; //

    // private readonly toolbar: webix.ui.toolbar //

    // private readonly layout: webix.ui.layout //

    // private readonly datatable: webix.ui.datatable //

    private readonly datatableConfig: webix.ui.datatableConfig = {
        id: "datasetA_datatable",
        view: "datatable",
        select: "row",
        columns:[
            {id: "groupName", header: ["Group name", {content:"textFilter"}], fillspace: true, sort:"string"},
            {id: "musicStyle", header: ["Music style", {content:"textFilter"}], fillspace: true, sort:"string"},
            {id: "composition", header: ["Compositions", {content:"textFilter"}], fillspace: true, sort:"string"},
            {id: "groupCreationDate", header: ["Group creation date", {content:"textFilter"}], fillspace: true, sort:"date", format:webix.Date.dateToStr("%d-%m-%Y", false)},
            {id: "countryOfFoundation", header: ["Country of foundation", {content:"textFilter"}], fillspace: true, sort:"string"}
        ],
        url:"http://localhost:3000/groups",
        on: {
            //after select row display form with data for edit
            onAfterSelect: function (selection, preserve) {
                webix.ui(this.popup).show();
                $$("editdata_form").bind($$("datasetA_datatable"));
            }
        },

        save:"rest->http://localhost:3000/groups"
    };

    private readonly editdataFormConfig: webix.ui.formConfig = {
        view:"form",
        id:"editdata_form",
        elements:[
            {view:"text", label:'Group name', name:"groupName"},
            {view:"text", label:'Music style', name:"musicStyle"},
            {view:"text", label:'Compositions', name:"composition"},
            {view:"text", label:'Group creation date', name:"groupCreationDate", editor:"date"},
            {view:"text", label:'Country of foundation', name:"countryOfFoundation"},
            {id:"datasetA_save_editdata", view:"button", label:"Save", click: this.setDatasetA()}
        ],
        on:{
            onAfterLoad:function(){
            }
        }
    };

    private readonly popupConfig: webix.ui.popupConfig = {
        view: "popup",
        id: "datasetA_popup",
        head: false,
        body: webix.copy(this.editdataFormConfig)
    };

    private readonly toolbarConfig: webix.ui.toolbarConfig = {
        id: "datasetA_toolbar",
        view: "toolbar",
        elements: [
            {
                id: "expor_to_excel_button",
                view: "button",
                label: "Export to Excel",
                click: function(){
                    webix.toExcel($$("datasetA_datatable"));
                }
            },
            {
                id: "refresh",
                view: "button",
                label: "Refresh",
                click: function(){
                    (<webix.ui.layout>webix.$$("datasetA_view")).reconstruct();
                }
            }
        ]
    }

    private readonly layoutConfig: webix.ui.layoutConfig = {
        id:"datasetA_view",
        view: "layout",
        rows:[
            this.toolbarConfig,
            this.datatableConfig,
        ]
    }

    public getView(): webix.ui.layoutConfig{
        return this.layoutConfig;
    }

    private setDatasetA(){
        let updatedData = (<webix.ui.form>webix.$$("editdata_form")).getValues();
        (<webix.ui.datatable>webix.$$("datasetA_datatable")).updateItem(updatedData.id, updatedData);
        if((<webix.ui.popup>webix.$$("datasetA_popup"))){
            (<webix.ui.popup>webix.$$("datasetA_popup")).destructor();
        }
    }
}