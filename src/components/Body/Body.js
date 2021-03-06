import React, { useEffect, useState } from 'react';
import Places from '../Places/Places';
import WishList from '../WishList/WishList';
import './Body.css'

const Body = () => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        fetch('places.json')
            .then(res => res.json())
            .then(data => setCountries(data))
    }, [])
    const [lists, setList] = useState([]);
    let newArray = [];
    const addToWishList = (selectedCountry) => {
        if (lists.length < 4) {
            if (lists.indexOf(selectedCountry) < 0) {
                newArray = [...lists, selectedCountry];
                setList(newArray)
            }
        }
        else {
            alert("You can't add more then 4 Places in you Wish List!")
        }
    }
    const chooseAgain = () => {
        setList([]);
    }
    const getBest1 = () => {
        if (lists.length >= 1) {
            const bestArray = lists[Math.floor(Math.random() * lists.length)];
            setList([bestArray])
        }
        else {
            alert('Please, select at least 1 item to your Wish list!')
        }
    }
    return (
        <div className='country-container'>
            <h1 className='my-3 text-center text-primary'>Passionate Traveler</h1>
            <h3 className='my-3 text-center'>Choose 4 Places</h3>
            <div className='row'>
                {/* country section */}
                <div className="country-section py-4 col-12 col-md-9 order-2 order-md-1">
                    <div className='row row-cols-1 row-cols-md-3 g-4'>
                        {
                            countries.map(country => <Places key={country.id} country={country} addToWishList={addToWishList} />)
                        }
                    </div>
                </div>
                {/* wishlist */}
                <div className="selected-countries py-4 col-12 col-md-3 order-1 order-md-2">
                    <WishList lists={lists} chooseAgain={chooseAgain} getBest1={getBest1} />
                </div>
            </div>
        </div>
    );
};

export default Body;