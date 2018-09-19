import React from 'react';
import { shallow } from 'enzyme';
import {DetailsCard, mapStateToProps, mapDispatchToProps} from '../DetailsCard.js';
import { fetchSingleFormula } from '../../../thunks/fetchSingleFormula.js';
import * as action from '../../../actions';


describe('DetailsCard', () => {
  let wrapper
  let mockformula
  let mockFetchSingleFormula
  let mockhistory
  let mockAnimateLogo



  beforeEach(() => {
    mockhistory = []
    mockAnimateLogo = jest.fn()
    mockFetchSingleFormula = jest.fn()
    mockformula = {nutritional_content: {properties:{nutrient: 'sodium'}, formula_overview: 'best ever', usage: 'thirst'}}
    wrapper = shallow(<DetailsCard fetchSingleFormula={mockFetchSingleFormula} formula={mockformula} history={mockhistory} animateLogo={mockAnimateLogo} />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  
})