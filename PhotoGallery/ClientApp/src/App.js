import React, { Component } from "react";
import Header from "./components/Header";
import Photogallery from "./components/PhotoGallery";
import NewPhoto from "./components/NewPhoto";
import EditPhoto from "./components/EditPhoto";
import { Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component{

    constructor() {
        super();

        //#region state declaration
        this.state = {
            myPosts : [{
                photoId: 0,
                imageLink: "https://static.euronews.com/articles/stories/05/85/91/80/1440x810_cmsv2_db0d87d0-0896-5d43-b056-468d484edcc4-5859180.jpg",
                description: "Old town in Tallinn",
                timestamp: "2021 - 10 - 10T11: 29: 46"
             }, 
             {
                photoId: 1,
                imageLink: "https://www.usnews.com/dims4/USNEWS/298201f/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F76%2F01%2Fbe89becd4c94a7f803eef2aac78e%2F180205-editorial.bc.estonia.eresidency_main.jpg",
                description: "Tallinn's New Town",
                timestamp: "2021 - 10 - 30T11: 29: 46"
             },
             {
                photoId: 2,
                imageLink: "https://bnn-news.com/wp-content/uploads/2019/08/1KT26AUG19I3.jpg",
                description: "#Tartu2024",
                timestamp: "2021 - 10 - 20T11: 29: 46"
             }, 
             {
                photoId: 3,
                imageLink: "https://media-cdn.tripadvisor.com/media/photo-s/07/25/39/7d/estonian-experience.jpg",
                description: "Winter Time!",
                timestamp: "2021 - 10 - 10T11: 29: 46"
             }],
            //Sample for another "state"
            page: 'app'
        };
        //#endregion

        //These bindings are necessary to make them work in the callback
        this.deletePhoto = this.deletePhoto.bind(this);
        //this.navigation = this.navigation.bind(this);
    }

    fetchData(){
        axios.get(this.props.environment)
            .then((json) => {
                this.setState({
                    myPosts: json.data
                });
            })
            .catch(function (error) {
                //This catch is exectuded in case of 404 status code
                console.log(error);
            });
    }

    addPhoto(postAdded, history){
        axios.post(this.props.environment, {
            imageLink: postAdded.imageLink,
            description: postAdded.description,
            timestamp: new Date()
        })
            .then(() => {
                alert("Photo saved successfully");
                this.refreshPage(history);
            });

        /*Solution with array*/
        //this.setState((appState) => ({
        //    myPosts: appState.myPosts.concat(postAdded)
        //}))
    }

    updatePhoto(postEditted, history) {
        axios.put(this.props.environment + postEditted.photoId,
            postEditted
        )
            .then(() => {
                alert("Photo updated successfully");
                this.refreshPage(history);
            });

        /*Solution with array*/
        //this.setState((appState) => ({
        //    myPosts: appState.myPosts.concat(postAdded)
        //}))
    }

    deletePhoto(postDeleted) {
        axios.delete(this.props.environment + postDeleted.photoId)
            .then(() => {
                alert('Photo deleted successfully');
                this.refreshPage();
            });

        /**
         * -'setState' enqueues changes to the component state and tells React to re-render it
         * 
         * -It uses parenthesis '()' in the arrow function (which returns an object)
         *  to avoid using  return  that's required after curly braces '{' 
        */
        //this.setState((mainState) => ({
        //    //'filter' returns the array elements that meet the condition specified.
        //    myPosts : mainState.myPosts.filter((post) => post !== postDeleted)
        //}));

        //#region Other ways of developing this
        /*A way of doing this with return*/
        //this.setState((mainState) => {
        //    //'filter' returns the array elements that meet the condition specified.
        //    return { myPosts: mainState.myPosts.filter((post) => post !== postDeleted) }
        //});

        /*Another way of doing it*/
        //this.setState((mainState) => 
        //    mainState.myPosts = mainState.myPosts.filter((post) => post !== postDeleted)
        //);
        //#endregion
    }

    //By default, it redirects to the root page
    refreshPage(history = null, redirectTo = '/') {
        if (history !== null)
            history.push(redirectTo);
        
        window.location.reload();
    }

    /*Sample for concise 'setState'*/
    //navigation(){
    //    this.setState({
    //        page: 'addPhotos'
    //    })
    //}

    componentDidMount(){
        this.fetchData();

        /*Solution with array*/
        // const posts = fetchData();
        // this.setState({
        //     myPosts : posts
        // });
    }

    componentDidUpdate(prevProps, prevState){
        console.log('Array value: ', prevState);
        console.log('Table value:', this.state);
    }

    //#region Inline if with Logical && Operator
    // {
    //     //if the condition is true, the element right after && will appear in the output.
    //     //If it is false, React will ignore and skip it.
    //     this.state.page === 'app' && (
    //         <div>
    //             <Header title = {this.props.title} />
            
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
                    <Header title = {this.props.title} />
                
                    <Photogallery posts = {this.state.myPosts} 
                                  onDeletePhoto={this.deletePhoto} />
                               {/*onNavigation = {this.navigation}*/} 
                </div>    
            )}/>
            
            {/* Curly braces '{' for history because it needs to be passed as an Object */}
            <Route path ="/NewPhoto" render= {({history}) => 
                /*-It uses arrow function because NewPhoto is a class
                  -After => it goes back to JXS                    */
                <NewPhoto onNewPhoto = {(newPhoto) => {
                        this.addPhoto(newPhoto, history);
                    }}/>
            }/>

            <Route path="/EditPhoto" render={({ history }) =>
                <EditPhoto environment = {this.props.environment}
                           posts = {this.state.myPosts} 
                           /*'postEditted' will be defined by the caller (in this case EditPhoto.js)*/
                           onEditPhoto={(postEditted) => {
                                this.updatePhoto(postEditted, history);
                           }} 
                />
            } />

            {/* <Route path ="/NewPhoto" component={NewPhoto}/> */}

            </React.StrictMode>
        );
    }
}

export default App;