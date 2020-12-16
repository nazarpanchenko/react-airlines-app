import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './searchFlight.scss';
import isValidFormat from '../../utils/validators';
import { Link } from 'react-router-dom';
import flt from '../../utils/constants';
import moment from 'moment';

class SearchFlight extends Component {
    state = {
        searchText: '',
        errMessage: ''
    };

    showErrMessage = () => {
        this.setState({
            searchText: '',
            errMessage: 'Invalid search format'
        });
    };

    clearForm = () => {
        this.setState({
            searchText: '',
            errMessage: ''
        });
    };

    checkValidity = (validSearchType, searchText) => {
        if (validSearchType) {
            const updatedSearchText =
                validSearchType === flt.FLIGHT_DATE
                    ? moment(searchText, 'DD-MM-YYYY').format(
                          'YYYY-MM-DDThh:mm:ss[Z]'
                      )
                    : searchText;

            this.props.searchFlights(validSearchType, updatedSearchText);
            this.clearForm();
        } else {
            this.showErrMessage();
        }
    };

    handleInputChange = event => {
        this.setState({ searchText: event.target.value });
    };

    handleFlightSearch = event => {
        const { searchText } = this.state;
        const validSearchType = isValidFormat(searchText);

        // prevent fetching flights, if search query is invalid
        if (!validSearchType) event.preventDefault();

        this.checkValidity(validSearchType, searchText);
    };

    render() {
        const { searchText, errMessage } = this.state;

        const errClassName = errMessage ? 'error-message' : '';
        const placeholder = errClassName
            ? errMessage
            : 'Airline, destination or flight #';

        return (
            <main>
                <div className="container flights">
                    <h1>Search flight</h1>
                    <form className="flex flex-center flights__search-form">
                        <div
                            className={classNames(
                                `flex flights__search-form_input-wrapper no-border ${errClassName}`
                            )}
                        >
                            <i className="fa fa-search"></i>
                            <input
                                type="text"
                                className="flights__search-form_search-input"
                                placeholder={placeholder}
                                value={searchText}
                                onChange={event =>
                                    this.handleInputChange(event)
                                }
                            />
                        </div>
                        <Link to="/flights/:search">
                            <button
                                type="submit"
                                className="flights__search-form_search-btn no-border"
                                onClick={event =>
                                    this.handleFlightSearch(event)
                                }
                            >
                                search
                            </button>
                        </Link>
                    </form>
                </div>
            </main>
        );
    }
}

SearchFlight.propTypes = {
    searchFlights: PropTypes.func.isRequired
};

export default SearchFlight;
