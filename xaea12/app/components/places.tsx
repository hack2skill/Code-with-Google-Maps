import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from 'react-select';
import { useState, useMemo, useCallback, useRef } from "react";
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

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
        setValue(event.target.value);
    };

    const handleSelect = async (selectedOption: any) => {
        const val = selectedOption.value;
        setValue(val, false);
        clearSuggestions();

        const results = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(results[0]);
        setBusiness({ lat, lng });
    };

    const options = data.map(({ place_id, description }) => ({ value: description, label: description }));

    return (
        // <Combobox onSelect={handleSelect}>
        //     <ComboboxInput
        //         value={value}
        //         onChange={(e) => setValue(e.target.value)}
        //         disabled={!ready}
        //         className="combobox-input"
        //         placeholder="Search business location"
        //     />
        //     <ComboboxPopover>
        //         <ComboboxList>
        //             {status === "OK" &&
        //                 data.map(({ place_id, description }) => (
        //                     <ComboboxOption key={place_id} value={description} />
        //                 ))}
        //         </ComboboxList>
        //     </ComboboxPopover>
        // </Combobox>
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search office address"
            />
            {ready && (
                <Select
                    value={options.find(option => option.value === value)}
                    onChange={handleSelect}
                    options={status === "OK" ? options : []}
                    placeholder="Or select from suggestions"
                />
            )}
        </div>

    )
}