module.exports = {
  App: {
    Render: {
      "should render without a problem": {
        "1":
          '<div id="root">\n  <div>\n    <div>\n      <form><input type="text"\n          value=""><input type="text"\n          value=""><button type="submit"\n          disabled="">Add Todo</button></form>\n    </div>\n    <ul></ul>\n    <p>Show: <span>All</span>, <button>Active</button>,\n      <button>Completed</button></p>\n    <pre><code>{\n    "todos": [],\n    "visibilityFilter": "SHOW_ALL"\n}</code></pre>\n  </div>\n</div>'
      }
    },
    "basic actions": {
      "should create a new todo item": {
        "1":
          '<div id="root">\n  <div>\n    <div>\n      <form><input type="text"\n          value=""><input type="text"\n          value=""><button type="submit"\n          disabled="">Add Todo</button></form>\n    </div>\n    <ul>\n      <li style="text-decoration: none;">test: 1</li>\n    </ul>\n    <p>Show: <span>All</span>, <button>Active</button>,\n      <button>Completed</button></p>\n    <pre><code>{\n    "todos": [\n        {\n            "completed": false,\n            "value": 1,\n            "id": 0,\n            "text": "test"\n        }\n    ],\n    "visibilityFilter": "SHOW_ALL"\n}</code></pre>\n  </div>\n</div>'
      },
      "should mark item as complete": {
        "1":
          '<div id="root">\n  <div>\n    <div>\n      <form><input type="text"\n          value=""><input type="text"\n          value=""><button type="submit"\n          disabled="">Add Todo</button></form>\n    </div>\n    <ul>\n      <li style="text-decoration: line-through;">test: 1</li>\n    </ul>\n    <p>Show: <span>All</span>, <button>Active</button>,\n      <button>Completed</button></p>\n    <pre><code>{\n    "todos": [\n        {\n            "completed": true,\n            "value": 1,\n            "id": 0,\n            "text": "test"\n        }\n    ],\n    "visibilityFilter": "SHOW_ALL"\n}</code></pre>\n  </div>\n</div>'
      },
      filters: {
        "`Active` should hide completed todo": {
          "1":
            '<div id="root">\n  <div>\n    <div>\n      <form><input type="text"\n          value=""><input type="text"\n          value=""><button type="submit"\n          disabled="">Add Todo</button></form>\n    </div>\n    <ul>\n      <li style="text-decoration: none;">active: </li>\n    </ul>\n    <p>Show: <button>All</button>, <span>Active</span>,\n      <button>Completed</button></p>\n    <pre><code>{\n    "todos": [\n        {\n            "completed": true,\n            "value": 1,\n            "id": 0,\n            "text": "test"\n        },\n        {\n            "completed": false,\n            "value": "",\n            "id": 1,\n            "text": "active"\n        }\n    ],\n    "visibilityFilter": "SHOW_ACTIVE"\n}</code></pre>\n  </div>\n</div>'
        },
        "`Completed` should show completed todo": {
          "1":
            '<div id="root">\n  <div>\n    <div>\n      <form><input type="text"\n          value=""><input type="text"\n          value=""><button type="submit"\n          disabled="">Add Todo</button></form>\n    </div>\n    <ul>\n      <li style="text-decoration: line-through;">test: 1</li>\n    </ul>\n    <p>Show: <button>All</button>, <button>Active</button>,\n      <span>Completed</span></p>\n    <pre><code>{\n    "todos": [\n        {\n            "completed": true,\n            "value": 1,\n            "id": 0,\n            "text": "test"\n        },\n        {\n            "completed": false,\n            "value": "",\n            "id": 1,\n            "text": "active"\n        }\n    ],\n    "visibilityFilter": "SHOW_COMPLETED"\n}</code></pre>\n  </div>\n</div>'
        },
        "`All` should show all todo": {
          "1":
            '<div id="root">\n  <div>\n    <div>\n      <form><input type="text"\n          value=""><input type="text"\n          value=""><button type="submit"\n          disabled="">Add Todo</button></form>\n    </div>\n    <ul>\n      <li style="text-decoration: line-through;">test: 1</li>\n      <li style="text-decoration: none;">active: </li>\n    </ul>\n    <p>Show: <span>All</span>, <button>Active</button>,\n      <button>Completed</button></p>\n    <pre><code>{\n    "todos": [\n        {\n            "completed": true,\n            "value": 1,\n            "id": 0,\n            "text": "test"\n        },\n        {\n            "completed": false,\n            "value": "",\n            "id": 1,\n            "text": "active"\n        }\n    ],\n    "visibilityFilter": "SHOW_ALL"\n}</code></pre>\n  </div>\n</div>'
        }
      }
    }
  },
  __version: "3.4.1"
};
