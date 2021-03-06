const React = require('react');
const ReactDom = require('react-dom');
const axios = require('axios');

const MainTable = require('./main_table.jsx').MainTable;
const Pagination = require('./pagination.jsx').Pagination;
const Filter = require('./filter.jsx').Filter;

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weblexTable: [],
            dataLoaded: false,
            currentPage: 0,
            numberOfPages: 1,
            rowsPerPage: 5,
            error: false,
            sortOrderAsc: true
        };
    }

    getTableData(filterParams = []) {
        let filter = "";
        for(let i = 0; i < filterParams.length; i++) {
            let param = filterParams[i];
            filter += param.key+"="+param.value;
            if(i < filterParams.length - 1) {
                filter+="&";
            }
        }
        let url = "build/api.php?query=get_table_data";
        if(filter != "") {
            url += "&" + filter;
        }
        (Promise.resolve().then(() => {
            this.setState({dataLoaded: false});
        })).then(() => {
            axios.get(url).then(request => {
                if(request.status == 200) {
                    let numberOfPages = Math.ceil(request.data.length / this.state.rowsPerPage);
                    this.setState({
                        weblexTable: request.data,
                        dataLoaded: true,
                        numberOfPages: numberOfPages,
                        currentPage: 0,
                        error: false
                    });
                }
            }).catch(request => {
                this.setState({error: true, weblexTable: [], numberOfPages: 0});
            });
        });
    }

    currentPageChanged(selectedPage) {
        this.setState({
            currentPage: selectedPage
        });
    }

    onSort(field) {
        let weblexTable = JSON.parse(JSON.stringify(this.state.weblexTable));
        weblexTable.sort((a, b) => {
            let valueA = a[field];
            let valueB = b[field];
            if(field=="distance") {
                valueA = parseFloat(valueA);
                valueB = parseFloat(valueB);
            }
            if(field=="amount") {
                valueA = parseInt(valueA);
                valueB = parseInt(valueB);   
            }

            if(valueA < valueB) {
                return this.state.sortOrderAsc ? -1 : 1;
            }
            if(valueA > valueB) {
                return this.state.sortOrderAsc ? 1 : -1;
            }
            return 0;
        });
        this.setState({weblexTable: weblexTable, sortOrderAsc: !this.state.sortOrderAsc});
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
                <Filter onFilter={this.getTableData.bind(this)}/>
                <Pagination numberOfPages={numberOfPages}
                            currentPage={currentPage}
                            onPageSelect={this.currentPageChanged.bind(this)}
                />
                <MainTable didMount={this.getTableData.bind(this)}
                           dataLoaded={dataLoaded}
                           weblexTable={rows}
                           error={this.state.error}
                           onSort={this.onSort.bind(this)}
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