# Loading Strategies for Web Fonts -  Demo

### About
This repository is a supplement to my degree project in Computer Science (2DV50E). It's primary purpose is to demonstrate how resource prioritization approaches like Preload and HTTP/2 Push can be used to optimize the delivery of web fonts for first-time visitors.

The selected strategies builds upon a font loading strategy called Critical Flash Of Faux Text, that Zach Leatherman writes about in his article [A COMPREHENSIVE GUIDE TO FONT LOADING STRATEGIES] 


## Abstract - Thesis
According to the HTTP Archive, 75% of websites are using web fonts. Multiple
conditions have to be met before modern web browsers like Chrome, Firefox
and Safari decide to download the web fonts needed on a page. As a result, web
fonts are late discovered resources that can delay the First Meaningful Paint
(FMP). Improving the FMP is relevant for the web industry, particularly for
performance-conscious web developers. This paper gives insight into how the
resource prioritization approaches HTTP/2 Preload and HTTP/2 Server Push can
be used to optimize the delivery of web fonts for first-time visitors. Five font
loading strategies that use HTTP/2 Server Push and/or Preload were implemented
on replicas of the landing pages from five real-world websites. The font loading
strategies were evaluated against each other, and against the non-optimized
version of each landing page. All the evaluated font loading strategies in this
degree project improved the time it took to deliver the first web font content to
the user’s screen, resulting in a faster FMP. It was also discovered that HTTP/2
Server Push, on its own, is not a more performance efficient resource prioritization
approach than HTTP/2 Preload when it comes to delivering web font content to
the client. Further, HTTP/2 Server Push and HTTP/2 Preload appears to be more
efficient when used together, in the context of optimizing the delivery of web font
content. However, all conclusions in this paper are based on the results gathered
from testing the font loading strategies in an emulated environment and are yet to
be confirmed on actual mobile devices with real network conditions. 

Link to full thesis: (available soon)


## Instructions

1. Install [Node.js](http://nodejs.org/) (10.5.0 or later)

1. Clone this repository
   ```sh
   $ git clone https://github.com/mia-nygren/2DV50E-loading-strategies-for-web-fonts-demo.git 
   ```

1. Navigate to the project folder
   ```sh
   $ cd loading-strategies-for-web-fonts-demo
   ```

1. Install dependencies
   ```sh
   $ npm install
   ```

1. Run the demo
   ```sh
   $ npm start
   ```

1. Open <http://localhost:8000> in Google Chrome to view the demo  
    *You can change the port in server/config/index.js*
* * *
## USAGE -  Example

1.  Open this demo in Google Chrome Web browser
    *   If you haven't already - Fait le!
2.  Go to a strategy of your choice
    *   See [Strategies](/#strategies)
3.  Open Chrome DevTools
    *   Right click on the page and choose 'Inspect'
4.  Go to the Networks tab
    *   Set the network throttling profile to Fast 3G.
    *   Make sure capture screenshots is activated.
5.  Make a Hard Reload of the page
    *   ctrl + shift + R (Windows) or cmd + shift + R (Mac)
6.  See how the font resources are loading
    *   In the networks tab you can see details about how the resources loaded
        *   The initiator column is useful for seeing what initiated the request.
        *   If a resource was pushed the initiator will say Push.
    *   Doubleclick on a screenshot to get a larger preview
        *   If text is orange: This is when the text is displayed in a Fallback font.
        *   If text is green: This is when the subset web font is rendered to the user
        *   If text is black: This is when all the web fonts are rendered to the user.
7.  If you are totally new to DevTools check out these two exellent tutorials
    *   [Inspect Network Activity In Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network/)
    *   [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
* * *
## Limitations

**Font format**  
Only .woff2 files were used for testing the resource prioritization approaches in this degree project. In production it is recommended to include at least the .woff format (for browsers that do not support .woff2).

**Caching**

This demo does not contain any optimization approaches for repeat views, since this was outside of the scope of this project.

**Browser Support**  
HTTP/2 Server Push is inconsistent across browsers, this has not been addressed in this demo.
* * *

## Development 

**TLS certificats**  
If the certificats included in this repo has expired, You can generate new certificates using the ...

**Pug**  
This project uses the template engine pug, for dynamic and reusable HTML code that is cleaner and easier to read. 
Visit https://pugjs.org/ for details.  

**ESLint**   
This project uses ESLint to detect suspicious code in JavaScript files.
Visit http://eslint.org for details. 

**EditorConfig**   
This project uses EditorConfig to standardize text editor configuration.
Visit http://editorconfig.org for details. 

[A COMPREHENSIVE GUIDE TO FONT LOADING STRATEGIES]: https://www.zachleat.com/web/comprehensive-webfonts/
