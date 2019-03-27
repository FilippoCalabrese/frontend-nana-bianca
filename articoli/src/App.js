import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.elements = [];

    this.state = {elements: this.elements};
  }

  handleSubmit(el){
    let newElement = {
      "titolo": this.state.titolo,
      "contenuto": this.state.contenuto,
    };

    let elementsTitle = this.elements.map((el) => el.titolo);
    let bool = elementsTitle.indexOf(this.state.titolo);
    if(bool===-1){
        this.elements.push(newElement);
        this.setState({elements: this.elements});
    }

    el.preventDefault();
  }

  handleDelete(el) {
    this.elements = this.elements.filter(function(value, index, arr){
      return el.target.name != value.titolo;
    });
    this.setState({elements: this.elements});
  }

  handleChange (event) { //cambia lo status in base al nome
    this.setState( {[event.target.name]: event.target.value} )
  }

  render() {
    return (
      <div className="App">
        <Table callback={this.handleDelete} elements={this.state.elements}/>
        <Form callbackSubmit={this.handleSubmit} callbackChange={this.handleChange}/>
      </div>
    );
  }

}

class Form extends Component {
  constructor(props) {
    super(props);
    this.callbackSubmit = props.callbackSubmit;
    this.callbackChange = props.callbackChange;
    this.titolo = this.props.titolo;
  }

  render(){
    return(
        <form onSubmit={this.callbackSubmit}>
          <input type="text" name="titolo" placeholder="Titolo" onChange={this.callbackChange}/>
          <input type="text" name="contenuto" placeholder="Contenuto" onChange={this.callbackChange}/>
          <input type="submit" name="contenuto" value="Aggiungi"/>
        </form>
    );
  }

}

class Table extends Component {
  constructor(props){
    super(props);
    this.elements = props.elements;
    this.callback=props.callback;
  }

  render(){
    if(this.elements.length==0){
      return(<p>Non ci sono articoli</p>);
    }
    return (
        <table>
          <thead>
            <tr><td>Titolo</td><td>Contenuto</td><td>Azioni</td></tr>
          </thead>
          <tbody>
            <Lines callback={this.callback} elements={this.props.elements} />
          </tbody>
        </table>
    );
  }
}

class Lines extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let lines = this.props.elements.map(el => (
        <tr>
          <td>
            {el.titolo}
          </td>
          <td>
            {el.contenuto}
          </td>
          <td>
            <button onClick={this.props.callback} name={el.titolo}>Elimina</button>
          </td>
        </tr>
    ));
    return lines;
  }
}

export {Lines, Table, Form};

export default App;
