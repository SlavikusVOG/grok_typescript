import * as webix from "../libs/webix/codebase/types/webix"

export class DatasetB{
    private readonly datatableConfig: webix.ui.datatableConfig = {
        id:"datasetB_datatable",
        view:"datatable",
        columns:[
            {id:"groupMemberName", header: "Group member name", editor:"text"},
            {id:"roleInTheGroup", header: "Role in the group", width:150, editor:"text"},
            {id:"dateOfBirth", header: "Date of birth", editor:"date"},
            {id:"countryOfBirth", header: "Counrty of birth", editor:"text"},
            {id:"awards", header: "Awards", editor:"text"}
        ],
        select:"row",
        editable:true,
        scroll:"y",
        datafetch:50,//default
        loadahead:100,
        url:"http://localhost:3000/artists",
    };

    private readonly layoutConfig: webix.ui.layoutConfig = {
        id:"datasetB_view",
        view:"layout",
        rows:[
            this.datatableConfig,
        ]
    }

    public getView(): webix.ui.layoutConfig{
        return this.layoutConfig;
    }
}