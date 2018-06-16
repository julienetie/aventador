########
Aventador
########

.. image:: https://raw.githubusercontent.com/julienetie/img/master/aventador-small.png

   
High performance DOM interface
#################################################

Aventador is a small DOM manipulation library to accompany vanilla JS usage. 
It can be described as an optimised flow-control system for diffed elements and DOM manipulation.
If that makes no sense, it's just a bunch of helper functions to make fast UI updates. 


How it works
============

The majority of front-end JavaScript frameworkd revolve around the idea of updating the DOM by templates. 
This leads to unnatural manipulation of the DOM by inserting and removing elements as a form of animation.
Aventador is not a virtual DOM, instead it should accompany a virtual-dom or DOM-engine using the following
principles:

- When a DOM-engine creates new nodes the references to specific nodes should be assigned using the **register** method. This should occure before the new nodes are inserted into the DOM.

- This means that every time the reference of a node is updated, *Aventador* will update the corresponding **elementMethod**.

- If the updated node is not available *(null)*, the **elementMethod** will have an element value of null and will only action the **absentCallback** rather than the **presentCallback** which is called when the element exist. 

- Elements that move around within a nodeTree can be tracked using the attribute **id** via id and **uniqueId** values.

- Aventador includes fastDOM for optimised **read** and **write** methods. These methods should be used when reading from the DOM and writing to the DOM respecitvely.




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

