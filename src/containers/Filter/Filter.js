import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Dropdown, Input, Button } from 'semantic-ui-react';
import { addFilterResults } from '../../actions';
import { fetchResults } from '../../thunks';
import PropTypes from 'prop-types';
import './Filter.css'

const specialties = [{ key: 'VHP', value: 'High Protein', text: 'Very High Protein (VHP)'}]
const allergies = [{ key: 'Gluten', value: 'Wheat', text: 'Wheat and/or Gluten'},
{ key: 'Corn', value: 'Corn', text: 'Corn'}, { key: 'Soy', value: 'Soy', text: 'Soy'}]

class Filter extends Component {
	constructor() {
		super()

		this.state = {
			allergens: [],
			specialty: [],
			mct: []

		}
	}

	handleSubmit = async (event) => {
		event.preventDefault()
		const allergens = await this.filterAllergens()
		const specialty = await this.filterSpecialty()
		const mct = await this.filterMCT()
		this.compareFilter(allergens, specialty, mct)
	}

	handleChange = (event, data) => {

		event.preventDefault()
		this.setState({ allergens: [...data.value]})
		console.log(this.state.allergens)
	}

	compareFilter = (allergens = [], specialty = [], mct = []) => {
		switch (allergens) {
			case allergens.length:

		}
 }

	filterAllergens = async () => {
		let urlParam = this.state.allergens.join()	
		let url = `https://nurish-app.herokuapp.com/api/v1/formulas?allergens=${urlParam}`
		const response = await fetch(url)
		return await response.json()
	}

	filterSpecialty = async () => {
		let urlParam = this.state.specialty.join()	
		let url = `https://nurish-app.herokuapp.com/api/v1/formulas?specialty=${urlParam}`
		const response = await fetch(url)
		return await response.json()
	}

	filterMCT = async () => {
		let urlParam = this.state.mct.join()
		let url = `https://nurish-app.herokuapp.com/api/v1/formulas?specialty=${urlParam}`
		const response = await fetch(url)
		return await response.json()
	}

	render() {
		const { value } = this.state
		return (
			<div className='form-container filter-container'>
				<div className='link-container'>
					<NavLink to='/'>back</NavLink>
					<NavLink to='/search'>search</NavLink>
					<NavLink to='/browse'>browse</NavLink>
				</div>
				<form className='filter-form' onSubmit={this.handleSubmit}>
				<Dropdown onChange={this.handleChange} placeholder='specialty' fluid search selection options={specialties} name="specialty" />
				<Dropdown onChange={this.handleChange} placeholder='allergies' fluid multiple search selection options={allergies}/>
				<Input list='mct splits' placeholder='mct split' />
    			<datalist id='mct splits'>
      			<option value='50:10:40' />
     				<option value='30:40:30' />
      			<option value='20:20:10' />
    			</datalist>
    		<Button fluid>Search</Button>
				</form>
			</div>
		)
	}
}

export const mapStateToProps = (state) => ({
	filterResults: state.filterResults,
	isLoading: state.isLoading,
  hasErrored: state.hasErrored
});

export const mapDispatchToProps = (dispatch) => ({
	addFilterResults: (filterResults) => dispatch(addFilterResults(filterResults)),
	fetchResults: (url) =>  dispatch(fetchResults(url))

})

Filter.propTypes = {
  filterResults: PropTypes.array,
  fetchResults: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));