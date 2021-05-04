// const element = <h1 title='foo'>Hello</h1>
// const container = document.getElementById('root')
// ReactDOM.render(element, container)

// ↑↑↑↑↑
// この3行の React を vanilla JS に書き換える
// ↓↓↓↓↓

const element = {
  type: 'h1',
  props: {
    title: 'foo',
    children: 'Hello',
  },
};

const container = document.getElementById('root');

const node = document.createElement(element.type); // h1
node["title"] = element.props.title;

const text = document.createTextNode("");
text["nodeValue"] = element.props.children;

node.appendChild(text);
container.appendChild(node);
