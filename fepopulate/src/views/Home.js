import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/home.css'
import Select from 'react-select'
import auth from '../app/auth'


const Home = props => {
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('')
    const [country, setCountry] = useState([])
    const options = []

    const getCountriesHandler = async () => {  
        await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
            country: selectedCountry
        })
        .then(function (response) {
            setCountry(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const optionStyle = {
        width: 100
    }
    
    const getCountries = async () => {
        await axios.get('https://countriesnow.space/api/v0.1/countries/info?&returns=flag,unicodeFlag')
        .then(res => {
            setCountries(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleChange = e => {
        setSelectedCountry(e.value)
    }
    

    useEffect(() => {
        getCountries()
    }, []);

    return (
        <div className="HomeWrapper">
            <nav>
                <h1 className="brand-title">Populate</h1>
                <button 
                    type="button"
                    id="logoutBtn"
                    onClick={() => {
                        auth.logout(() => {
                            props.history.push("/")
                        })
                    }}
                >
                    Logout
                </button>
            </nav>
            <h1 className="title">Population Data of Countries around the World</h1>
            {
                countries?.map((data) => {
                    options.push({value: data.name, label: data.name})
                })
            }
            <div className="searchCountry">
                <label>Select Country</label>
                <Select 
                    options={options} 
                    styles={optionStyle} 
                    value={countries.find(obj => obj.value === selectedCountry)}
                    onChange={handleChange}
                />
                <button className="searchCountryBtn" onClick={getCountriesHandler}>Show Information</button>
            </div>
            <div className="populationTblWrapper">
                <h1>{country.country}</h1>
                <table className="populationTbl">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Population</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                    {
                        country.populationCounts?.map((i) => {
                            return(
                            <tr key={i.year}>
                                <td>{i.year}</td>
                                <td>{i.value}</td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
