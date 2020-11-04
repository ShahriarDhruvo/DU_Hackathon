import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
// import { CardColumns } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Home.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../Header/Header";
import LoadingScreen from "../generic/LoadingScreen";

const axios = require("axios");

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dept : [],
      courses : {},
      promise : false,
      dept_id: null,
      dept_size : null
    };
  }

  async componentDidMount() {
    let endpoint = "api/v1/university/departments/list/";
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const fetchdept = async () => {
      await axios.get(endpoint, config)
      .then((response) => {
        let tmparray = [];
        
        for (var i = 0; i < response.data.length; i++) {
          tmparray.push(response.data[i]);
        }
        this.setState({
          dept: tmparray,
          dept_size : response.data.length
        });
      });
    
    }
    await fetchdept();

    const fetchcourse = async() => {

      for(let i=0;i < this.state.dept.length; i++){
      
        let endpoint1 = `api/v1/university/departments/courses/${this.state.dept[i].id}/list/`;
        let current_dept_id = this.state.dept[i].id;
          await axios.get(endpoint1, config)
          .then((response) => {
            let tmparray = [];
            
            for (var j = 0; j < response.data.length; j++) {
              tmparray.push(response.data[j]);
            }
  
            this.setState({
              courses: {
                ...this.state.courses,
                [current_dept_id] : tmparray,
              }
            },() => {console.log(this.state)})
          });
        }
    }
    
    await fetchcourse();
    console.log(this.state);
  }


  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite: true,
            dots: true,
          },
        },
      ],
    };
    let deptcoursel;
    if(Object.keys(this.state.dept).length > 0)
    {
      deptcoursel = this.state.dept.map((iitem,i) => {
        return(
          <div>
            <h1 className="">{iitem.name}</h1>
            <style>{cssstyle}</style>
            <Slider {...settings}>
            {
            this.state.courses[iitem.id] ?
            (
              this.state.courses[iitem.id].map((item) => {
                return(
                  <div>
                    <Card className="course">
                      <Card.Body>
                        <Card.Title className="course__name">{item.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {item.details}
                        </Card.Subtitle>
                        <Card.Text className="course__info">
                          Some quick example text to build on the card title and make
                          up the bulk of the card's content.
                        </Card.Text>
                        <Button variant="outline-primary">Enroll</Button>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            ):(
              <LoadingScreen />
            )
            }
            </Slider>
          </div> 
        )
      })
    }
    return (
          <div>
          {this.state.courses && Object.keys(this.state.courses).length > 0 ? 
          (
            <div>
              <Header />
              <Container className="dept" fluid>
                {deptcoursel}
              </Container>
            </div>
          ) : (
            <LoadingScreen />
          )}
          </div>
    );
  }
}
const cssstyle = `
.slick-next:before, .slick-prev:before {
    color: #000;
}
`;
