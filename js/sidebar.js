// Version 0.1
class SideBar {
  constructor(params) {
      if (SideBar.instance) {
          throw new Error('SideBar is already initialized and can\'t be intialized more than once.');
      }

      // App instance
      const app = this;

      SideBar.instance = app;

      // Default Paramters
      const defaults = {
          title: "SideBar",
          items: [
              { id: 0, text: "Home", link: "#" },
              { id: 1, text: "Contact", link: "#" },
              { id: 2, text: "About", link: "#" },
          ],
          init: true
      }

      app.params = Utils.extend(defaults, params);

      if (app.params.init) {
          app.init();
      }

      return app;
  }

  createMenuIcon() {
      let element = document.getElementById('sb-menu-icon');

      for (let i = 0; i < 3; i++) {
          let spanElement = document.createElement("span");
          element.appendChild(spanElement);
      }

      element.addEventListener('click', function() {
          document.getElementById('sb-menu-icon').classList.toggle('open');
          document.getElementById('sb-sidebar').classList.toggle('active');
      });
  }

  addTitle() {
      const app = this;

      let element = document.getElementById('sb-sidebar');
      
      let div = document.createElement("div");
      div.classList.add("sb-header");
      div.innerHTML = app.params.title;
      
      element.appendChild(div);
  }

  addMenuItems() {
      const app = this;

      app.params.items.forEach(function(item) {
          let element = document.getElementById('sb-sidebar');
          
          let div = document.createElement('div');
          div.classList.add("sb-menu-item");
          div.id = "sb-menu-item-" + item.id;
          
          let anchor = document.createElement('a');
          anchor.href = item.link;
          anchor.innerHTML = item.text;
          
          div.appendChild(anchor);
          element.appendChild(div);

          div.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('sb-menu-icon').classList.toggle('open');
            document.getElementById('sb-sidebar').classList.toggle('active');
            if (window.location.href !== e.target.href) {
              setTimeout(function() {
                  window.location.href = e.target.href;
              }, 500);
            }
            
          });
      });
  }

  addTransition() {
    let element = document.getElementById('sb-sidebar');
    element.classList.add('sb-transition');
  }

  init() {
      const app = this;
      if (app.initialized) return app;
      app.createMenuIcon();
      app.addTitle();
      app.addMenuItems();
      app.addTransition();
      app.initialized = true;

      return app;
  }
}



// The following section: 
// https://github.com/framework7io/framework7/blob/master/src/core/utils/utils.js
// The MIT License (MIT)

// Copyright (c) 2014 Vladimir Kharlampidi

// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const Utils = {
  isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
  },
  extend(...args) {
      let deep = true;
      let to;
      let from;
      if (typeof args[0] === 'boolean') {
        deep = args[0];
        to = args[1];
        args.splice(0, 2);
        from = args;
      } else {
        to = args[0];
        args.splice(0, 1);
        from = args;
      }
      for (let i = 0; i < from.length; i += 1) {
        const nextSource = args[i];
        if (nextSource !== undefined && nextSource !== null) {
          const keysArray = Object.keys(Object(nextSource));
          for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            const nextKey = keysArray[nextIndex];
            const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              if (!deep) {
                to[nextKey] = nextSource[nextKey];
              } else if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }
      return to;
  }
}