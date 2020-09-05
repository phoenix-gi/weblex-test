const React = require('react');
const ReactDom = require('react-dom');

console.log("Hello, world!");

class MainTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weblex_table: [
                {date: "01.01.2001", name: "Name 1", amount: "1", distance: "1"},
                {date: "02.03.2002", name: "Name 2", amount: "2", distance: "2"},
                {date: "03.03.2003", name: "Name 3", amount: "3", distance: "3"},
                {date: "04.04.2004", name: "Name 4", amount: "4", distance: "4"},
                {date: "05.05.2005", name: "Name 5", amount: "5", distance: "5"},
                {date: "06.06.2006", name: "Name 6", amount: "6", distance: "6"},
                {date: "07.07.2007", name: "Name 7", amount: "7", distance: "7"},
                {date: "08.08.2008", name: "Name 8", amount: "8", distance: "8"},
                {date: "09.09.2009", name: "Name 9", amount: "9", distance: "9"},
                {date: "10.10.2010", name: "Name 10", amount: "10", distance: "10"},
            ]
        };
    }

    render() {

        let rows = [];
        for(i in this.state.weblex_table) {
            let row_data = this.state.weblex_table[i];
            rows = rows.concat(
                <tr>
                    <td>{row_data.date}</td>
                    <td>{row_data.name}</td>
                    <td>{row_data.amount}</td>
                    <td>{row_data.distance}</td>
                </tr>
            );
        }

        return (
            <table>
                <tr>
                    <th>Дата</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Расстояние</th>
                </tr>
                {rows}
            </table>
        );
    }
}

ReactDom.render(
    <MainTable/>,
    document.getElementById('react-dom-root')
);