import { Combobox, Transition } from "@headlessui/react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Fragment } from "react";
import { FaDirections } from "react-icons/fa";

const PlacesAutocomplete = ({
    onAddressSelect, onDirectionChoice, source
}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {},
        debounce: 300,
        cache: 86400,
    });

    const renderSuggestions = () => {
        return data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <Combobox.Option
                    key={place_id}
                    className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                        }`
                    }
                    value={suggestion}
                >
                    {({ selected, active }) => (
                        <>
                            <span
                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                    }`}
                            >
                                <strong>{main_text}</strong> <small>{secondary_text}</small>
                            </span>
                            {selected ? (
                                <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                        }`}
                                >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                            ) : null}
                        </>
                    )}
                </Combobox.Option>
            );
        });
    };

    return (
        <div className={`p-2 `}>
            <Combobox value={value} onChange={(value) => {
                setValue(value.description, false);
                // clearSuggestions();
                onAddressSelect && onAddressSelect(value.description);
            }}>
                <div className="relative mt-1">
                    <div className="flex w-full justify-between cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 px-3 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
                            disabled={!ready}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                            placeholder="Search places"
                        />
                        <div className="inset-y-0 flex justify-center items-center pr-2 space-x-2">
                            <Combobox.Button >
                                <MagnifyingGlassIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                            {
                                source && (
                                    <FaDirections
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                        onClick={onDirectionChoice}
                                    />
                                )
                            }
                        </div>
                    </div>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    // afterLeave={() => setValue('', false)}
                    >
                        <Combobox.Options className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${source ? 'z-20' : 'z-18'}`}>
                            {status === "OK" ?
                                (renderSuggestions()) :
                                (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Search for places.
                                    </div>
                                )
                            }
                        </Combobox.Options>

                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};

export default PlacesAutocomplete;