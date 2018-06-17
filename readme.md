# Aventador

<img src="https://raw.githubusercontent.com/julienetie/img/master/aventador-small.png"  />

## High Performance Element Manipulation

**tl;dr** Aventador is a utility library for high-performance Element manipulations using vanilla JavaScript. 

### [Documentation](https://github.com/julienetie/aventador/blob/master/documentation.md)

### How it works
Aventador allows you to manage attribute and property manipulation using referenced elements from your 
favourite DOM manipulation framework/ view-layer library or directly via the DOM. The intention of Aventador is not to facilitate in manipulation of DOM "trees".

A common problem that occurs when manipulating DOM attributes and properties directly whilst using a DOM-diffing library is that removed or re-arranged elements can no longer be traced causing errors and additional complexities. Aventador approaches this problem using safe _elementWrappers_ as well as relying on _rehydration_ of the references via _lifecycle_ hooks when using a library that rearranges the DOM tree. 

### Why
Template based view layers are commonly responsible for DOM, attribute and property manipulation. 
This can sometimes be problematic for complex or advanced paradigms when building user interfaces for the
web. A better way to approach this is to separate the responsibilities.

#### Separation of concerns
We can separate web manipulation into two areas:

- A: DOM Tree modifications (writes): insertions, removals and rearrangements.
- B: Animations (reads | writes): attributes, properties, rendered dimensions. 

Aventador is the (B) concern that relives the duties of animations from (A) thus reducing the use of (A).
The advantage of this separation means:

- You can build highly optimised interfaces with smooth animations for advanced 
concepts beyond the limitations of your view-layer library (A).
- It becomes easier to build interfaces based on real-time bounding dimensions.
- Modify attributes and properties on the fly without DOM diffing.
- Reduce DOM tree manipulation.
- Batch read and write operations asynchronously for optimised performance 
using an internal implementation of promise extended [fastDOM](https://github.com/wilsonpage/fastdom).
- Action non-render-oriented tasks during idle periods using _.idle_, that takes advantate of requestIdleCallback
for supported browsers
- Use helper functions to aid your native code without sucking you into a 
limited architecture.

### Support & requirements
- Aventador can be used with or without a view-layer library.
- If you use a view-layer library it must feature a lifecycle hook before new mount.
- It requires no dependencies. 
- Supports all modern browsers, to support IE11 [click here](#).

#### Credits
- Aventador by [julien Etienne](https://github.com/julienetie)
- [fastDOM](https://github.com/wilsonpage/fastdom) by [Wilson Page](https://github.com/wilsonpage)

MIT 2018 © Julien Etienne
