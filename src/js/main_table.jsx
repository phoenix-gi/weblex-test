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
        if(this.props.error) {
            return <p>При запросе данных произошла ошибка!</p>;
        }

        if(this.props.dataLoaded) {
            if(this.props.weblexTable.length != 0) {
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
                            Данных нет
                        </td>
                    </tr>
                );
            }
        } else {
            rows = (
                <tr>
                    <td colspan="4">
                        Загрузка...
                    </td>
                </tr>
            );  
        }

        return (
            <table id="main_table">
                <tr>
                    <th>Дата</th>
                    <th className="clickable_column" onClick={this.props.onSort.bind(this, "name")}>Название</th>
                    <th className="clickable_column" onClick={this.props.onSort.bind(this, "amount")}>Количество</th>
                    <th className="clickable_column" onClick={this.props.onSort.bind(this, "distance")}>Расстояние</th>
                </tr>
                {rows}
            </table>
        );
    }
}

MainTable.propTypes = {
    didMount: PropTypes.func,
    dataLoaded: PropTypes.bool,
    weblexTable: PropTypes.array,
    error: PropTypes.bool,
    onSort: PropTypes.func
};

module.exports = {
    MainTable
};