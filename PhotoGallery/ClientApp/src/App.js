import React, { Component } from "react";
import Header from "./components/Header";
import Photogallery from "./components/PhotoGallery";
import NewPhoto from "./components/NewPhoto";
import {Route} from 'react-router-dom';

//Used to be 'Main'
class App extends Component{
    constructor() {
        super();

        this.state = {
            myPosts : [{
                id: 0,
                description: "Old town in Tallinn",
                imageLink: "https://static.euronews.com/articles/stories/05/85/91/80/1440x810_cmsv2_db0d87d0-0896-5d43-b056-468d484edcc4-5859180.jpg"
             }, 
             {
                id: 1,
                description: "Tallinn's New Town",
                imageLink: "https://www.usnews.com/dims4/USNEWS/298201f/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F76%2F01%2Fbe89becd4c94a7f803eef2aac78e%2F180205-editorial.bc.estonia.eresidency_main.jpg"
             },
             {
                id: 2,
                 description: "#Tartu2024",
                 imageLink: "https://bnn-news.com/wp-content/uploads/2019/08/1KT26AUG19I3.jpg"
             }, 
             {
                id: 3,
                 description: "Winter Time!",
                 imageLink: "https://media-cdn.tripadvisor.com/media/photo-s/07/25/39/7d/estonian-experience.jpg"
             }],
             //Sample for another "state"
             page : 'main'
        };

        // This binding is necessary to make 'this' work in the callback
        this.deletePhoto = this.deletePhoto.bind(this);
        this.navigation = this.navigation.bind(this);
    }

    fetchData(){

    }

    addPhoto(postAdded){
        this.setState((mainState) => ({
            myPosts : mainState.myPosts.concat(postAdded)
        }))
    }

    deletePhoto(postDeleted) {
        /**
         * -'setState' enqueues changes to the component state and tells React to re-render it
         * 
         * -It uses parenthesis '()' in the arrow function (which returns an object)
         *  to avoid using  return  that's required after curly braces '{' 
        */
        this.setState((mainState) => ({
            //'filter' returns the array elements that meet the condition specified.
            myPosts : mainState.myPosts.filter((post) => post !== postDeleted)
        }));

        //A way of doing this with return
        //this.setState((mainState) => {
        //    //'filter' returns the array elements that meet the condition specified.
        //    return { myPosts: mainState.myPosts.filter((post) => post !== postDeleted) }
        //});

        //Another way of doing it
        //this.setState((mainState) => 
        //    mainState.myPosts = mainState.myPosts.filter((post) => post !== postDeleted)
        //);
    }

    //Sample for concise 'setState'
    navigation(){
        this.setState({
            page: 'addPhotos'
        })
    }

    componentDidMount(){
        // const posts = fetchData();

        // this.setState({
        //     myPosts : posts
        // });
    }

    componentDidUpdate(prevProps, prevState){
        console.log(prevState);
        console.log(this.state);
    }

    //#region Inline If with Logical && Operator
    // {
    //     //if the condition is true, the element right after && will appear in the output.
    //     //If it is false, React will ignore and skip it.
    //     this.state.page === 'main' && (
    //         <div>
    //             <Header title = {this.props.myTitle} />
            
    //             <Photogallery posts = {this.state.myPosts} 
    //                           onDeletePhoto = {this.deletePhoto}
    //                           onNavigation = {this.navigation} />
    //         </div>
    //     )
    // }
    //#endregion

    //Since there is a state into this method, it's triggered whenever this state changes
    render() {
        return (
            <React.StrictMode>
                    
            <Route exact path = "/" render={() => (
                <div>
                    <Header title = {this.props.myTitle} />
                
                    <Photogallery posts = {this.state.myPosts} 
                                  onDeletePhoto = {this.deletePhoto}
                                  onNavigation = {this.navigation} />
                </div>    
            )}/>

            {/* <Route path ="/NewPhoto" component={NewPhoto}/> */}
            
            {/* Curly braces '{' for history because it needs to be passed as an Object */}
            <Route path ="/NewPhoto" render= {({history}) => 
                /*-It uses arrow function because NewPhoto is a class
                  -After => it goes back to JXS                    */
                <NewPhoto onNewPhoto = {(newPhoto) => {
                        this.addPhoto(newPhoto);
                        history.push('/');
                    }}/>
            }/>

            </React.StrictMode>
        );
    }
}

export default App;