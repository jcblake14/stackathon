import React from 'react';
import store, {newInput, setCriteria, rankNeighborhoods, setStatus} from '../store'

export default class InputForm extends React.Component {
  constructor(){
    super();
    this.state = store.getState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  handleChange(event){
    const input = event.target.value;
    store.dispatch(newInput(input));
  }

  handleSubmit(event){
    event.preventDefault();
    store.dispatch(setStatus('Loading results'));
    store.dispatch(setCriteria());
    store.dispatch(rankNeighborhoods());
  }

  render(){
    return (
      <div className="criteria-container">
        <h3 className="criteria-item">What are you looking for in a neighborhood?</h3>
        <form className="criteria-item criteria-form" onSubmit={this.handleSubmit}>
          <input autoFocus className="criteria-input" onChange={this.handleChange}></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}