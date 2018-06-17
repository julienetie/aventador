# Aventador API

Optimised reads

```javascript
Aventador.read(() => {}); 
```
Optimised writes

```javascript
Aventador.write(() => {});
```

Kills a scheduled job. 

```javascript
Aventador.kill(<ref>); 
```

Register an element.
```javascript
   Aventador.register.menuBar = document.querySelector('.menubar');
```

Get Element 
```javascript
const menuBar = Aventador.e.menuBar();
```

Action callback if present

```javascript
Aventador.e.menuBar(({write}) => {
    write(e => void e.style.background = 'yellow');
});
```
Action callback if absent 

```javascript
Aventador.e.menuBar(({write}) => {
    write(e => void e.style.background = 'yellow');
},({e}) => {
    console.log('Element is absent');
});
```

Get unique id by given names.

```javascript
Aventador.e.menuBar.queryId('first-second') // An array of Ids that start with "first-second ?"
```
Optimised reads

```javascript
Aventador.e.menuBar.read(e => void console.log(e.style.height)) 
```
Optimised writes

```javascript
Aventador.e.menuBar.write(e => void e.style.height = '200px')); 
```

Kill a read/ write job

```javascript
Aventador.e.menuBar.kill(<ref>); 
```

Get children as an Array
```javascript
Aventador.e.menuBar.children(); 
```

Get childNodes as an Array
```javascript
Aventador.e.menuBar.childNodes(); 
```

querySelector as an Array
```javascript
Aventador.e.menuBar.query(); 
```

querySelectorAll as an Array
```javascript
Aventador.e.menuBar.queryAll(); 
```

Get siblings Array
```javascript
Aventador.e.menuBar.siblings(); 
```

Get siblings Key Entries
```javascript
Aventador.e.menuBar.siblingsKeys(); 
```

Get specific ancestor by generation
```javascript
Aventador.e.menuBar.ancestor(4); 
```

Get the nested selector for each element of an array 
```javascript
Aventador.queryEach(arrayOfElements, '.some-selector');
```

Get the nested selectors for all for each element of an array 
```javascript
Aventador.queryEachAll(arrayOfElements, '.some-selector');
```

Get the matching ancestor selector for each element of an array 
```javascript
Aventador.eachClosest(arrayOfElements, '.some-selector');
```
Assign styles by objects. 

```javascript
Aventador.e.menu.style(...sources);
```

Change the layer level of an element using a transition. 
```javascript
Aventador.e.menu.elevate(style, zIndex, callback);
```
(vanilla) Custom unique ids
```javascript
const fruits = ['apple','banana','pear'];
`some-id ${fruits[i]}`; // This is too simple for an API 
```
Unique Ids: Treated similar to classes.
```javascript
import {id} from Aventador;
`some-id ${id(<prefix>, <suffix>)}`; 
// Optional prefix and suffix separated by a space.
```

Toggle a data attribute without a value.
```javascript
Aventador.e.menu.dataToggle('hello-world') 
// Toggles   'hello-world' and removes.
```

Toggle a data attribute without a value.
```javascript
Aventador.e.menu.dataCycle('currency', 'valA', 'valB', 'valC') 
// cycles though values
```
 



Remaining:
```javascript 
Aventador.abc(i) // creates capital letter based id prefixes via increment,  
Aventador.e.menu.getDecendants('.some-selector') // An array of decedents to a specific selector

// afterRender. 
Aventador.registerRect().menuBar = document.querySelector('.menubar');
Aventador.registerRect('width','top').menuBar = document.querySelector('.menubar');

// code base.
Aventador.e.menuBar.rect.width / bottom / top/ left / right / width / height

// afterRender. 
Aventador.registerCompute('width','top').menuBar = document.querySelector('.menubar');

// code base.
Aventador.e.menuBar.compute.backgroundColor 

// afterRender.  only stored once and cached 
Aventador.registerDefaultCompute('width','top').menuBar = document.querySelector('.menubar');

// code base.
Aventador.e.menuBar.defaultCompute.backgroundColor 


// Store window dimensions  (afterRender)
Aventador.storeViewDimensions();
Aventador.storeViewDimensions('height', 'ratio');

// Get last view dimensions
Aventador.view.width
Aventador.view.height
Aventador.view.ratio
Aventador.view.orientation

// rem to pixel 
Aventador.r.px(1) // 16
Aventador.r.PX(1) // '16px'
Aventador.r.PX('1rem') // '16px'

// pixel to rem 
Aventador.px.r(16) // 1
Aventador.px.R(16)  // '1rem'
Aventador.px.R('16px')  // '1rem'

// Percent to px  (Uses last window dimension to calculate pixels)
Aventador.pc.px(20)  // 1920 / 100 * 20 = 184
Aventador.pc.PX(20)  // '184px';
Aventador.pc.PX('20%')  // '184px';

// Percent to rem  (Uses last window dimension to calculate rem)
Aventador.pc.r(20)  // 1920 / 100 * 20 /16  = 24
Aventador.pc.R(20)  // '24rem';
Aventador.pc.R('20%')  // '24rem';

// Pixel to percent  (Uses last window dimension to calculate rem)
Aventador.px.pc(100)  // 5
Aventador.px.PC(20)  // '5%';
Aventador.px.PC('20px')  // '5%';

// Rem to percent  (Uses last window dimension to calculate rem)
Aventador.r.pc(4.8)  // 5
Aventador.r.PC(4.8)  // '5%';
Aventador.r.PC('4.8rem')  // '5%';

// all above 
Aventador.xxx(4.843654654,3)  // 4.843;
Aventador.xxx(4.843654654,'3.ceil')  // 4.844;
Aventador.xxx(4.843654654,'3.floor')  // 4.84;


// Delay using request Animation Frame
Aventador.delay

// Debounce using request Animation Frame
Aventador.debounce

// Throttle using request Animation Frame
Aventador.throttle

// once 
Aventador.once('something' + blah); 

// Flush once
Aventador.once.flush('something' + blah);

// Flush all 
Aventador.once.flushAll();

// write
Aventador.write().then();
Aventador.e.footer.write().then();

// Read
Aventador.read().then();
Aventador.e.footer.read().then();

// Idle (requestIdleCallbackShim)
Aventador.idle().then()


// Kill Idle callback (requestIdleCallbackShim)
Aventador.killIdle()

```