import elementHelpersPartial from './element-methods-partial';
import { fastDOM } from './helpers';

/** 
 * The library function. 
 */
function Aventador() {}

/** 
 * Optimised reads.
 * @param {Function} callback.  
 * @return {number} job reference. 
 */
Aventador.read = (callback) => fastDOM.measure(() => callback());

/** 
 * Optimised writes.
 * @param {Function} callback.  
 * @return {number} job reference. 
 */
Aventador.write = (callback) => fastDOM.mutate(() => callback());


/** 
 * Kills a scheduled job.
 * @param {number} ref - job reference. 
 */
Aventador.kill = (ref) => fastDOM.clear(ref);

/** 
 * Get the nested selector for each element of an array.
 * @param {Array} elementArray.
 * @param {string} selector.
 * @returns {Array} new element array. 
 */
Aventador.queryEach = (elementArray, selector) =>
    elementArray.map(element => element.querySelector(selector));

/** 
 * Get the nested matching selectors for each element of an array.
 * @param{Array} elementArray.
 * @param{string} selector.
 * @returns{Array} new element array. 
 */
Aventador.queryEachAll = (elementArray, selector) =>
    elementArray.map(element => element.querySelectorAll(selector));

/** 
 * Get the matching ancestor for each element in an array.
 * @param{Array} elementArray.
 * @param{string} selector.
 * @returns{Array} new element array. 
 */
Aventador.eachClosest = (elementArray, selector) =>
    elementArray.map(element => element.closest(selector));

/** 
 * Generates an id as a universal unique identifier.
 * @param{number} The unique id. 
 * @param {string} prefix - prefix name for id. 
 * @returns {string} 
 */
const idPartial = () => {
    let id = -1;
    return (prefix = '', suffix = '') => {
        id++;
        const prefixed = prefix === '' ? id : prefix + ' ' + id;
        return suffix === '' ? prefixed : prefixed + ' ' + suffix;
    }
}
Aventador.id = idPartial();


// Aventador.abc = // String.fromCharCode(94 + 3);


/** 
 * The element property. 
 */
Aventador.e = function() {};

/** 
 * Register an element. 
 * @param{undefined} _ 
 * @param{string} key - Element name.
 * @param{Object} e - Element.  
 */
Aventador.register = new Proxy({}, {
    set(_, key, e) {
        Aventador.e[key] = elementHelpersPartial(key, e);
    }
})

window.Aventador = Aventador;


export default Aventador;