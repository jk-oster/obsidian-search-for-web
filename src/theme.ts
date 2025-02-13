export function detectPreferredColorScheme() {
    if (!window.matchMedia) {
        return 'light';
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return 'dark';
    }
    return 'light';
}

/**
 * Determine if a color is a light color
 * @see https://gist.github.com/krabs-github/ec56e4f1c12cddf86ae9c551aa9d9e04
 */
export function isLightColor(color: string): boolean {
    let r, g, b;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
        // If HEX --> store the red, green, blue values in separate variables
        const rgb = color.match(
            /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
        );

        if (!rgb) {
            throw new Error('Invalid color for color "' + color + '"');
        }

        r = rgb[1];
        g = rgb[2];
        b = rgb[3];
    } else {
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        const hexColor = +(
            // @ts-ignore
            '0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&')
        );

        r = hexColor >> 16;
        g = (hexColor >> 8) & 255;
        b = hexColor & 255;
    }

    // HSP equation from http://alienryderflex.com/hsp.html
    const hsp = Math.sqrt(0.299 * (Number(r) * Number(r)) + 0.587 * (Number(g) * Number(g)) + 0.114 * (Number(b) * Number(b)));

    // Using the HSP value, determine whether the color is light or dark
    // > 127.5 is 'light', <= 127.5 is 'dark'

    return hsp > 127.5;
}

export function getColorSchemeBasedOnChildBgColor(element: Element) {
    const coloredChildElement = findFirstNonTransparentChild(element);

    const colorScheme = getComputedStyle(coloredChildElement, null).colorScheme;
    if (colorScheme === 'dark') {
        return 'dark';
    }

    const bodyBgColor = getComputedBackgroundColor(coloredChildElement);
    const isLight = isLightColor(bodyBgColor);
    console.log(element, colorScheme, bodyBgColor, isLight);
    if (isLight) {
        return 'light';
    }
    return 'dark';
}

export function getColorSchemeBasedOnParentBgColor(element: Element) {
    const coloredParentElement = findClosestNonTransparentParent(element);

    const colorScheme = getComputedStyle(coloredParentElement, null).colorScheme;
    if (colorScheme === 'dark') {
        return 'dark';
    }

    const bodyBgColor = getComputedBackgroundColor(coloredParentElement);
    const isLight = isLightColor(bodyBgColor);
    console.log(element, bodyBgColor, isLight);
    if (isLight) {
        return 'light';
    }
    return 'dark';
}

export function getComputedBackgroundColor(element: Element): string {
    return getComputedStyle(element, null).backgroundColor;
}

export function isComputedBackgroundInvisible(element: Element): boolean {
    const computedStyle = getComputedStyle(element, null);
    return computedStyle.visibility === 'hidden' ||
        computedStyle.display === 'none' ||
        computedStyle.opacity == '0' ||
        computedStyle.backgroundColor === 'transparent' ||
        computedStyle.backgroundColor === 'rgba(0, 0, 0, 0)';
}

export function findClosestNonTransparentParent(element: Element): Element {
    console.log('parent', element, isComputedBackgroundInvisible(element));
    if (!isComputedBackgroundInvisible(element)) {
        return element;
    } else if (element.parentElement && element.tagName !== 'BODY') {
        return findClosestNonTransparentParent(element.parentElement);
    } else if (element.tagName === 'BODY') {
        document.body.style.backgroundColor = '#ffffff';
    }
    return element;
}

export function findFirstNonTransparentChild(element: Element = document.body) {
    const firstSelectableChild = element.firstElementChild;
    console.log('child', element, isComputedBackgroundInvisible(element));
    if (!isComputedBackgroundInvisible(element)) {
        return element;
    } else if (firstSelectableChild) {
        return findFirstNonTransparentChild(firstSelectableChild);
    }
    return element;
}

export function setColorScheme(element: Element | null, theme: 'dark' | 'light') {
    if (theme === 'dark') {
        element?.classList.add('dark');
    } else {
        element?.classList.remove('dark');
    }
}