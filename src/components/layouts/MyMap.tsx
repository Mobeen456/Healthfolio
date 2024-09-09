"use client";
import React, { useState } from 'react';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import type CountyCode  from '@geoapify/geocoder-autocomplete';
type CountyCode = string[] | string |null;


const MyMap: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string | undefined>();
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const type = "city";
  const language = "en";
  const position = { lat: 0, lon: 0 };
  const countryCodes: CountyCode[] = ["ind", "usa", "can"]; // ISO 3166-1 alpha-2 codes;// ISO 3166-1 alpha-2 codes;
  const limit = 5;

  async function onPlaceSelect(value: any) {
    console.log(value);
    const selectedAddress = value?.properties?.formatted;
    setDisplayValue(selectedAddress);

    // Fetch hospitals based on the selected address
    const response = await fetch('/api/hospitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: selectedAddress }),
    });
    const data = await response.json();
    setHospitals(data);
  }

  function onSuggectionChange(value: any) {
    console.log(value);
  }

  return (
    <GeoapifyContext apiKey="a3233ceab7f24460a51c562772ed4a99"  >
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter address here"
        type={type}
        lang={language}
        position={position}
        
        limit={limit}
        value={displayValue}
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
      />
      {/* Render hospitals */}
      <div>
        {hospitals.length > 0 ? (
          <ul>
            {hospitals.map((hospital, index) => (
              <li key={index}>{hospital.name}</li>
            ))}
          </ul>
        ) : (
          <p>No hospitals found.</p>
        )}
      </div>
    </GeoapifyContext>
  );
}

export default MyMap;
