# html-to-javascript package

This converts text string to a javascript variable or javascript ready code.
This package is intended to be used for the conversion of HTML code in to a javascript variable for later use.

The main purpose of this was not only to help me change between javascript and html code efficiently but also keep the indentation used.
Currently the ones I've encountered online either include the indentation as part of the javascript string (which is honestly wasteful when trying to minify it) or don't indent the lines afterwards.
![Example of the conversion to a javascript string](https://puu.sh/qhoQV/3b18444414.gif)


This is also intended to be used to convert javascript HTML strings to plain HTML and vice versa in a selection.
Be wary that any javascript variables inside this string will be ignored.

There will be a hotkey for HTML-to-Javascript and one for Javascript-to-HTML.

This is my first atom package.

Please bear with me :D

TODO:
- Convert Javascript string of HTML back in to HTML form for easy manipulation.
- Optionally get ignore empty lines (by default)
- Detect what state it is in and toggle between the two. (rather than just having a key to convert forward, and one backwards)
- Remove unneeded package generator generated code.

![Thanks Atom](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)
