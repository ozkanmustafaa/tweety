import React, { Component } from 'react';
import axios from 'axios';

function getdisplayName(WrappedComponent){
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withApiProgress(WrappedComponent, apiPath) {
    return class extends Component {
        static displayName = `ApiProgress(${getdisplayName(WrappedComponent)})`;
       // static displayName = 'ApiProgress('+getdisplayName(WrappedComponent)+')';

        state = {
            pendingApiCall: false
        }
        
        componentDidMount(){
            this.requestInterceptor = axios.interceptors.request.use((request) => {
                this.updateApiCallFor(request.url, true)
                return request;
            });
        
            this.responseInterceptor = axios.interceptors.response.use((response) => {
                this.updateApiCallFor(response.config.url, false)
                return response;
            }, error => {
                this.updateApiCallFor(error.config.url, false)
                throw error;
            });
        
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor);
        }
        
        updateApiCallFor = (url, inProgress) => {
            if(url == apiPath){
                this.setState({pendingApiCall: inProgress})
            }
        }
        
            render() {
                const {pendingApiCall} = this.state;
                return <WrappedComponent pendingApiCall={pendingApiCall} {... this.props}/>
            }
        }
}