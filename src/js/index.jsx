require('../css/styles.css');

const React = require('react');
const ReactDom = require('react-dom');
const axios = require('axios');

class MainTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weblex_table: [],
            data_loaded: false
        };
    }

    componentDidMount() {
        this.loadAllData();
    }

    loadAllData() {
        axios.get("build/api.php?query=get_all_rows").then(request => {
            if(request.status == 200) {
                this.setState({weblex_table: request.data, data_loaded: true});
            }
        });
    }

    render() {
        let rows = [];
        if(this.state.data_loaded) {
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

ReactDom.render(
    <MainTable/>,
    document.getElementById('react-dom-root')
);