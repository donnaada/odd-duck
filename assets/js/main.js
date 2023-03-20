// 'use strict';

/**  TODO: Create a constructor function that creates an object associated with each product, and has the following properties:
    - Name of the product
    - File path of image
    - Times the image has been shown
*/

function RenderDucks(srcName, source){
  let timesShown =0;
  this.sourceName = srcName;
  this.sourcePath = source;
}

new RenderDucks('srcName', 'source');

/**TODO:
  * Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
*/
