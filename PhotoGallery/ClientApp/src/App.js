import React, { Component } from "react";
import Header from "./components/Header";
import Photogallery from "./components/PhotoGallery";
import NewPhoto from "./components/NewPhoto";
import EditPhoto from "./components/EditPhoto";
import { Route } from 'react-router-dom';
import axios from 'axios';
import LoadMore from "./components/LoadMore";

class App extends Component{

    constructor() {
        super();

        //#region state declaration
        this.state = {
            myPosts : [],

            loadNumber: '2',

            /*Sample for another "state"*/
            //page: 'app'
        };
        //#endregion

        //These bindings are necessary to make state work in the callback
        this.fetchData = this.fetchData.bind(this);
        this.deletePhoto = this.deletePhoto.bind(this);
        this.handleNumber = this.handleNumber.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        //this.navigation = this.navigation.bind(this);
    }

    fetchData(loadNumber) {
        axios.get(this.props.environment + "?skip=" + this.state.myPosts.length +
                                           "&rowsNumber=" + loadNumber)
            .then((json) => {
                if (json.data.length > 0) {
                    this.setState({
                        myPosts: this.state.myPosts.concat(json.data)
                    });
                }
                else {
                    alert(`There're no Photos to Load right now`);
                }

                //Sample for showing object on the console
                console.dir(json.data.length);
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

                this.state.myPosts.push({
                    undefined //Populated by "fetchData" inside refreshPage (next instruction)
                });

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
        let auxLoadNumber;

        auxLoadNumber = this.state.myPosts.length;
        this.setState({
            myPosts: [] //This way, it won't skyp any records
        });

        if (history != null)
            history.push(redirectTo);

        this.fetchData(auxLoadNumber);
        //window.location.reload();
    }

    handleNumber(event) {
        this.setState({
            loadNumber: event.target.value
        });
    }

    /*Sample for concise 'setState'*/
    //navigation(){
    //    this.setState({
    //        page: 'addPhotos'
    //    })
    //}

    componentDidMount() {
        this.fetchData(this.state.loadNumber);

        /*Solution with array*/
        // const posts = fetchData();
        // this.setState({
        //     myPosts : posts
        // });
    }

    componentDidUpdate(prevProps, prevState){


        /*Sample for comparing the current state with the previous*/
        //console.log('Array value: ', prevState);
        //console.log('Table value:', this.state);
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

                    <LoadMore loadNumber={this.state.loadNumber}
                              onHandleNumber={this.handleNumber}
                              onFetchData={this.fetchData} />
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

            {/*<Route path ="/NewPhoto" component={NewPhoto}/>*/}

            </React.StrictMode>
        );
    }
}

export default App;