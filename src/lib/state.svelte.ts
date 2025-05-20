import { getContext, setContext } from "svelte";
import type { User } from "../app";


const USER_CTX = "USER_CTX";
export function setUserState(user: User) {
    const userState = $state<User>(user);
    setContext(USER_CTX, userState);
    return userState as User;
}

export function getUserState() {
    return getContext<User>(USER_CTX) as User;
}