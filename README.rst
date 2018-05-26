# aventador


########
Aventador
########

.. image:: https://raw.githubusercontent.com/julienetie/img/master/aventador-small.png

   
A framework for high performance web interactions
#################################################

Aventador is a library framework and set of methodologies to create high performance animations without compromise. 


Domain Transitions
##################

domain-name:
============

.. code:: css

   data-domain-name
  

A domai-name refres to a pages, view, layer, or screen that displays content.
The domain-name is used to scope user interfaces and content from the remainder.

setDomain:
==============

.. code:: javascript

   Aventador.setDomain('page-1')
   .style({opacity: 1, width: '100%'})
   .zIndexes({
      current: () => {}, 
      dormant: () => {},
      postDormant: () =>{}
   });
   
setDomain sets a page as the default. It sets supplied domain name as the internal
"current" domain. The stylesheet is responsible for the inital transform. 

In the above example zIndexes defines the zIndex of layers that are to be viewed,
dormant and layers transitioning from dormant.

.. list-table:: setDomain options
   :widths: 15 10 30 50 50
   :header-rows: 1

   * - Method
     - Type
     - Description
     - Omitted method
     - Ommited value
   * - setDomain
     - string
     - Sets the default domain
     - Not Allowed
     - Not Allowed
   * - style
     - Object
     - Sets specific transitioning styles
     - Changes z-index without CSS 
     - Not allowed
   * - zIndexes
     - Function
     - Sets the zIndexes of transition states
     - z-index styles are not affected
     - Not allowed

toDomain:
============

.. code:: javascript

   Aventador
   .toDomain('page-2').style({opacity: 1, width: '80%', zIndex: 50})
   .onTransitionEnd(()=> // do something);
  
toDomain will allow you transition from one page to another. 
The stylesheet is responsible for absent transforms. TransitionEnd triggers a callback
once the "transitioning to" page has finished transitioning.

The purpose of Aventador's Domain Transitons is to create a seamless transition between two major layers. 

.. list-table:: toDomain options
   :widths: 15 10 30 50 50
   :header-rows: 1

   * - Method
     - Type
     - Description
     - Omitted method
     - Ommited value
   * - domainTo
     - string
     - Sets the next domain
     - NA
     - Not Allowed
   * - style
     - Object
     - Sets specific transitioning styles
     - Changes z-index without CSS 
     - Not allowed

currentDomain:
==============

.. code:: javascript

   Aventador.currentDomain

currentDomain is a read-only property that returns the current domain name. 

.. list-table:: currentDomain options
   :widths: 15 10 30 50
   :header-rows: 1

   * - Method
     - Description
     - Return Type
     - Ommited value
   * - currentDomain
     - NA
     - Returns the current domain name
     - String


Requisites
==========

    .. line-block::

        CSS: Each domain must have at least the following:

.. code:: css

   {
     position: absolute;
     transition: ?;
     z-index: <equal to dormant zIndex>;
   }
   
   [data-domain-current]{
    z-index: ?
   }
   
   [data-domain-dormant]{
    z-index: ?;
   }
   
   [data-domain-post-dormant]{
    z-index: ?;
   }

@TODO add tables

DOMContentLoaded initializations
##################

Whilst the DOM is rendering there may be jittery and unexpcted bheaviors within a component. Aventador resolves this by 
allowing the inital state to be set via CSS (or in-line JavaScript) and then revealed within DOMContentLoaded.

.. code:: javascript

   document.addEventListener("DOMContentLoaded", e => {
      Aventador.domainName.componentName.set('fade-in') // data-fade-in
   });


Registering elements
##################

There are two ways to register an element. You can supply the unique #id attribute or pass in an Element.

.. code:: javascript

   // Register a domain
      Aventador.getDomain('page-1')
      // Aventador.page1
      Aventador.getDomain('page-2', someElement); // by element 
      // Aventador.page2
      
   // Register a unique domains
      Aventador.getDomains('pages 0'); 
      Aventador.getDomains('pages 1');
      // Aventador.pages     // Affects both pages
      
      Aventador.getDomains('pages', nodeList);
      // Aventador.pages     // Affects all in nodeList
  
   // Register a component
      Aventador.getComponent('side-bar');
      // Aventador.sideBar
      Aventador.getComponent('side-bar', someElement);
      // Aventador.sideBar
      
     // Register a unique component
      Aventador.getComponents('side-bars left'); 
      Aventador.getComponents('side-bars right');
      // Aventador.sideBars     // Affects both components
      
      
Attribute conventions
####################

.. code:: html

  <!-- Use id attributes to register unique components and domains -->
       #main-content                 // .mainContent
      
  <!-- Use id attributes to register common components and domains
       Only the first part is used as the collection name -->
       #common-components one        //  commonComponents
       #common-components two        //  commonComponents
      
   <!-- Use data attributes to affect state via CSS without a value -->
       data-display                  //  showContent
      
   <!-- Only use classes for CSS styling -->
       .use-lower-case-hyphens

Generate id UUID
####################

.. code:: javascript

   Aventador.id()
   
"id" will generate a universal unique identifier to be optionally used when creating ids within a JavaScript view layer library.
The id will start from 0. It should not be used in an hardcoded manner as it is expected to change throughout your project's lifespan.

.. code:: javascript

   <li id={`list-item ${id()}`}>some list item</li> // list-item 0
   
   <li id={`list-item ${id('ref-')}`}>some list item</li> // list-item ref-0
   
Avoiding markdown clashes
==========

To prevent an id clash, register all id's in the HTML document before generating a UUID 
