const React = require('react');
const ReactDom = require('react-dom');
const axios = require('axios');

const MainTable = require('./main_table.jsx').MainTable;
const Pagination = require('./pagination.jsx').Pagination;

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weblexTable: [],
            dataLoaded: false,
            currentPage: 0,
            numberOfPages: 1,
            rowsPerPage: 5
        };
    }

    loadAllData() {
        axios.get("build/api.php?query=get_all_rows").then(request => {
            if(request.status == 200) {
                let numberOfPages = Math.ceil(request.data.length / this.state.rowsPerPage);
                this.setState({
                    weblexTable: request.data,
                    dataLoaded: true,
                    numberOfPages: numberOfPages,
                    currentPage: 0
                });
            }
        });
    }

    currentPageChanged(selectedPage) {
        this.setState({
            currentPage: selectedPage
        });
    }

    render() {
        const currentPage = this.state.currentPage;
        const rowsPerPage = this.state.rowsPerPage;
        const weblexTable = this.state.weblexTable;
        const numberOfPages = this.state.numberOfPages;
        const dataLoaded = this.state.dataLoaded;

        let rows = [];
        for(let i = currentPage * rowsPerPage; i < (currentPage + 1) * rowsPerPage; i++) {
            if(i < weblexTable.length) {
                rows.push(weblexTable[i]);
            }
        }

        return (
            <div>
                <Pagination numberOfPages={numberOfPages}
                            currentPage={currentPage}
                            onPageSelect={this.currentPageChanged.bind(this)}
                />
                <MainTable didMount={this.loadAllData.bind(this)}
                           dataLoaded={dataLoaded}
                           weblexTable={rows}
                />
                <Pagination numberOfPages={numberOfPages}
                            currentPage={currentPage}
                            onPageSelect={this.currentPageChanged.bind(this)}
                />
            </div>
        );
    }
}

module.exports = {
    Application
};