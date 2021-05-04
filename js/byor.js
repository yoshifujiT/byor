function render(element, container) {
  const dom = element.type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(element.type);

  const isProperty = (key) => key !== "children";

  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  element.props.children.map((child) => {
    render(child, dom);
  })

  container.appendChild(dom);
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => (
        typeof child === 'object'
          ? child
          : createTextElement(child)
      )),
    },
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)

    shouldYield = deadline.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(nextUnitOfWork) {
  // TODO: should impl
  // - perform the work
  // - return the next unit of work
}

const Byor = {
  createElement,
  render,
};

const element = Byor.createElement(
  'div',
  { id: 'foo' },
  Byor.createElement('a', null, 'bar'),
  Byor.createElement('b'),
);

/** @jsx Byor.createElement */
// const element = (
//   <div id='foo'>
//     <a>bar</a>
//     <b />
//   </div>
// )

const container = document.getElementById('root')
Byor.render(element, container)
