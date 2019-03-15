import React, { Component } from 'react';
import gql from "graphql-tag";
import {Query, Mutation} from "react-apollo";

const udpateUser = gql`
mutation ($name: String!, $newName: String!){
    updateUser(name: $name, newName: $newName){
    name
  }
}`

const getUsers = gql`
{
    users{
    name
    _id
    }
}
`

class ShowUsers extends Component {

    state = {
        reload: true
    }

    // handlegetUsers =() => {
    //     this.setState({isLoading: true});
    //     client.query({
    //       query: gql`
    //         {
    //           users{
    //             name
    //           }
    //         }
    //       `
    //     }).then(result => {
    //       this.setState({isLoading: false, users: result.data.users});
    //     })
    //   }

    handleEditName = (name,func) => {
        const newName = document.getElementsByClassName("updateusername0")[0].value;
        func({variables:{name,newName}});
    }

      
    render() { 
        console.log(" i am executing");
        return ( 

            <>
                    <Query query={gql`
                        {
                            users{
                            name
                            }
                        }
                    `} >
                    
                    {({loading, error,data}) => {
                        // console.log("this func is executing", loading, data)
                        if(loading) return "Loading..."
                        
                        if(data){
                            // console.log("data", data)
                            return data.users.map((user,i) => (
                                <>
                                    {user?  <p>{user.name}
                                    {/* {console.log(user)} */}
                                    </p> : null}
                                   
                                     {/* <Mutation mutation={udpateUser}
                                     refetchQueries={[{query:getUsers}]}
                                    //  update={(cache, {data: user }) => {
                                    //     const {users} = cache.readQuery({query: getUsers});
                                    //     users[i] = user.updateUser;
                                    //     // console.log("updated user",  user.updateUser)
                                    //     // console.log(users);  
                                    //     // console.log(Array.prototype)
                                    // }}
                                     >
                                    {(updateUserfunc, {loading,error,data}) => {
                                        return (
                                            <>
                                                <input className={"updateusername"+i} />
                                               <button onClick={e => this.handleEditName(user.name,updateUserfunc)} >edit</button> 
                                            </>
                                        )
                                    }}
                                    </Mutation> */}
                                </>
                               
                        ))
                        }
                        else{
                            return <p>no data found</p>
                        }
                        
                    }}

                    </Query>
                    {console.log("In render")}
                    {/* <button onClick={this.handleClick} >get users</button> */}
            </>
            
         );
    }
}
 
export default ShowUsers;