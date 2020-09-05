const React = require('react');
const ReactDom = require('react-dom');

console.log("Hello, world!");

class MainTable extends React.Component {
    render() {
        return (
            <div>
                Hello, ReactJS!
            </div>
        );
    }
}

ReactDom.render(
    <MainTable/>,
    document.getElementById('react-dom-root')
);