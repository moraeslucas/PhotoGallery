import React from 'react';

//First stateless function created
function Header(props)
{
        return (
            <div>
                <h1>{props.title}</h1>
            </div>
        );
}

export default Header;