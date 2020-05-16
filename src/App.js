import React from 'react';
import Particles from 'react-particles-js';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const particleOptions = { 
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        area: 800
      }
    }
  }
}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      name: '',
      id: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }

class App extends React.Component {
  
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
      fetch('https://shielded-peak-28417.herokuapp.com/')
      .then(resp => resp.json())
      .then(console.log)
  }

  loadUser = (user) => {
    this.setState({
      user: {
        name: user.name,
        id: user.id,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const bounding_box = data.outputs[0].data.regions[0].region_info.bounding_box

    const input_image = document.getElementById("inputimage")
    const width = Number(input_image.width)
    const height = Number(input_image.height)
    console.log(width, height)

    // Return the margins of face box edges from the image edge
    return {
      left_col: bounding_box.left_col * width,
      right_col: width - (bounding_box.right_col * width),
      top_row: bounding_box.top_row * height,
      bottom_row: height - (bounding_box.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    console.log("click")
    this.setState({imageUrl: this.state.input})

    // Note: this.state.imageUrl DOES NOT WORK
    // app.models.predict(Clarifai.COLOR_MODEL, 
    //                    this.state.imageUrl)

    const imgRequest = {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
              id: this.state.user.id,
          })
    }

    fetch('https://shielded-peak-28417.herokuapp.com/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                        input: this.state.input})
        })
        .then(response => response.json())
        .then(response => {
              // Increment the entry count if there's a response
              if (response) {
                fetch('https://shielded-peak-28417.herokuapp.com/image', imgRequest)
                .then(resp => resp.json())
                .then(entries => {
                    this.setState(Object.assign(this.state.user, {entries: entries}))
                      })
              }
              
              this.displayFaceBox(this.calculateFaceLocation(response))
            })
        .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }

    this.setState({route: route})
  }

  render(){
    // console.log("-- App JS user --", this.state.user)

    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {
          this.state.route === 'home' ?
              <div>
                <Logo />
                <Rank name={this.state.user.name} 
                      entries={this.state.user.entries}/>
                <ImageLinkForm 
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
              </div>
              :
            (
              this.state.route === 'signin' ?
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                :
                // This page is shown when user signs out
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
