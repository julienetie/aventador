import fastdom from 'fastdom';
import fastdomPromised from 'fastdom/extensions/fastdom-promised.js';

/** 
 * Utilises fastDOM extended by native Promises.  
 */
export const fastDOM = fastdom.extend(fastdomPromised);

/** 
 * Converts a hypenated string into camel-case
 * @param {string}
 * @return {string} Camel-cased string. 
 */
export const hypenatedToCamelCase = string => string.replace(/-([a-z])/g, g => g[1].toUpperCase());

/** 
 * @author Julien Etienne. 
 * {@link https://github.com/julienetie}.
 * @param {Object} target - Target object to aquire properties of sources.
 * @param {...Object|...String} sources - The objects or strings to be assigned.
 * @return {Object} The target object.
 */
export const aquire = (target, ...sources) => {
    const sourcesLength = sources.length;
    for (let i = 0; i < sourcesLength; i++) {
        const source = sources[i];
        if (typeof source === 'object' || typeof source === 'string') {
            const keys = Object.keys(source);
            const keysLength = keys.length;
            for (let j = 0; j < keysLength; j++) {
                const key = keys[j];
                target[key] = source[key];
            }
        } else {
            return target;
        }
    }
    return target;
}
