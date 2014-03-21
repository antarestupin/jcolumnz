# jColumnz

jColumnz is a small, simple jQuery plugin that displays a data tree like the columns view of Mac OS X Finder.

## Installation and use

You will firstly need to include the javascript and the css files on the document.

Then call jColumnz on some empty `<div>` :
```javascript
$(function(){
    var data = [
        { label: "Line 1" },
        { label: "Line 2" }
    ];
    $('#data').columnz(data);
});
```

Notice that you can easily chose how the result will be displayed in the css file.

You can children to elements :
```javascript
var data = [
    { label: "Line 1" },
    { label: "Line 2", children: [
        { label: "Child 1" },
        { label: "Child 2" }
    ] }
];
```

You can also add click event listeners on elements :
```javascript
var data = [
    { label: "Line 1", on_click: function(){ alert("I'm the first line !"); } },
    { label: "Line 2", children: [
        { label: "Child 1" },
        { label: "Child 2" }
    ] }
];
```

## Compatibility

jColumnz fully works on every major recent browser, including IE8. It will work also on IE7, but lines icons will not be displayed. It hasn't been tested on IE6 and below.
