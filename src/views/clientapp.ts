// import * as webix from "../../libs/webix/types/webix";

// import webix from "../../libs/webix/types/webix";

import webix from "webix";

import { Menu } from "./menu";
// import { DatasetA } from "./datasetA";
// import { DatasetB } from "./datasetB";
// import { ListOfRecords } from "./listOfRecords";
// import { Settings } from "./settings";
import { MultiView } from "./multiView";

class ClientApp {
    private readonly menu = new Menu();
    // private readonly datasetA = new DatasetA();
    // private readonly datasetB = new DatasetB();
    // private readonly listOfRecords = new ListOfRecords();
    // private readonly settings = new Settings();
    private readonly multiView = new MultiView();

    init(): void{
        const mainSidebar: webix.ui.sidebar = this.menu.createSideBar();
        const mainMultiView: webix.ui.multiview = this.multiView.createMultiView();
    }
}

let app = new ClientApp();
app.init();