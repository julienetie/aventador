# aventador


########
Aventador
########

.. image:: https://raw.githubusercontent.com/julienetie/img/master/6d98d729c1ab1cbd1b4ef94612117bbe_red-bull-clipart-spanish-bull-pencil-and-in-color-red-bull-spanish-bull-drawing_1023-775.png

   
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
      current:30,
      dormant:0,
      postDormant:1
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
   * - zIndexes
     - Object
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
