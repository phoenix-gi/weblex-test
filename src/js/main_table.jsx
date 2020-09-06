const React = require('react');
const axios = require('axios');
const PropTypes = require('prop-types');

class MainTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.didMount();
    }

    render() {
        let rows = [];
        if(this.props.dataLoaded) {
            for(i in this.props.weblexTable) {
                let rowData = this.props.weblexTable[i];
                rows.push(
                    <tr>
                        <td>{rowData.date}</td>
                        <td>{rowData.name}</td>
                        <td>{rowData.amount}</td>
                        <td>{rowData.distance}</td>
                    </tr>
                );
            }
        } else {
            rows = (
                <tr>
                    <td colspan="4">
                        Loading...
                    </td>
                </tr>
            );  
        }

        return (
            <table id="main_table">
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

MainTable.propTypes = {
    didMount: PropTypes.func,
    dataLoaded: PropTypes.bool,
    weblexTable: PropTypes.array
};

module.exports = {
    MainTable
};