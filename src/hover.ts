import {ref} from "vue";


export function useHoveredAndPressed(elem: HTMLElement | null, keys: string[]) {

    let element: HTMLElement | null = elem;
    const isHovered = ref<boolean>(false);
    const isKeyPressed = ref<boolean>(false);
    const isSpecifiedKeyPressed = ref<boolean>(false);

    function checkCondition(event: KeyboardEvent) {
        const meta = keys.includes('meta');
        const ctrl = keys.includes('ctrl');
        const alt = keys.includes('alt');
        const shift = keys.includes('shift');

        const requiresSpecialKey = meta || ctrl || alt || shift;
        const specialKeysPressed = (meta && event.metaKey) || (ctrl && event.ctrlKey) || (alt && event.altKey) || (shift && event.shiftKey);

        const result = isKeyPressed.value && (requiresSpecialKey ? specialKeysPressed : keys.includes(event.key));

        if (result !== isSpecifiedKeyPressed.value) {
            isSpecifiedKeyPressed.value = result;
            console.log(requiresSpecialKey, specialKeysPressed, isSpecifiedKeyPressed.value);
        }
    }

    function init(elem: HTMLElement | null) {
        element = elem ?? element;
        console.log(element);

        // Mouse hover tracking
        element?.addEventListener("mouseenter", () => isHovered.value = true);
        element?.addEventListener("mouseleave", () => isHovered.value = false);

        // Key press tracking
        document.addEventListener("keydown", (event) => {
            isKeyPressed.value = true;
            checkCondition(event);
        });

        document.addEventListener("keyup", () => {
            isKeyPressed.value = false;
            isSpecifiedKeyPressed.value = false;
        });
    }

    return {
        init,
        isHovered,
        isKeyPressed,
        isSpecifiedKeyPressed,
    }
}