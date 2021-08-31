import React, { Component } from "react";
import { Link } from "react-router-dom";
import {callApi, s, e, swr, apiConfigs, url} from '../../adapter/common'
import InputField from '../../components/inputField';
import Buttona from '../../components/buttona';

import styles from "../../styles/dashboard/home.module.scss";


class AdminHome extends Component{
    
constructor (props){
        super(props)

        this.state = {
            openAdmin: false
        }
    
        let user = JSON.parse(localStorage.user)
        this.state = {
            file_name: '',            
            file_folder: '',
            user: user,
            isLoading: false
        }
    }

    async upload(){
        if(this.state.isLoading === true){
            return
        }
        if(this.state.file_name && this.state.file_name.trim()==='' && this.state.file_folder && this.state.file_folder.trim()===''){
            return e("Please, ensure you've uploaded a file")
        }
        else{
            this.setState({
                isLoading : true
            })

            const dataObj = new FormData()
            dataObj.append('file_name', this.state.file_name)
            dataObj.append('file', this.state.file_folder)
            dataObj.append('user_id', this.state.user.id)
            
            const res = await callApi('post', apiConfigs.apiUp+'upload', dataObj)
            if(res.status===201){
                s("Your file has been uploaded successfully")
                this.setState({
                    file_name: '',          
                    file_folder: ''
                })
            }
            else{
                swr("Please, you'll have to upload a file")
            }

            this.setState({
                isLoading : false
            })
        }
    }

    setFold(e){
        this.setState({
            file_folder: e.target.files[0]
        })
    }
    
    model(e){
        this.setState({
            [e.name]: e.text
        })
    }

    openMobile(){
        this.setState({
            openAdmin: true
        })
        document.getElementsByClassName(styles.upres)[0].style.transform="scale(0)"
    }
    
    closeMobile() {
        this.setState({
            openAdmin: false
        })
        document.getElementsByClassName(styles.upres)[0].style.transform = "scale(1)"
    }

    logout(){
        localStorage.removeItem('user')
        this.props.history.push('/onboard/admin-entry')
    }

    render(){
        
        return(
            <div>
                    <div className="content-container">
                    <div className="content">

                        <div className={styles.wrapper}>
                            <div className={styles.upload}>                       
                                <div className={styles.head}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                                    </svg>

                                    <div className={styles.opt}>
                                        <span>
                                            <legend></legend>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                        </span>

                                        <Link to={url.signUp}>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>

                                <div className={styles.welcome}>
                                    <h6>Tips: Drag or drop a file in your stash 📁.</h6>
                                </div>

                                <div className={styles.up}>
                                    <InputField type="text" name="file_name" placeholder="File name" placeinside="File name" val={this.state.file_name} inputValue={ e => this.model(e)} />

                                    <div className={styles.imageUp}>
                                        <label style={this.state.file_folder !== '' ? {borderColor: '#168AE6', color: '#f5f5fa'} : {}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={this.state.file_folder !== '' ? '#168AE6' : '#6C7884'}>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill="none"/>
                                        </svg>
                                        
                                        <input type="file" name="file_folder" className={styles.file}          val={this.state.file_folder} onChange={(e) => this.setFold(e)} />
                                        </label> 
                                    </div>
                                    
                                    <Buttona onClick={() => this.upload()} isLoading={this.state.isLoading} text="UPLOAD"/>
                                </div>

                                
                            </div>
                            
                            <div className={styles.download}>
                                <div className={styles.mHouse}>
                                {
                                this.state.openAdmin === false
                                ?                               
                                <svg className={styles.menuSvg} onClick={() => this.openMobile()} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 10.1734L22.9 0.273438L25.728 3.10144L15.828 13.0014L25.728 22.9014L22.9 25.7294L13 15.8294L3.09997 25.7294L0.271973 22.9014L10.172 13.0014L0.271973 3.10144L3.09997 0.273438L13 10.1734Z" fill="currentColor" />
                                </svg>
                                :
                                <svg onClick={() => this.closeMobile()} className={styles.menu} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" height="25" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                                </svg>
                                }
                                </div>
                                
                                <div className={styles.head}>
                                    <h3>Hi Admin.</h3>

                                    <span onClick={() => this.logout()} className={styles.a}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </span>
                                </div>

                                <div className={styles.info}>
                                    <div className={styles.wrap_i}>
                                        <div className={styles.i}>
                                            <div className={styles.icon}>
                                                <span>12</span>
                                            </div>

                                            <div className={styles.desc}>
                                                <span>View all users <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                </svg>
                                                </span>
                                            </div>
                                        </div>

                                        <div className={styles.i}>
                                            <div className={styles.icon}>
                                                <span>5</span>
                                            </div>

                                            <div className={styles.desc}>
                                                <span>Files in your stash</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.stash}>
                                    <div className={styles.folder}>
                                        <h3>
                                            Stash 1.
                                        </h3>
                                        
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className={styles.folder}>
                                        <h3>
                                            Stash 1.
                                        </h3>
                                        
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className={styles.folder}>
                                        <h3>
                                            Stash 1.
                                        </h3>
                                        
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                            </svg>
                                        </span>
                                    </div>

                                    <div className={styles.folder}>
                                        <h3>
                                            Stash 1.
                                        </h3>
                                        
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                            </svg>
                                        </span>
                                    </div>

                                    <div className={styles.folder}>
                                        <h3>
                                            Stash 1.
                                        </h3>
                                        
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                            </svg>
                                        </span>
                                    </div>

                                </div>
                            </div>

                            {/*responsive view for upload*/}
                            <div className={styles.upres}>                       
                                <div className={styles.head}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                                    </svg>

                                    <div className={styles.opt}>
                                        <span>
                                            <legend></legend>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                        </span>

                                        <Link to={url.signUp}>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>

                                <div className={styles.welcome}>
                                    <h6>Tips: Drag or drop a file in your stash 📁.</h6>
                                </div>

                                <div className={styles.up}>
                                    <InputField type="text" name="file_name" placeholder="File name" placeinside="File name" val={this.state.file_name} inputValue={ e => this.model(e)} />

                                    <div className={styles.imageUp}>
                                        <label style={this.state.file_folder !== '' ? {borderColor: '#168AE6', color: '#f5f5fa'} : {}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={this.state.file_folder !== '' ? '#168AE6' : '#6C7884'}>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill="none"/>
                                        </svg>
                                        
                                        <input type="file" name="file_folder" className={styles.file}          val={this.state.file_folder} onChange={(e) => this.setFold(e)} />
                                        </label> 
                                    </div>
                                    
                                    <Buttona onClick={() => this.upload()} isLoading={this.state.isLoading} text="UPLOAD"/>
                                </div>                                
                            </div>
                            {/*responsive view for upload*/}

                        </div>  
                            
                    </div>
                </div>
            </div>
        );
    }
    
}

export default AdminHome;




                                  
