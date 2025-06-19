//setContext for user settings
import { getContext, setContext } from "svelte";
import { SettingStore } from "$lib/store/settingStore";

const USER_SETTINGS_CTX = Symbol('userSettings');

export const setUserSettingStore = () => {
    const userSettingStore = new SettingStore();
    const userSettingState = $state<SettingStore>(userSettingStore);
    return setContext(USER_SETTINGS_CTX, userSettingState);
}

export const getUserSettingStore = () => {
    return getContext<SettingStore>(USER_SETTINGS_CTX) as SettingStore
}