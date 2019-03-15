import React from 'react';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const createUserQuery   = gql`
mutation ($name: String!){
	createUser(name: $name){
    name
  }
}
`
const getUsers = gql`
{
    users{
    name
    _id
    }
}
`

class CreateUser extends React.Component {
    state = {  }

    handleCreateUser = (func) => {
        const name = document.getElementsByClassName("username")[0].value;
        func({ variables: { name: name } })
    }
    render() { 
        return ( 
            <>
            <p>create user </p>
            <input className="username" placeholder="name" />
            <Mutation mutation={createUserQuery} 
            refetchQueries={[{query: getUsers}]}
                // update={(cache, {data: user }) => {
                //     const {users} = cache.readQuery({query: getUsers});
                //     users.push(user.createUser)
                //     // console.log(users);
                //     // console.log(Array.prototype)
                // }}
                 >
                {(createUserfunc, { loading,error, data}) => {
                    return (
                        <>
                        <button onClick={ e => {this.handleCreateUser(createUserfunc)}} >create</button>
                        {loading ? "loading" : null}
                        {error ? console.log("error",   error) : null}
                        {data? <p>created user {data.createUser.name}</p> : null}
                        </>
                    )
                }}
                
            </Mutation>
            </> 
         );
    }
}
 
export default CreateUser;