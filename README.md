# Loading Strategies for Web Fonts -  Demo

### About
This repository is a supplement to my Bachelor's degree project in Computer Science (2DV50E). Its primary purpose is to demonstrate how resource prioritization approaches like HTTP/2 Preload and HTTP/2 Push can be used to optimize the delivery of web fonts for first-time visitors.

The selected strategies build upon a font loading strategy called Critical Flash Of Faux Text, that Zach Leatherman writes about in his article [A COMPREHENSIVE GUIDE TO FONT LOADING STRATEGIES] 


## Thesis
More information about the strategies and how they performed can be found in my thesis:  
*Web Font Optimization for Mobile Internet Users*  (link available soon)

### Abstract
<div style="text-align: justify"> 

> According to the HTTP Archive, 75% of websites are using web fonts. Multiple
>  conditions have to be met before modern web browsers like Chrome, Firefox
>  and Safari decide to download the web fonts needed on a page. As a result, web
>  fonts are late discovered resources that can delay the First Meaningful Paint
>  (FMP). Improving the FMP is relevant for the web industry, particularly for
>  performance-conscious web developers. This paper gives insight into how the
>  resource prioritization approaches HTTP/2 Preload and HTTP/2 Server Push can
>  be used to optimize the delivery of web fonts for first-time visitors. Five font
>  loading strategies that use HTTP/2 Server Push and/or Preload were implemented
>  on replicas of the landing pages from five real-world websites. The font loading
>  strategies were evaluated against each other, and against the non-optimized
>  version of each landing page. All the evaluated font loading strategies in this
>  degree project improved the time it took to deliver the first web font content to
>  the user’s screen, resulting in a faster FMP. It was also discovered that HTTP/2
>  Server Push, on its own, is not a more performance efficient resource prioritization
>  approach than HTTP/2 Preload when it comes to delivering web font content to
>  the client. Further, HTTP/2 Server Push and HTTP/2 Preload appears to be more
>  efficient when used together, in the context of optimizing the delivery of web font
>  content. However, all conclusions in this paper are based on the results gathered
>  from testing the font loading strategies in an emulated environment and are yet to
> be confirmed on actual mobile devices with real network conditions. 
</div>
   




## Instructions

1. Install [Node.js](http://nodejs.org/) (10.5.0 or later)

1. Clone this repository
   ```sh
   $ git clone https://github.com/mia-nygren/2DV50E-loading-strategies-for-web-fonts-demo.git 
   ```

1. Navigate to the project folder
   ```sh
   $ cd 2DV50E-loading-strategies-for-web-fonts-demo
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

## Limitations

**Font format**  
Only .woff2 files were used for testing the resource prioritization approaches in this degree project. In production it is recommended to include at least the .woff format (for browsers that do not support .woff2).

**Caching**  
This demo does not contain any optimization approaches for repeat views, since this was outside of the scope of this project.

**Browser Support**  
HTTP/2 Server Push is inconsistent across browsers, and this has not been addressed in this demo.
* * *

## Development 

**TLS certificate**  
If the certificate included in this repo has expired, you can generate a new certificate using [tls-keygen](https://www.npmjs.com/package/tls-keygen).

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
