const React = require('react');
const PropTypes = require('prop-types');

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    onPageSelect(selectedPage) {
        this.props.onPageSelect(selectedPage);
    }

    render() {
        const currentPage = this.props.currentPage;
        const numberOfPages = this.props.numberOfPages;

        let pageButtons = [];

        for(let pageNumber = 0; pageNumber < numberOfPages; pageNumber++) {
            pageButtons.push(
                <div className={'page_button' + (currentPage == pageNumber ? " page_button_selected" : "")}
                     onClick={this.onPageSelect.bind(this, pageNumber)}
                >
                    { pageNumber + 1 }
                </div>
            );
        }

        return (
            <div>
                { pageButtons }
            </div>
        );
    }
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    numberOfPages: PropTypes.number,
    onPageSelect: PropTypes.func
};

module.exports = {
    Pagination
};