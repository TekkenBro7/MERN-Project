import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { geoApiOptions, GEO_API_URL } from "../api";

const Search = ({onSearchChange}) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        const url = `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`;
        return fetch(url, geoApiOptions)
            .then((response) => response.json())
            .then((data) => {
                return {
                    options: data.data.map((city) => ({
                        value: `${city.latitude}, ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    })),
                };
            })
            .catch((error) => {
                console.error('Ошибка при загрузке данных:', error);
                return { options: [] };
            });
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }


    return(
        <AsyncPaginate
            placeholder="Поиск города"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;