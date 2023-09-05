import {ShortcutMap} from "@/contexts/KeyboardContext";


export const registerShortcuts = (shortcutMap: ShortcutMap) => {
    const handleKeyPress = (event: KeyboardEvent) => {
        const keyCombination = getShortcutCombination(event);

        const handler = shortcutMap[keyCombination];
        if (handler) {
            handler(event);
        }
    };

    document.addEventListener("keydown", handleKeyPress);

    // Function to clean up the event listener
    return () => {
        document.removeEventListener("keydown", handleKeyPress);
    };
};

const getShortcutCombination = (event: KeyboardEvent): string => {
    let keys = [];

    if (event.ctrlKey) keys.push("ctrl");
    if (event.altKey) keys.push("alt");
    if (event.shiftKey) keys.push("shift");

    keys.push(event.key.toLowerCase());

    return keys.join("+");
};