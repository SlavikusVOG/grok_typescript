//import * as webix from "../libs/webix/types/webix";

export class ListOfRecords {
    private readonly albumsDataConfig: webix.DataCollectionConfig = {
        url: "http://localhost:3000/albums"
    };

    private readonly albumsData = new webix.DataCollection(this.albumsDataConfig);

    private readonly listConfig: webix.ui.listConfig = {
        id: "list_of_records",
        view: "list",
        template: "Group: #groupName#",
        select: true,
        on: {
            onAfterSelect: function (id) {
                (<webix.ui.datatable>webix.$$("list_of_records_datatable")).data.sync(this.albumsData, function(){
                    (<webix.ui.datatable>webix.$$("list_of_records_datatable")).filter(function(data){
                        return data.groupId == id;
                    });
                }, false);
            }
        }
    };

    private readonly templateDataConfig: webix.DataCollectionConfig = {
        url:"http://localhost:3000/template",
        id: "templateData"
    };

    private readonly templateData: webix.DataCollection = new webix.DataCollection(this.templateDataConfig);

    private readonly templateConfig: webix.ui.templateConfig = {
        id:"list_of_records_template",
        view:"template",
        template:"<div>Album photo: #album_img_src#</div>"
            + "<div>Group name: #groupName#</div>"
            + "<div>Album title: #album_title#</div>"
            + "<div>Title of each song: #song_names#</div>"
            + "<div>Awards: #awards#</div>",
        data: "data"
    };

    private readonly popupConfig: webix.ui.popupConfig = {
        view:"popup",
        id:"list_of_records_template_popup",
        head:false,
        body:webix.copy(this.templateConfig)
    };

    private readonly datatableConfig: webix.ui.datatableConfig = {
        id:"list_of_records_datatable",
        view:"datatable",
        select:"row",
        columns:[
            {id:"album_title", header:"Album"},
            {id:"release_date", header:"Release date", editor:"text"},
            {id:"number_of_songs", header:"Number of songs", editor:"text", fillspace: true},
            {id:"number_of_issued_copies", header:"Number of issued copies", editor:"text", fillspace: true},
            {id:"removal_basket", header:"Removal basket", editor:"text", fillspace: true}
        ],
        editable:true,
        on:{
            onAfterSelect: function(selection, preserve){
                //$$("list_of_records_template").load("http://localhost:3000/template");
                let listOfRecords = new ListOfRecords();
                (<webix.ui.template>webix.$$("list_of_records_template")).setValues(listOfRecords.getTemplateData().getItem(selection.id));
                (<webix.ui.popup>webix.$$("list_of_records_template_popup")).show();
            }
        }
    }

    private readonly viewConfig: webix.ui.layoutConfig = {
        id:"listOfRecordsView",
        view:"layout",
        rows:[
            this.listConfig,
            this.datatableConfig
        ]
    }

    public getView(): webix.ui.layoutConfig{
        return this.viewConfig;
    }

    getTemplateData(): webix.DataCollection{
        return this.templateData;
    }

    // showPopup(selection: any):void{
    //     (<webix.ui.template>webix.$$("list_of_records_template")).setValues(this.templateData.getItem(selection.id));
    //     (<webix.ui.popup>webix.$$("list_of_records_template_popup")).show();
    // }
}