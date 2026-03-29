"use client"

import React, { useState } from "react"
import { ArrowLeft, MapPin } from "lucide-react"
import { InputField, SelectField, Button, Card, ResultDisplay } from "../ui"

interface LocationCostProps {
  onBack: () => void
}

interface Location {
  name: string
  rate: number
  description: string
}

export default function LocationCost({ onBack }: LocationCostProps) {
  const locations: Record<string, Location> = {
    // Maharashtra
    mumbai: { name: "Mumbai, Maharashtra", rate: 2500, description: "Prime metropolitan area" },
    pune: { name: "Pune, Maharashtra", rate: 2000, description: "IT hub with competitive rates" },
    nagpur: { name: "Nagpur, Maharashtra", rate: 1600, description: "Central India location" },
    thane: { name: "Thane, Maharashtra", rate: 2200, description: "Mumbai metropolitan area" },
    nashik: { name: "Nashik, Maharashtra", rate: 1500, description: "Affordable region" },
    
    // Delhi, UP & NCR
    delhi: { name: "Delhi", rate: 2200, description: "National capital region" },
    noida: { name: "Noida, Uttar Pradesh", rate: 1900, description: "NCR satellite city" },
    ghaziabad: { name: "Ghaziabad, Uttar Pradesh", rate: 1850, description: "NCR region" },
    lucknow: { name: "Lucknow, Uttar Pradesh", rate: 1400, description: "Capital of UP" },
    kanpur: { name: "Kanpur, Uttar Pradesh", rate: 1300, description: "Industrial city" },
    
    // Karnataka
    bangalore: { name: "Bangalore, Karnataka", rate: 1900, description: "Tech capital" },
    mysore: { name: "Mysore, Karnataka", rate: 1400, description: "Heritage city" },
    mangalore: { name: "Mangalore, Karnataka", rate: 1600, description: "Coastal city" },
    belagavi: { name: "Belagavi, Karnataka", rate: 1350, description: "Border district" },
    
    // Tamil Nadu
    chennai: { name: "Chennai, Tamil Nadu", rate: 2000, description: "Metropolitan capital" },
    coimbatore: { name: "Coimbatore, Tamil Nadu", rate: 1700, description: "Industrial hub" },
    salem: { name: "Salem, Tamil Nadu", rate: 1400, description: "Industrial city" },
    madurai: { name: "Madurai, Tamil Nadu", rate: 1500, description: "Temple city" },
    tiruppur: { name: "Tiruppur, Tamil Nadu", rate: 1600, description: "Textile hub" },
    
    // Telangana & Andhra Pradesh
    hyderabad: { name: "Hyderabad, Telangana", rate: 2000, description: "IT city" },
    visakhapatnam: { name: "Visakhapatnam, Andhra Pradesh", rate: 1600, description: "Port city" },
    vijayawada: { name: "Vijayawada, Andhra Pradesh", rate: 1500, description: "Delta region" },
    vizag: { name: "Vizag, Andhra Pradesh", rate: 1600, description: "Coastal area" },
    
    // Gujarat
    ahmedabad: { name: "Ahmedabad, Gujarat", rate: 1800, description: "Fastest growing city" },
    surat: { name: "Surat, Gujarat", rate: 1750, description: "Diamond city" },
    vadodara: { name: "Vadodara, Gujarat", rate: 1650, description: "Industrial city" },
    rajkot: { name: "Rajkot, Gujarat", rate: 1550, description: "Western region" },
    
    // Punjab
    chandigarh: { name: "Chandigarh", rate: 1900, description: "Union territory" },
    punjab_amritsar: { name: "Amritsar, Punjab", rate: 1500, description: "Holy city" },
    ludhiana: { name: "Ludhiana, Punjab", rate: 1600, description: "Industrial hub" },
    mohali: { name: "Mohali, Punjab", rate: 1750, description: "IT sector growth" },
    
    // Haryana
    gurgaon: { name: "Gurgaon, Haryana", rate: 2100, description: "NCR corporate hub" },
    faridabad: { name: "Faridabad, Haryana", rate: 1800, description: "Industrial belt" },
    hisar: { name: "Hisar, Haryana", rate: 1300, description: "Agricultural region" },
    
    // Rajasthan
    jaipur: { name: "Jaipur, Rajasthan", rate: 1600, description: "Pink city" },
    jodhpur: { name: "Jodhpur, Rajasthan", rate: 1400, description: "Blue city" },
    udaipur: { name: "Udaipur, Rajasthan", rate: 1500, description: "Lake city" },
    kota: { name: "Kota, Rajasthan", rate: 1300, description: "Educational hub" },
    
    // Madhya Pradesh
    indore: { name: "Indore, Madhya Pradesh", rate: 1550, description: "Cleanest city" },
    bhopal: { name: "Bhopal, Madhya Pradesh", rate: 1400, description: "State capital" },
    gwalior: { name: "Gwalior, Madhya Pradesh", rate: 1350, description: "Historic city" },
    
    // West Bengal
    kolkata: { name: "Kolkata, West Bengal", rate: 1700, description: "Eastern metropolis" },
    darjeeling: { name: "Darjeeling, West Bengal", rate: 1400, description: "Hill station" },
    asansol: { name: "Asansol, West Bengal", rate: 1500, description: "Industrial city" },
    
    // Jharkhand
    ranchi: { name: "Ranchi, Jharkhand", rate: 1400, description: "Capital city" },
    jamshedpur: { name: "Jamshedpur, Jharkhand", rate: 1500, description: "Steel city" },
    dhanbad: { name: "Dhanbad, Jharkhand", rate: 1400, description: "Coal hub" },
    
    // Odisha
    bhubaneswar: { name: "Bhubaneswar, Odisha", rate: 1500, description: "Capital city" },
    cuttack: { name: "Cuttack, Odisha", rate: 1450, description: "Silver city" },
    rourkela: { name: "Rourkela, Odisha", rate: 1400, description: "Steel hub" },
    
    // Himachal Pradesh
    shimla: { name: "Shimla, Himachal Pradesh", rate: 1700, description: "Hill station" },
    manali: { name: "Manali, Himachal Pradesh", rate: 1600, description: "Tourist destination" },
    
    // Uttarakhand
    dehradun: { name: "Dehradun, Uttarakhand", rate: 1600, description: "Foothills city" },
    haridwar: { name: "Haridwar, Uttarakhand", rate: 1500, description: "Pilgrim city" },
    
    // Goa
    panaji: { name: "Panaji, Goa", rate: 1800, description: "Beach state" },
    
    // Kerala
    kochi: { name: "Kochi, Kerala", rate: 1750, description: "Queen of the Arabian Sea" },
    thiruvananthapuram: { name: "Thiruvananthapuram, Kerala", rate: 1700, description: "Capital city" },
    kozhikode: { name: "Kozhikode, Kerala", rate: 1650, description: "Spice city" },
  }

  const [selectedLocation, setSelectedLocation] = useState("mumbai")
  const [area, setArea] = useState<string>("")

  // Calculate cost during render
  const areaNum = parseFloat(area) || 0
  const currentLocation = locations[selectedLocation]
  const estimatedCost = currentLocation && areaNum > 0 ? areaNum * currentLocation.rate : 0

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div>
        <h3 className="text-2xl font-bold text-gray-900">
          Location Cost
        </h3>
      </div>

      <SelectField
        label="Select Location"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        options={Object.entries(locations).map(([key, location]) => ({
          value: key,
          label: `${location.name} - ₹${location.rate.toLocaleString("en-IN")}/sq ft`,
        }))}
      />

      <InputField
        label="Area (sq ft)"
        type="number"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        placeholder="Enter area"
      />

      <Card variant="default">
        {currentLocation ? (
          <>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-red-600" />
              <div>
                <p className="font-semibold text-gray-900">{currentLocation.name}</p>
                <p className="text-xs text-gray-600">₹{currentLocation.rate.toLocaleString("en-IN")}/sq ft</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">{currentLocation.description}</p>
          </>
        ) : (
          <p className="text-gray-600">Select a location to view details</p>
        )}
      </Card>

      {estimatedCost > 0 && currentLocation && (
        <>
          <Card variant="success">
            <ResultDisplay
              value={`₹${estimatedCost.toLocaleString("en-IN")}`}
              label="Estimated Total Cost"
              breakdown={[
                { label: "Location", value: currentLocation.name },
                { label: "Area", value: `${area} sq ft` },
                { label: "Rate", value: `₹${currentLocation.rate.toLocaleString("en-IN")}/sq ft` },
              ]}
            />
          </Card>

          {area && (
            <Card variant="default">
              <p className="text-sm font-semibold text-gray-900 mb-3">
                Cost Comparison ({area} sq ft)
              </p>
              <div className="space-y-2">
                {Object.entries(locations).map(([key, location]) => {
                  const cost = parseFloat(area) * location.rate
                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                        selectedLocation === key
                          ? "bg-red-50"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-medium text-gray-700">{location.name}</span>
                      <span
                        className={`font-semibold ${
                          selectedLocation === key
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        ₹{cost.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-gray-600 mt-3 italic">
                Note: Prices may vary based on specific project requirements.
              </p>
            </Card>
          )}
        </>
      )}

      <div className="flex gap-3">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button variant="primary" onClick={onBack} className="flex-1">
          Get Quote
        </Button>
      </div>
    </div>
  )
}
