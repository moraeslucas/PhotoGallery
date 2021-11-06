import React from 'react';

export default function LoadMore(props) {

    /*Sample with const instead of hardcoded into HTML*/
    //const options = [{
    //        label: 2,
    //        value: "2"
    //      }];

    return (
        <div className="load-more">
            <button className="button-load" onClick={() => {
                    props.onFetchData(props.loadNumber)
                }
            }>
                Load More...
            </button>

            <div className="divider" />

            <select name="loadNumber"
                id="loadNumber"
                value={props.loadNumber}
                onChange={props.onHandleNumber}
            >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                {/*{options.map((option) => (
                     <option value={option.value}>{option.label}</option>
                   ))}*/}
            </select>
        </div>
    );
}