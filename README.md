cal
===

* Simplest self-contained JavaScript Calendar Module

* no dependencies, should work well with everything else ;-)


usage
=====

1. Include cal.js in your HTML:

        <script src="cal.js" type="text/javascript"></script>

2. call *cal* with the id of the input element

        cal.set("day");


example
=======

    <html>
    <head>
    <title>cal.js usage sample</title>
    <script src="cal.js" type="text/javascript"></script>
    </head>
        
    <body>
      <p>day: <input id="day" /></p>
      <p>another day: <input id="anotherday" value="17/7/1971" /></p>
    
      <script>
      cal.set("day");
      cal.set("anotherday");
      </script>
    </body>
    </html>
    
