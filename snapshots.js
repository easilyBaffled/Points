module.exports = {
  __version: "3.4.1",
  Render: {
    "should render without a problem": {
      "1":
        '<div id="root">\n  <div>\n    <div>\n      <form><input><button type="submit">Add Todo</button></form>\n    </div>\n    <ul></ul>\n    <p>Show: <span>All</span>, <a href="#">Active</a>, <a href="#">Completed</a>\n    </p>\n    <pre><code>{\n    "todos": [],\n    "visibilityFilter": "SHOW_ALL"\n}</code></pre>\n  </div>\n</div>'
    }
  },
  App: {
    Render: {
      "should render without a problem": {
        "1":
          '<div id="root">\n  <div>\n    <div>\n      <form><input><button type="submit">Add Todo</button></form>\n    </div>\n    <ul></ul>\n    <p>Show: <span>All</span>, <a href="#">Active</a>, <a href="#">Completed</a>\n    </p>\n    <pre><code>{\n    "todos": [],\n    "visibilityFilter": "SHOW_ALL"\n}</code></pre>\n  </div>\n</div>'
      }
    },
    "basic actions": {
      "should create a new todo item": {
        "1":
          '<div id="root">\n  <div>\n    <div>\n      <form><input><button type="submit">Add Todo</button></form>\n    </div>\n    <ul>\n      <li style="text-decoration: none;">test</li>\n    </ul>\n    <p>Show: <span>All</span>, <a href="#">Active</a>, <a href="#">Completed</a>\n    </p>\n    <pre><code>{\n    "todos": [\n        {\n            "id": 0,\n            "text": "test",\n            "completed": false\n        }\n    ],\n    "visibilityFilter": "SHOW_ALL"\n}</code></pre>\n  </div>\n</div>'
      },
      filters: {
        "`Active` should hide completed todo": {
          "1":
            '<div id="root">\n  <div>\n    <div>\n      <form><input><button type="submit">Add Todo</button></form>\n    </div>\n    <ul>\n      <li style="text-decoration: none;">active</li>\n    </ul>\n    <p>Show: <a href="#">All</a>, <span>Active</span>, <a href="#">Completed</a>\n    </p>\n    <pre><code>{\n    "todos": [\n        {\n            "id": 0,\n            "text": "test",\n            "completed": true\n        },\n        {\n            "id": 1,\n            "text": "active",\n            "completed": false\n        }\n    ],\n    "visibilityFilter": "SHOW_ACTIVE"\n}</code></pre>\n  </div>\n</div>'
        },
        "`Completed` should show completed todo": {
          "1":
            '<div id="root">\n  <div>\n    <div>\n      <form><input><button type="submit">Add Todo</button></form>\n    </div>\n    <ul>\n      <li style="text-decoration: line-through;">test</li>\n    </ul>\n    <p>Show: <a href="#">All</a>, <a href="#">Active</a>, <span>Completed</span>\n    </p>\n    <pre><code>{\n    "todos": [\n        {\n            "id": 0,\n            "text": "test",\n            "completed": true\n        },\n        {\n            "id": 1,\n            "text": "active",\n            "completed": false\n        }\n    ],\n    "visibilityFilter": "SHOW_COMPLETED"\n}</code></pre>\n  </div>\n</div>'
        },
        "`All` should show all todo": {
          "1":
            '<div id="root">\n  <div>\n    <div>\n      <form><input><button type="submit">Add Todo</button></form>\n    </div>\n    <ul>\n      <li style="text-decoration: line-through;">test</li>\n      <li style="text-decoration: none;">active</li>\n    </ul>\n    <p>Show: <span>All</span>, <a href="#">Active</a>, <a href="#">Completed</a>\n    </p>\n    <pre><code>{\n    "todos": [\n        {\n            "id": 0,\n            "text": "test",\n            "completed": true\n        },\n        {\n            "id": 1,\n            "text": "active",\n            "completed": false\n        }\n    ],\n    "visibilityFilter": "SHOW_ALL"\n}</code></pre>\n  </div>\n</div>'
        }
      },
      "should mark item as complete": {
        "1":
          '<div id="root">\n  <div>\n    <div>\n      <form><input><button type="submit">Add Todo</button></form>\n    </div>\n    <ul>\n      <li style="text-decoration: line-through;">test</li>\n    </ul>\n    <p>Show: <span>All</span>, <a href="#">Active</a>, <a href="#">Completed</a>\n    </p>\n    <pre><code>{\n    "todos": [\n        {\n            "id": 0,\n            "text": "test",\n            "completed": true\n        }\n    ],\n    "visibilityFilter": "SHOW_ALL"\n}</code></pre>\n  </div>\n</div>'
      }
    }
  }
};
