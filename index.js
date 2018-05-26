const Aventador = function(){
}

/** 
 * Generates id method.
 */
const idPartial =() => {
  let id = -1;
  /** 
   * Generates an id as a universal unique identifier.
   * @param {string} prefix - prefix name for id.
   * @returns {string} 
   */
  return (prefix = '') => {
       id++;
       return prefix === '' ? id  : prefix + ' ' + id;
    }
}

Aventador.id = idPartial();
