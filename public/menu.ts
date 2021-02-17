import * as webix from "../libs/webix/codebase/types/webix";
import { MultiView } from "./multiView";

export class Menu{
    private readonly data: any = [
        { id: "datasetA_view", value: "Dataset A"},
        { id: "datasetB_view", value: "Dataset B"},
        { id: "listOfRecordsView", value: "List of records"},
        { id: "settings_view", value: "Settings"}
    ];

    private readonly mainSidebarConfig: webix.ui.sidebarConfig = {
        id: "main_sidebar",
        view: "sidebar",
        data: this.data,
        css: "webix_dark",
        activeTitle: true,
        multipleOpen: true,
        on: {
            onAfterSelect: function(id){
                (<webix.ui.multiview>webix.$$("main_multiview")).setValue(id);
            }
        }
    }

    public createSideBar(): webix.ui.sidebar{
        return <webix.ui.sidebar> webix.ui(this.mainSidebarConfig);
    }
}

