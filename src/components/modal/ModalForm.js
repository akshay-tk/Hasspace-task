import React,{Component} from 'react'
import {Form, Modal,Button}from 'react-bootstrap'


class ModalForm extends Component {
    constructor(props){
        super(props);

  this.state={ name: null,
          cardId:this.props.index,
          title:this.props.title,
          description:this.props.description,
          duration:this.props.duration,
          genre:this.props.genre,
          image:"",
        }
        this.handleAddSubmit=this.handleAddSubmit.bind(this);
        this.handleEditSubmit=this.handleEditSubmit.bind(this);

    }   
 handleChange=(event)=> {
    this.setState({ [event.target.name]: event.target.value });
}

handleAddSubmit=()=>{
    var movieDetails={
        title:this.state.title,
        description:this.state.description,
        duration:this.state.duration,
        genre:this.state.genre,
        image:this.state.image,
    }
    this.props.handleSubmitAdd(movieDetails);
}
handleEditSubmit=()=>{
    var movieDetails={
        title:this.state.title,
        description:this.state.description,
        duration:this.state.duration,
        genre:this.state.genre,
        image:this.state.image,
    }
    this.props.handleSubmitEdit(movieDetails,this.props.index);
}
imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      localStorage["fileBase64"] = base64;
      this.setState({image:localStorage.getItem("fileBase64")})
    });
};

  render(){
    return(
      <Modal 
        show={this.props.isOpen} 
        onHide={this.props.closeModal}
      >
      <Modal.Header closeButton>
        <Modal.Title>Modal Form Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
            <Form.Group >
                <Form.Label>Title: </Form.Label>
                <Form.Control type="text"  required onChange={this.handleChange} name="title" value={this.state.title} placeholder="Title input"/>           
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={this.handleChange} name="description" value={this.state.description} placeholder="Type description" />
            </Form.Group>
            <Form.Group >
                <Form.Label>Duration </Form.Label>
                <Form.Control type="number" onChange={this.handleChange} name="duration" value={this.state.duration} />           
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Genre</Form.Label>
                <Form.Select aria-label="Default select example" onChange={this.handleChange} name="genre" value={this.state.genre}>
                   <option>Open this select menu</option>
                   <option value="Action">Action</option>
                   <option value="Comedy">Comedy</option>
                   <option value="Drama">Drama</option>
                   <option value="Fantasy">Fantasy</option>
                   <option value="Horror">Horror</option>
                   <option value="Mystery">Mystery</option>
                   <option value="Romance">Romance</option>
                   <option value="Thriller">Thriller</option>
                </Form.Select>         
            </Form.Group>
            <Form.Group >
                <Form.Label>Image </Form.Label>
                <Form.Control  type="file" 
                         id="imageFile" 
                         name='imageFile' 
                         onChange={this.imageUpload} />           
            </Form.Group>
          </Form>

      </Modal.Body>
      <Modal.Footer>
          {this.props.modalStatus==="edit"?<Button variant="primary" type="submit" onClick={this.handleEditSubmit}>
              Submit
          </Button>:
          <Button variant="primary" type="submit" onClick={this.handleAddSubmit}>
              Add Card
          </Button>}
      </Modal.Footer>
    </Modal>
    )
  }
}
export default ModalForm;

const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
    }