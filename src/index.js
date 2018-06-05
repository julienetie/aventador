import fastdom from 'fastdom';

console.log(fastdom)

function Aventador() {

}

// Aventador.read = fastdom.measure
Aventador.read = (callback) => fastdom.measure(callback());
Aventador.write = (callback) => fastdom.mutate(callback());
Aventador.kill = (ref) => fastdom.clear(ref);
Aventador.e = function() {};
Aventador.queryEach = (elementArray, selector) => elementArray.map(element => element.querySelector(selector));
Aventador.queryEachAll = (elementArray, selector) => elementArray.map(element => element.querySelectorAll(selector));
Aventador.eachClosest = (elementArray, selector) => elementArray.map(element => element.closest(selector));

function elementHelpersPartial(target, key, e) {
    const read = (callback) => fastdom.measure(callback(e));
    const write = (callback) => fastdom.mutate(callback(e));
    const kill = (ref) => fastdom.clear(ref);
    const queryId = (idSelector) => {
        const selector = idSelector[0] === '#' ? idSelector.slice(1) : idSelector;
        return Array.from(e.querySelectorAll(`[id^=${selector}-]`))
    };

    const elementHelpers = (presentCallback, absentCallback) => {
        const isElement = e instanceof Element;
        // e.element()
        if (presentCallback === undefined && isElement) {
            return e;
        }
        // e.element(e=> e.doSomething)
        if (typeof presentCallback === 'function' && isElement) {
            return presentCallback({ e, read, write, kill });
        }
        // e.element(e=> e.doNothing, e.doSomething)
        if (typeof absentCallback === 'function' && !isElement) {
            return absentCallback({ e: null, read, write, kill });
        }
    }
    elementHelpers.queryId = queryId;
    elementHelpers.read = read;
    elementHelpers.write = write;
    elementHelpers.kill = kill;
    elementHelpers.children = () => Array.from(e.children);
    elementHelpers.childNode = () => Array.from(e.childNode);
    elementHelpers.query = (selector) => Array.from(e.querySelector(selector));
    elementHelpers.queryAll = (selector) => Array.from(e.querySelectorAll(selector));
    elementHelpers.siblings = () => Array.from(e.parentElement.children)
        .filter(element => element !== e);
    elementHelpers.siblingsKeys = () => Array.from(e.parentElement.children)
        .reduce((acc, element, i) => {
            if (element !== e) {
                acc.push([element, i]);
            }
            return acc;
        }, []);
    elementHelpers.ancestor = (level) => {
        let count = -1
        const getParent = (element) => {
            count++;
            const parent = element.parentElement;
            if (count === level) {
                return parent;
            } else {
                getParent(parent);
            }

        }
        return getParent(e);
    }


        return elementHelpers;
}

Aventador.register = new Proxy({}, {
    set(target, key, e) {
        Aventador.e[key] = elementHelpersPartial(target, key, e)
    }
})



window.Aventador = Aventador;