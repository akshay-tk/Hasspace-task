import React,{Component}  from "react";
import Card from "../card/Card";
import ModalForm from "../modal/ModalForm";
import {Button} from 'react-bootstrap'
import './Home.css'


class Home extends Component{
        constructor(props){
          super(props)
          this.state={isOpen: false,
                       title:"",
                       description:"",
                       duration:"",
                       genre:"",
                       image:"",
                       movieList:[],
        }
        }
        openModal = () => this.setState({ isOpen: true });
        closeModal = () => this.setState({ isOpen: false });

        componentDidMount=()=>{
            var movies = [];
            var get =  JSON.parse(localStorage.getItem("movies") || "[]");
            movies = get;
            this.setState({movieList:movies})

        }

        handleSubmitAdd=(movieDetails) =>{
            var movies = [];
            var get =  JSON.parse(localStorage.getItem("movies") || "[]");
            movies = get;
            movies.push(movieDetails);
         
            localStorage.setItem('movies', JSON.stringify(movies));
          this.setState({movieList:movies})
        }
         
        handleSubmitEdit=(movieDetails,index)=>{
            var movies = [];
            var get =  JSON.parse(localStorage.getItem("movies") || "[]");
            movies = get;
            movies[index].title=movieDetails.title
            movies[index].description=movieDetails.description
            movies[index].duration=movieDetails.duration
            movies[index].genre=movieDetails.genre
            movies[index].image=movieDetails.image
           localStorage.setItem('movies', JSON.stringify(movies));
           this.setState({movieList:movies})


        }
        handleDelete=(index)=>{
            var movies = [];
            var get =  JSON.parse(localStorage.getItem("movies") || "[]");
            movies = get;
            console.log(movies)
            movies.splice(index, 1)
            console.log(movies)
            localStorage.setItem('movies', JSON.stringify(movies));
            this.setState({movieList:movies})
        }
        

        render(){
          return(
            <React.Fragment>
                <div className="container">
               <Button variant="primary" onClick={this.openModal}>Add movie</Button>
               { this.state.isOpen ? 
                     <ModalForm 
                        closeModal={this.closeModal} 
                        isOpen={this.state.isOpen} 
                        handleSubmitAdd={this.handleSubmitAdd}
                        title={this.state.title} 
                        description={this.state.description} 
                        duration={this.state.duration} 
                        genre={this.state.genre} 
                        image={this.state.image} 
                     /> 
                     : null}
                <div className="cards-container">
                    {this.state.movieList.map((movie,index)=>(
                        <Card key={index} 
                              movieDetails={movie}
                              index={index}
                              openModal={this.openModal}
                              closeModal={this.closeModal}
                              handleDelete={this.handleDelete}
                              handleSubmitEdit={this.handleSubmitEdit}/>
                    ))}

                    </div>   

                </div> 
            </React.Fragment>
          )
        }
}
export default Home;