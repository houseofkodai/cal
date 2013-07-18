cal
===

* Simplest self-contained JavaScript Calendar Module

* no dependencies, should work well with everything else ;-)


usage
=====

1. Include cal.js in your HTML:

```html
<script src="cal.js" type="text/javascript"></script>
```

2. call *cal* with the id of the input element

```javascript
cal.set("day");
```

example
=======

1. cut & paste the following code and save to a file
2. open that file in a browser and click on the input ;-)

```html
<html>
<head>
 <title>cal.js usage sample</title>
 <script src="https://github.com/houseofkodai/cal/raw/master/cal.js" type="text/javascript"></script>
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
```
