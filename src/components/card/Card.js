import React,{Component}  from "react";
import './Card.css'
import ModalForm from "../modal/ModalForm";
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';



class Cards extends Component{
        constructor(props){
          super(props)
          this.state={isOpen: false,
        }
        }
        openModal = () => this.setState({ isOpen: true });
        closeModal = () => this.setState({ isOpen: false });

        render(){
          return(
            <React.Fragment>
                
                <Card className="card-container">
                    <Card.Img variant="top" src={this.props.movieDetails.image} alt="W3Schools.com" className="card-image"/>
                    <Card.Body  class="text-container">
                    
                        <Card.Title class="card-title">{this.props.movieDetails.title}</Card.Title>
                        <Card.Text class="card-description">
                        {this.props.movieDetails.description}
                        </Card.Text>
                        <Card.Text class="card-description">
                        Duration:{this.props.movieDetails.duration}
                        </Card.Text>
                        <Card.Text class="card-description">
                        Gener:{this.props.movieDetails.genre}
                        </Card.Text>
                    
                    <div className="card-buttons-container">
                        <Button variant="danger" onClick={()=>this.props.handleDelete(this.props.index)}>Delete</Button>
                        <Button variant="warning" onClick={this.openModal}>Edit</Button>
                    </div>

                    </Card.Body>
                  
                </Card>
                { this.state.isOpen ? 
                     <ModalForm 
                        closeModal={this.closeModal} 
                        isOpen={this.state.isOpen} 
                        modalStatus="edit"
                        index={this.props.index}
                        handleSubmitEdit={this.props.handleSubmitEdit}
                        title={this.props.movieDetails.title} 
                        description={this.props.movieDetails.description} 
                        duration={this.props.movieDetails.duration} 
                        genre={this.props.movieDetails.genre} 
                        image={this.props.movieDetails.image} 
                     /> 
                     : null}
                
            </React.Fragment>
          )
        }
}
export default Cards;