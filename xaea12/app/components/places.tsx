import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from 'react-select';
import { useState, useMemo, useCallback, useRef } from "react";
import { colors } from "@mui/material";
type PlacesProps = {
    setBusiness: (position: google.maps.LatLngLiteral) => void;
}
export default function Places({ setBusiness }: PlacesProps) {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const [type, setType] = useState();
    const handleInputChange = (event: any) => {
        setValue(event.target.value);
    };
    const handleInputChange1 = (event: any) => {
        setType(event.target.value);
    };

    const handleSelect = async (val: string) => {
        setValue(val, false);
        clearSuggestions();

        const results = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(results[0]);
        setBusiness({ lat, lng });
    };
    const handleSelect1 = async (val: string) => {
        
    };

    return (
        <div>
            <h1 style={{color:'black'}}>fdsfs</h1>
            <div>
                <input
                    className="combobox-input"
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    placeholder="Enter business locality"
                />
                {handleSelect && (
                    <ul style={{ backgroundColor: '#fff', color: '#333' }}>
                        {data.map(({ place_id, description }) => (
                            <li key={place_id} onClick={() => handleSelect(description)}>
                                {description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h1 style={{color:'black'}}>fdsfs</h1>
            <h1 style={{color:'black'}}>fdsfs</h1>
            <div>
                <input
                    className="combobox-input"
                    type="text"
                    value={type}
                    onChange={handleInputChange1}
                    placeholder="Enter business type"
                />
            </div>
        </div>
    )
}