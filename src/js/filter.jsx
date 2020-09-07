React = require('react');
PropTypes = require('prop-types');

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: "date",
            condition: "equals",
            value: ""
        }
    }

    onChangeField(e) {
        this.setState({field: e.target.value});
    }

    onChangeCondition(e) {
        this.setState({condition: e.target.value});
    }

    onChangeValue(e) {
        this.setState({value: e.target.value});
    }

    onSubmit(e) {
        let filterParams = [
            {key: "field", value: this.state.field},
            {key: "condition", value: this.state.condition},
            {key: "value", value: this.state.value}
        ];
        this.props.onFilter(filterParams);
    }

    render() {
        return (
            <div>
                <div className="block_inline">
                    Поле:
                    <select value={this.state.field} onChange={this.onChangeField.bind(this)}>
                        <option value="date">Дата</option>
                        <option value="name">Название</option>
                        <option value="amount">Количество</option>
                        <option value="distance">Расстояние</option>
                    </select>
                </div>
                <div className="block_inline">
                    Условие:
                    <select value={this.state.condition} onChange={this.onChangeCondition.bind(this)}>
                        <option value="equals">Равно</option>
                        {
                            this.state.field!="name" ? 
                                [
                                    <option value="greater">Больше</option>,
                                    <option value="less">Меньше</option>
                                ]
                            : []
                        }
                        <option value="like">Содержит</option>
                    </select>
                </div>
                <div className="block_inline">
                    Значение:
                    <input type="text" value={this.state.value}
                           onChange={this.onChangeValue.bind(this)}
                           onKeyDown={
                               (e) => {
                                   if(e.key == "Enter") {
                                       this.onSubmit();
                                   }
                               }
                           }
                    />
                </div>
                <div className="block_inline">
                    <button onClick={this.onSubmit.bind(this)}>Фильтровать</button>
                </div>
            </div>
        );
    }
}

Filter.propTypes = {
    onFilter: PropTypes.func
};

module.exports = {
    Filter
};