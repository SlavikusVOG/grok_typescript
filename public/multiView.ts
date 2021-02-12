import * as webix from "../libs/webix/codebase/types/webix";
import { DatasetA } from "./datasetA";
import { DatasetB } from "./datasetB";
import { ListOfRecords } from "./listOfRecords";
import { Settings } from "./settings";

export class MultiView{
    private readonly datasetA = new DatasetA();
    private readonly datasetB = new DatasetB();
    private readonly listOfRecords = new ListOfRecords();
    private readonly settings = new Settings();
    private readonly mainMultiviewConfig: webix.ui.multiviewConfig = {
        id:"main_multiview",
        view:"multiview",
        cells:[
            this.datasetA.getView(),
            this.datasetB.getView(),
            this.listOfRecords.getView(),
            this.settings.init()
        ]
    }

}