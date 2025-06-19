import type { UserSettings } from "../../app";
import { BaseStore } from "./baseStore";

export class SettingStore extends BaseStore<UserSettings> {
    constructor() {
        super();
    }
}
