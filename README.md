# Moody Gallery
Sample gallery implemented in TypeScript using pure DOM API.

Gallery challenge is a simple sample of using TypeScript in combination with browser DOM API.

##Approach
TypeScript offers a serie of features in order to bring OOP concepts into traditional Javascript. This simple and moody gallery implemmentation shows basically how OOP concepts can be used to develop robust and extensible Javascript components.

For just a sample of how OOP concepts on Javascript components, take a look at [SimpleMode class](https://github.com/Manfred-Diaz/gallery-challenge/blob/master/lib/gallery.ts#L31) and his descendant [ThumbnailMode class](https://github.com/Manfred-Diaz/gallery-challenge/blob/master/lib/gallery.ts#L107).

This classes show how using OOP constructs on Javascript most code can be reused. There are other implicit benefits of using an typed language, e.g: code completion as a form of documentation.

##Building
1. Install [nodejs](https://nodejs.org/download/).
2. Install latest [TypeScript compiler](http://www.typescriptlang.org/) (1.5.0-beta as time of writing)
3. Run tsc on lib directory.

##Sample
As show on [index.html](https://github.com/Manfred-Diaz/gallery-challenge/blob/master/index.html), gallery modes can be configured using __data-*__ attributes on nodes having __.gallery__ CSS class. 
