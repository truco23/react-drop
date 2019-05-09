import React, { Component } from 'react';

import logo from '../../assets/logo.svg';
import api from '../../services/api/api-service';

class MainComponent extends Component {
    
    state = {
        title: ''
    };

    handleSubmit = async e => {

        e.preventDefault();

        const responseBox = await api.post(`box/`, { title: this.state.title });
        console.log(responseBox);

        this.props.history.push(`/box/${ responseBox.data._id }`)
    };

    inputOnChange = e => {

        this.setState({ title: e.target.value })
    };


    render() { 
        return (  
            <section className="box-container">
                <form onSubmit={ this.handleSubmit }>
                    <img src={ logo } alt="Logo da empresa" />
                    <input placeholder="Crie um box" 
                        onChange={ this.inputOnChange }
                        value={ this.state.title }
                    />
                    <button>Criar</button>
                </form>
            </section>
        );
    }
}
 
export default MainComponent;