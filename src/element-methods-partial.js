import {fastDOM} from './helpers';
import { aquire, hypenatedToCamelCase } from './helpers';

/**
 * Optimised reads.
 * @param {Function} callback.  
 * @return {number} job reference. 
 */
const read = (callback) => fastDOM.measure(() => callback());

/** 
 * Optimised writes.
 * @param {Function} callback.  
 * @return {number} job reference. 
 */
const write = (callback) => fastDOM.mutate(() => callback());

/** 
 * Kills a scheduled job.
 * @param {number} ref - job reference. 
 */
const kill = (ref) => fastDOM.clear(ref);

/** 
 * The elementMethods partial.
 * @param{string} key - Element name.
 * @param{Object} e - Element.  
 * return {Function} elementMethods.
 */
export default function elementMethodsPartial(key, e) {

    /** 
     * The element interface. 
     * @param {Function} presentCallback - The callback to execute 
     * if the element exist. 
     * @param {Function} absentCallback - The callback to execute 
     * if the element dose not exist. 
     * @return {Object|*} The element or the executed callback's 
     * return value.
     */
    const elementMethods = (presentCallback, absentCallback) => {
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

    /** 
     * Optimised reads.
     * @param {Function} callback.  
     * @return {number} job reference. 
     */
    elementMethods.read = (callback) => fastDOM.measure(() => callback(e));

    /** 
     * Optimised writes.
     * @param {Function} callback.  
     * @return {number} job reference. 
     */
    elementMethods.write = (callback) => fastDOM.mutate(() => callback(e));

    /** 
     * Kills a scheduled job.
     * @param {number} ref - job reference. 
     */
    elementMethods.kill = (ref) => fastDOM.clear(ref); 
   
    /** 
     * Get a selector with a unique id by given identifier names.
     * @param {string} idSelector..
     * @returns {Array} new element array. 
     */
    elementMethods.queryId = (idSelector) => {
        const selector = idSelector[0] === '#' ? idSelector.slice(1) : idSelector;
        return Array.from(e.querySelectorAll(`[id^=${selector} ]`))
    };

    /** 
     * Get children as an Array.
     * @returns {Array} new element array. 
     */
    elementMethods.children = () => Array.from(e.children);
    
    /** 
     * Get childNode as an Array.
     * @returns {Array} new element array. 
     */
    elementMethods.childNode = () => Array.from(e.childNode);
    
    /** 
     * querySelector shorthand.
     * @param {string} selector.
     * @return {Object} element. 
     */
    elementMethods.query = (selector) => e.querySelector(selector);

    /** 
     * querySelectorAll as an Array
     * @param {string} selector.
     * @returns {Array} new element array. 
     */
    elementMethods.queryAll = (selector) => Array.from(e.querySelectorAll(selector));
    
    /** 
     * Get siblings Array
     * @returns {Array} new element array. 
     */
    elementMethods.siblings = () => Array.from(e.parentElement.children)
        .filter(element => element !== e);

    /** 
     * Get siblings Key Entries
     * @returns {Array} new element array. 
     */ 
    elementMethods.siblingsKeys = () => Array.from(e.parentElement.children)
        .reduce((acc, element, i) => {
            if (element !== e) {
                acc.push([element, i]);
            }
            return acc;
        }, []);

    /** 
     * Get specific ancestor by generation.
     * @param {number} level - the generation by depth.
     * @returns {Object} element. 
     */
    elementMethods.ancestor = (level) => {
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

    /** 
     * Assign styles by object sources.
     * @param {...Object} sources - A list of objects to be assigned.
     */
    elementMethods.style = (...sources) => void aquire(e.style, ...sources);

    /** 
     * Gracefully transition the zIndex of an element.
     * @param {Object} style - The style transformations to apply. 
     * @param {number} zIndex - The elevation level by z-index.
     * @callback {Function} callback - Transition end callback.
     */
    elementMethods.elevate = (style, zIndex, callback) => {
        e.addEventListener("transitionend", e => {
            // 2. update zIndex 
            Aventador.write(() => {
                aquire(e.style, { zIndex })
                // 3. Action callback                
                callback(e);
            });
        }, false);
        // 1. Set style.
        Aventador.write(() => void aquire(e.style, style));
    }

    /**  
     * Dataset shorthand.
     * This is property is not read or write optimised. 
     */
    // elementMethods.data = typeof e === 'object' ? e.dataset : {};
    
    // /**  
    //  * Removes a given dataset.
    //  * @param {string} dataKey - The dataset attribute. 
    //  */
    // elementMethods.dataRemove = (dataKey) => Aventador.write(() => e.removeAttribute(`data-${datakey}`));

    // /** 
    //  * Toggle the dataKey.
    //  * @param {string} dataKey - The dataset attribute to toggle. 
    //  */
    // const dataTogglePartial = () => {
    //     let add = true;
    //     return (dataKey) => {
    //         Aventador.write(() => {
    //             if (add) {
    //                 e.dataset[hypenatedToCamelCase(dataKey)] = '';
    //                 add = false
    //             } else {
    //                 elementMethods.dataRemove(dataKey);
    //                 add = true;
    //             }
    //         })
    //     }
    // }
    // elementMethods.dataToggle = dataTogglePartial();

    // /** 
    //  * Cycles throught an array of values infinitely to set as a dataset value.
    //  * @param {string} dataKey - The dataset attribute to target.
    //  * @param {...string} values - The values to toggle. 
    //  */
    // const dataCyclePartial = () => {
    //     let index = 0;
    //     return (dataKey, ...values) => {
    //         Aventador.write(() => {
    //             e.dataset[hypenatedToCamelCase(dataKey)] = values[index];
    //             if (index < values.length - 1) {
    //                 index++;
    //             } else {
    //                 index = 0;
    //             }
    //         })
    //     }
    // }
    // elementMethods.dataCycle = dataCyclePartial();
    return elementMethods;
}