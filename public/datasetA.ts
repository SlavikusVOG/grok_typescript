import * as webix from "../libs/webix/codebase/types/webix"

export class DatasetA{
    private const datatable: webix.ui.datatableConfig = {
        id: "datasetA_datatable",
        view: "datatable",
        select: "row",
        // autoconfig: true,
        columns:[
            {id: "groupName", header: ["Group name", {content:"textFilter"}], fillspace: true, sort:"string"},
            {id: "musicStyle", header: ["Music style", {content:"textFilter"}], fillspace: true, sort:"string"},
            {id: "composition", header: ["Compositions", {content:"textFilter"}], fillspace: true, sort:"string"},
            {id: "groupCreationDate", header: ["Group creation date", {content:"textFilter"}], fillspace: true, sort:"date", format:webix.Date.dateToStr("%d-%m-%Y")},
            {id: "countryOfFoundation", header: ["Country of foundation", {content:"textFilter"}], fillspace: true, sort:"string"}
        ],
        url:"http://localhost:3000/groups",
        scheme:{
            // $init:function(obj){
            //     let indexOfT = obj.groupCreationDate.indexOf('T');
            //     obj.groupCreationDate = obj.groupCreationDate.slice(0,indexOfT);
            //     //obj.groupCreationDate = webix.i18n.parseFormatDate(obj.groupCreationDate);
            //     //alert(obj.groupCreationDate);
            // }
        },

        on: {
            //after select row display form with data for edit
            onAfterSelect: function (selection, preserve) {

                //let updatedata = $$("datasetA_datatable").getItem(selection.id);
                //$$("editdata_form").setValues(updatedata);
                //DatasetA.popup.show();

                webix.ui(this.popup).show();
                $$("editdata_form").bind($$("datasetA_datatable"));
            }
        },

        save:"rest->http://localhost:3000/groups"
    };
    private const editdata_form: webix.ui.formConfig = {
        view:"form",
        id:"editdata_form",
        elements:[
            {view:"text", label:'Group name', name:"groupName"},
            {view:"text", label:'Music style', name:"musicStyle"},
            {view:"text", label:'Compositions', name:"composition"},
            {view:"text", label:'Group creation date', name:"groupCreationDate", editor:"date"},
            {view:"text", label:'Country of foundation', name:"countryOfFoundation"},
            {id:"datasetA_save_editdata", view:"button", label:"Save", click:DatasetA.setDatasetA}
        ],
        // fillspace: true,
        on:{
            onAfterLoad:function(){
            }
        }
    };

    
}