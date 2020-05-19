import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Input, TextArea, FormBtn } from "../Form";
import "./style.css";
const Moment = require("moment");

class Home extends Component {
  state = {
    posts: [],
    body: "",
    author: "",
    // location: {
    //   city: "",
    //   state: "",
    //   zip: ""
    // },
    location: "",
    restaurants: []
  };

  componentDidMount() {
    this.loadPosts();
    
  }

  loadPosts = () => {
    API.locationLookUp()
      .then(res => {
        console.log("API locationlookup res", res)
        this.setState({ location: res.data })
        console.log("this location state: ", this.state.location)
        API.getPosts(this.state.location)
          .then(res =>
            this.setState({ posts: res.data, body: "", author: "" }),
          )
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err))
  };

  loadRestaurants = () => {
    console.log("API.yelpCall: ", this.state.location)
    API.yelpCall(this.state.location)
      .then(res => {
        this.setState({ restaurants: res.data })
      })
    console.log("restaurants state: ", this.state.restaurants)
  }

  // loadRestaurants = (location, term) => {
  //   console.log("loadRestaurants location: " + location)
  //   location.split(",").join("");
  //   API.yelpCall(location, term)
  //   .then(res => {
  //     var restaurantsInArea = [];
  //     console.log("restaurants now", res.data)
  //       for (var i=0; i< res.data.businesses.length; i++){
  //       var data = res.data.businesses[i];
  //       restaurantsInArea.push({
  //         name: data.name,
  //         address: {
  //           address1: data.location.address1,
  //           city: data.location.city,
  //           state: data.location.state,
  //           zip: data.location.zip_code
  //         },
  //         phone: data.display_phone,
  //         img: data.image_url,
  //         url: data.url,
  //         rating: data.rating,
  //         distance: data.distance * 0.000621371,
  //         isClosed: data.is_closed


  //       })
  //     }      
  //     function compare(a, b) {
  //       // Use toUpperCase() to ignore character casing
  //       const bandA = a.distance;
  //       const bandB = b.distance;
        
  //       let comparison = 0;
  //       if (bandA > bandB) {
  //         comparison = 1;
  //       } else if (bandA < bandB) {
  //         comparison = -1;
  //       }
  //       return comparison;
  //     }
      
  //     restaurantsInArea.sort(compare);
  //     this.setState({ restaurants: restaurantsInArea })
  // })
  //   .catch(err => console.log(err));
  // }

//   deleteBook = id => {
//     API.deleteBook(id)
//       .then(res => this.loadBooks())
//       .catch(err => console.log(err));
//   };

handleInputChange = event => {
  const { name, value } = event.target;
  this.setState({
    [name]: value
  });
  console.log("handleInputChange value: " + this.state.author)
  console.log(this.state.body)
};

handleFormSubmit = event => {
  event.preventDefault();
  console.log("in handle form submit")
  if (this.state.body && this.state.author) {
    API.savePost({
      body: this.state.body,
      author: this.state.author,
      location: this.state.location
    })
      .then(res => this.loadPosts(), console.log("post was saved"))
      .catch(err => console.log(err));
  }
};

locationClick = event => {
  event.preventDefault();
  // API.locationLookUp()
  // .then(res =>{
  //   this.setState({ location: res.data })
  // })
  //   .catch(err => console.log(err))
  // console.log(this.state.location);
  this.loadRestaurants();
}

render() {
  return (
    <Container fluid>
      <li><a href="/">home</a></li>
      <li><a href="/login">Login</a></li>
      <Row>
        <Col size="md-12">
          {/* <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron> */}
          <form>
            <Input
              value={this.state.author}
              onChange={this.handleInputChange}
              name="author"
              placeholder="Author (required)"
            />
            <TextArea
              value={this.state.body}
              onChange={this.handleInputChange}
              name="body"
              placeholder="Post Body"
            />
            <FormBtn
              disabled={!(this.state.author && this.state.body)}
              onClick={this.handleFormSubmit}
            >
              Submit Post
              </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          {/* <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron> */}
          <button onClick={this.locationClick}>Location</button>
          <h2>Posts</h2>
          {this.state.posts.length ? (
            <List>
              {this.state.posts.map(post => (
                <ListItem key={post._id}>
                    <h3>{post.author}</h3>
                    <h4>Location: {post.location}</h4>
                    <p>Date: {Moment(post.date).format('MMMM Do YYYY, h:mm a')}</p>
                    <p>{post.body}</p>
                </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>
        <Col size="md-6 sm-12">
          <h2>Kathy's Recommendations</h2>
        {this.state.restaurants.length ? (
          <List>
            {this.state.restaurants.map((restaurant, index)=> (
              <ListItem key={"restaurant" + index}>
                <h3>{restaurant.name}</h3>
                <div>
                  <p>
                    Rating: {restaurant.rating}    |     
                    Distance: {restaurant.distance.toFixed(2)} miles
                  </p>
                </div>
                <p>
                   {restaurant.address.address1} <br />
                   {restaurant.address.city}, {restaurant.address.state} {restaurant.address.zip}
                </p>
                <p>
                   Phone: {restaurant.phone}
                </p>
                <img src={restaurant.img} alt="Restaurant Photo" className="rest-img"></img>
                <a href={restaurant.url}>Check {restaurant.name} out on Yelp!</a>
                <p>
                   {restaurant.name} is: {restaurant.isClosed ? "Closed": "Open"}
                </p>
            
            </ListItem>
            ))}
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>

    </Container>
  );
}
}

export default Home;

// {this.state.restaurants.map((restaurant, index)=> (
//   <ListItem key={"restaurant" + index}>

// Address: {restaurant.address.address1}{restaurant.address.city}
//                    {restaurant.address.state}
//                    {restaurant.address.zip}


//                    {restaurant.name} is: {restaurant.isClosed ? "Closed": "Open"}\
                   
//                    <img src={restaurant.img} alt="resturant image"></img>
//                   <a href={restaurant.url}>this is a link to the yelp page</a>
                 
