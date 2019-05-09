import React, { Component } from 'react';
import socket from 'socket.io-client';

import Dropzone from 'react-dropzone';
import api from '../../services/api/api-service';


class BoxComponent extends Component {

    state = {
        box: []
    }

    async componentDidMount() {

        this.realTime()

        const box = await api.get(`/box/${this.props.match.params.id}`)

        this.setState({ box: box.data });

        console.log(this.state.box);
        
    };

    date = date => {

        const data = new Date(date);
        return `${data.getDate()}/${ data.getMonth() + 1 }/${ data.getUTCFullYear() } às ${ data.getHours() }:${ data.getMinutes() }:${ data.getSeconds() }s`;
    };

    realTime = () => {

        let idBox = this.props.match.params.id; 
        let io = socket('http://localhost:3001');

        io.emit('connectRoom', idBox);

        io.on('file', data => {

            console.log(data);
            this.setState({ box: { ...this.state.box, files: [data, ...this.state.box.files] } })
        })
    }

    handleUpload = files => {

        
        files.forEach(file => {
            let idBox = this.props.match.params.id; 
            
            console.log(file);
            let formData = new FormData();

            formData.append('file', file);

            api.post(`file/box/${ idBox }`, file);

            console.log('Adicionado');
            
        });
    }

    render() { 
        const { title, files } = this.state.box;

        return (  
            <section className="box-container">
                <header>
                    <h1>Box: { title }</h1>
                </header>

                <Dropzone onDropAccepted={ this.handleUpload }>
                    {({getRootProps, getInputProps}) => (
                        <div className="upload" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Clique ou arraste arquivos</p>
                        </div>
                    )}
                </Dropzone>

                <ul>
                    {
                        files && files.map(file => {
                            
                            return(
                                <li key={ file._id }>
                                    <a href={ file.url } target="_blank">
                                        <strong>{ file.title }</strong>
                                    </a>
                                    
                                    <span>Criando em: { this.date(file.createdAt) }</span>
                                </li>
                            )
                        })
                    }
                </ul>

            </section>
        );
    }
}
 
export default BoxComponent;