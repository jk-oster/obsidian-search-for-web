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
        }
    }

    const onMouseEnter = () => { isHovered.value = true; };
    const onMouseLeave = () => { isHovered.value = false; };
    const onKeyDown = (event: KeyboardEvent) => { isKeyPressed.value = true; checkCondition(event); };
    const onKeyUp = () => { isKeyPressed.value = false; isSpecifiedKeyPressed.value = false; };

    function cleanup() {
        element?.removeEventListener("mouseenter", onMouseEnter);
        element?.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("keyup", onKeyUp);
    }

    function init(newElem: HTMLElement | null) {
        cleanup();
        element = newElem ?? element;

        element?.addEventListener("mouseenter", onMouseEnter);
        element?.addEventListener("mouseleave", onMouseLeave);

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
    }

    return {
        init,
        cleanup,
        isHovered,
        isKeyPressed,
        isSpecifiedKeyPressed,
    }
}
