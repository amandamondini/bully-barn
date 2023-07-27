<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import {
    Chip,
    Menu,
    MenuItem,
    IconButton,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./dog.css";
import Form from "../Form/Form";
import DeleteDog from "./DeleteDog";
import EditDog from "./EditDog";

function Dog() {
    const [dogs, setDogs] = useState([]);
    const [selectedDog, setSelectedDog] = useState(null);
    const [filters, setFilters] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [filteredDogs, setFilteredDogs] = useState([]);
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Menu, MenuItem, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import './dog.css';


function Dog() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState([]);
  const [filters, setFilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredDogs, setFilteredDogs] = useState([])
  const navigate = useNavigate();
  const admin = localStorage.getItem('administrator')
>>>>>>> 1da8113f713b64bea86c967340e17caee972d7bd

    const filterMapping = {
        '{"goodwCat": true}': "Cat Friendly",
        '{"goodwDog": true}': "Dog Friendly",
        '{"gender": "Male"}': "Male",
        '{"gender": "Female"}': "Female",
        '{"goodwKid": true}': "Kid Friendly",
        '{"minAge": 0, "maxAge": 0.9999}': "<1 yr",
        '{"minAge": 3, "maxAge": 5}': "3-5 years old",
        '{"minAge": 1, "maxAge": 2}': "1-2 years old",
        '{"minAge": 6, "maxAge": 10}': "6-10 years old",
        '{"minAge": 11, "maxAge": 50}': "11+ years old",
        '{"minWeight": 1, "maxWeight": 10}': "1-10 lbs",
        '{"minWeight": 11, "maxWeight": 25}': "11-25 lbs",
        '{"minWeight": 26, "maxWeight": 50}': "25-50 lbs",
        '{"minWeight": 51, "maxWeight": 70}': "51-70 lbs",
        '{"minWeight": 71, "maxWeight": 400}': "70+ lbs",
    };

    useEffect(() => {
        const getDogs = async () => {
            const url = "http://127.0.0.1:4000/dog/";
            const response = await fetch(url, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            });

<<<<<<< HEAD
            const data = await response.json();
            console.log(data);
            setDogs(data);
        };

        getDogs();
    }, []);

    const displayDogDetails = (dog) => {
        setSelectedDog(dog);
    };

    const handleBackToAllDogs = () => {
        setSelectedDog(null);
    };

    const renderGenderIcon = (gender) => {
        return gender === "Female" ? <FemaleIcon /> : <MaleIcon />;
    };

    const renderDogDetails = () => {
        if (selectedDog) {
            return (
                <div id="one-dog-container">
                    <DeleteDog selectedDog={selectedDog} />
                    <EditDog selectedDog={selectedDog} />
                    <div id="button-container">
                        <button
                            onClick={handleBackToAllDogs}
                            id="back-to-all-dogs-btn"
                        >
                            Back
                        </button>
                    </div>
                    <div id="dog-details-container">
                        <div id="img-dog-container">
                            <img
                                src={selectedDog.image}
                                alt={selectedDog.name}
                            />
                        </div>
                        <div id="dog-details">
                            <h1>{selectedDog.name}</h1>
                            <section id="basic-info">
                                <p>Age {selectedDog.age}</p>
                                <div id="dog-gender">
                                    {renderGenderIcon(selectedDog.gender)}
                                    <p>{selectedDog.gender}</p>
                                </div>
                            </section>
                            <section id="additional-info">
                                <p>
                                    Bio: <span>{selectedDog.bio}</span>
                                </p>
                                <p>
                                    Energy Level:{" "}
                                    <span>{selectedDog.energyLevel}</span>
                                </p>
                                <div>
                                    <h4>Family-Friendly Traits</h4>
                                    <p>
                                        Other dogs:{" "}
                                        <span>
                                            {selectedDog.goodwDog ? "yes" : "-"}
                                        </span>
                                    </p>
                                    <p>
                                        Cats:{" "}
                                        <span>
                                            {selectedDog.goodwCat ? "yes" : "-"}
                                        </span>
                                    </p>
                                    <p>
                                        Children:{" "}
                                        <span>
                                            {selectedDog.goodwKid ? "yes" : "-"}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <h4>Training and Behavior</h4>
                                    <p>
                                        Crate Trained:{" "}
                                        <span>
                                            {selectedDog.crateTrained
                                                ? "yes"
                                                : "No"}
                                        </span>
                                    </p>
                                    <p>
                                        House Trained:{" "}
                                        <span>
                                            {selectedDog.houseTrained
                                                ? "yes"
                                                : "No"}
                                        </span>
                                    </p>
                                    <p>
                                        Reactivity to Objects:{" "}
                                        <span>
                                            {selectedDog.objAggression
                                                ? "yes"
                                                : "No"}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <h4>Special Needs</h4>
                                    <p>
                                        <span>{selectedDog.specialNeeds}</span>
                                    </p>
                                    <p>
                                        <span>
                                            {selectedDog.specialNeedsDesc}
                                        </span>
                                    </p>
                                    <h4>Medication:</h4>
                                    <p>
                                        <span>{selectedDog.medication}</span>
                                    </p>
                                </div>
                                <h4>
                                    Adoption Fee{" "}
                                    <span>{selectedDog.adoptionFee}</span>
                                </h4>
                                <Form />
                            </section>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    useEffect(() => {
        // Filtering + updating the dog data
        const filtered =
            dogs &&
            dogs.filter((dog) => {
                return filters.every((filter) => {
                    const filterObj = JSON.parse(filter); // Turns the string into an object
                    if (
                        filterObj.hasOwnProperty("minAge") &&
                        filterObj.hasOwnProperty("maxAge")
                    ) {
                        // Handle age range filters
                        return (
                            dog.age >= filterObj.minAge &&
                            dog.age <= filterObj.maxAge
                        );
                    } else if (filterObj.minWeight && filterObj.maxWeight) {
                        return (
                            dog.weight >= filterObj.minWeight &&
                            dog.weight <= filterObj.maxWeight
                        );
                    } else {
                        // Handle other filters
                        return Object.entries(filterObj).every(
                            ([key, value]) => dog[key] === value
                        );
                    }
                });
            });

        setFilteredDogs(filtered);
    }, [dogs, filters]);

    const bannerSwitch = (dog) => {
        if (dog.adoptionStatus === "pending") return "pending-card";
        if (dog.adoptionStatus === "adopted") return "adopted-card";
        if (dog.sponsorshipStatus) return "sponsored-card";
        return undefined;
    };

    const displayBanner = (dog) => {
        if (dog.adoptionStatus === "pending") return "PENDING";
        if (dog.adoptionStatus === "adopted") return "ADOPTED";
        if (dog.sponsorshipStatus) return "SPONSORED!";
    };

    const displayDogs = () => {
        return (
            dogs &&
            filteredDogs.map((dog) => (
                <div
                    id="dog-card"
                    className={bannerSwitch(dog)}
                    key={dog._id}
                    onClick={() => displayDogDetails(dog)}
                >
                    {bannerSwitch(dog) && (
                        <div id={`head-${bannerSwitch(dog)}`}>
                            {displayBanner(dog)}
                        </div>
                    )}
                    <div id="img-container">
                        <img src={dog.image} alt={dog.name} />
                    </div>
                    <div id="dog-details">
                        <h2>{dog.name}</h2>
                        <p>
                            <span>{dog.gender}</span>
                            Age: {dog.age}
                        </p>
                    </div>
                </div>
            ))
        );
    };

    const handleFilterChange = (event) => {
        const filterValue = event.target.value;

        if (event.target.checked) {
            // Add filter to the array if checkbox is checked
            setFilters((prevFilters) => [...prevFilters, filterValue]);
        } else {
            // Remove filter from the array if checkbox is unchecked
            setFilters((prevFilters) =>
                prevFilters.filter((filter) => filter !== filterValue)
            );
        }
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const displayChips = () => {
        return (
            <>
                {/* Filter Chips */}
                {filters.map((filter) => (
                    <Chip
                        key={filter}
                        label={filterMapping[filter]}
                        onDelete={() =>
                            handleFilterChange({
                                target: { checked: false, value: filter },
                            })
                        }
                    />
                ))}
            </>
        );
    };

    const displayFilters = () => {
        return (
            <div>
                {/* Filter Dropdown */}
                <IconButton onClick={handleMenuClick}>
                    <FilterListIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {/* Gender: ------------------------------------------------ */}
                    <MenuItem>
                        <div className="attr-label">Gender:</div>
                        {/* Female */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"gender": "Female"}'
                                    )}
                                />
                            }
                            label="Female"
                            value='{"gender": "Female"}'
                            onChange={handleFilterChange}
                        />
                        {/* Male */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"gender": "Male"}'
                                    )}
                                />
                            }
                            label="Male"
                            value='{"gender": "Male"}'
                            onChange={handleFilterChange}
                        />
                    </MenuItem>

                    {/* Age: ------------------------------------------------ */}
                    <MenuItem>
                        <div className="attr-label">Age:</div>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"minAge": 0, "maxAge": 0.9999}'
                                    )}
                                    onChange={handleFilterChange}
                                    value='{"minAge": 0, "maxAge": 0.9999}'
                                />
                            }
                            label="<1 yr"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"minAge": 1, "maxAge": 2}'
                                    )}
                                    onChange={handleFilterChange}
                                    value='{"minAge": 1, "maxAge": 2}'
                                />
                            }
                            label="1-2 yrs"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"minAge": 3, "maxAge": 5}'
                                    )}
                                    onChange={handleFilterChange}
                                    value='{"minAge": 3, "maxAge": 5}'
                                />
                            }
                            label="3-5 yrs"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"minAge": 6, "maxAge": 10}'
                                    )}
                                    onChange={handleFilterChange}
                                    value='{"minAge": 6, "maxAge": 10}'
                                />
                            }
                            label="6-10 yrs"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"minAge": 11, "maxAge": 50}'
                                    )}
                                    onChange={handleFilterChange}
                                    value='{"minAge": 11, "maxAge": 50}'
                                />
                            }
                            label="11+ yrs"
                        />
                    </MenuItem>

                    {/* Weight: ------------------------------------------------ */}
                    <MenuItem>
                        <div className="attr-label">Weight:</div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"minWeight": 1, "maxWeight": 10}'
                                    )}
                                    onChange={handleFilterChange}
                                    value='{"minWeight": 1, "maxWeight": 10}'
                                />
                            }
                            label="1-10 lbs"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"minWeight": 11, "maxWeight": 25}'
                                    )}
                                    onChange={handleFilterChange}
                                    value='{"minWeight": 11, "maxWeight": 25}'
                                />
                            }
                            label="11-25 lbs"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"minWeight": 26, "maxWeight": 50}'
                                    )}
                                    onChange={handleFilterChange}
                                    value='{"minWeight": 26, "maxWeight": 50}'
                                />
                            }
                            label="26-50 lbs"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"minWeight": 51, "maxWeight": 70}'
                                    )}
                                    onChange={handleFilterChange}
                                    value='{"minWeight": 51, "maxWeight": 70}'
                                />
                            }
                            label="51-70 lbs"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"minWeight": 71, "maxWeight": 400}'
                                    )}
                                    onChange={handleFilterChange}
                                    value='{"minWeight": 71, "maxWeight": 400}'
                                />
                            }
                            label="70+ lbs"
                        />
                    </MenuItem>

                    {/* Friendly With: ------------------------------------------------ */}
                    <MenuItem>
                        <div className="attr-label">Friendly With:</div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"goodwCat": true}'
                                    )}
                                />
                            }
                            label="Cats"
                            value='{"goodwCat": true}'
                            onChange={handleFilterChange}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"goodwDog": true}'
                                    )}
                                />
                            }
                            label="Dogs"
                            value='{"goodwDog": true}'
                            onChange={handleFilterChange}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.includes(
                                        '{"goodwKid": true}'
                                    )}
                                />
                            }
                            label="Kids"
                            value='{"goodwKid": true}'
                            onChange={handleFilterChange}
                        />
                    </MenuItem>
                </Menu>
            </div>
        );
    };
=======

  useEffect(() => { // Filtering + updating the dog data
    const filtered = dogs && dogs.filter((dog) => {
      return filters.every((filter) => {
        const filterObj = JSON.parse(filter) // Turns the string into an object
        if (filterObj.hasOwnProperty('minAge') && filterObj.hasOwnProperty('maxAge')) {
          // Handle age range filters
          return dog.age >= filterObj.minAge && dog.age <= filterObj.maxAge
        } else if (filterObj.minWeight && filterObj.maxWeight) {
          return dog.weight >= filterObj.minWeight && dog.weight <= filterObj.maxWeight
        } else {
          // Handle other filters
          return Object.entries(filterObj).every(([key, value]) => dog[key] === value)
        }
      })
      && !(!admin && dog.adoptionStatus === 'adopted');
    })

    setFilteredDogs(filtered)
  }, [dogs, filters])

  const bannerSwitch = (dog) => {
    if (dog.adoptionStatus === 'pending') return 'pending-card'
    if (dog.adoptionStatus === 'adopted') return 'adopted-card'
    if (dog.sponsorshipStatus) return 'sponsored-card'
    return undefined
  }

  const displayBanner = (dog) => {
    if (dog.adoptionStatus === "pending") return 'PENDING'
    if (dog.adoptionStatus === 'adopted') return 'ADOPTED'
    if (dog.sponsorshipStatus) return 'SPONSORED!'
  }


>>>>>>> 1da8113f713b64bea86c967340e17caee972d7bd

    return (
<<<<<<< HEAD
        <>
            <div id="contain-home">
                {!selectedDog && <h1 id="welcome-msg">Meet Our Dogs</h1>}
                {!selectedDog && (
                    <div className="filter-label">
                        {displayFilters()} Filter
                    </div>
                )}
                <div id="chip-box">{!selectedDog && displayChips()}</div>
                <div id="dog-container">
                    {selectedDog && renderDogDetails()}
                    {!selectedDog && displayDogs()}
                </div>
            </div>
        </>
    );
=======
      dogs && filteredDogs.map((dog) => (
        <div id='dog-card' className={bannerSwitch(dog)} key={dog._id} onClick={() => {getOneDog(dog)}}>
          {bannerSwitch(dog) && <div id={`head-${bannerSwitch(dog)}`}>{displayBanner(dog)}</div>}
          <div id='img-container'>
            <img src={dog.image} alt={dog.name} />
          </div>
          <div id='dog-details'>
            <h2>{dog.name}</h2>
            <p>
              <span>{dog.gender}</span>
              Age: {dog.age}
            </p>
          </div>
        </div>
      ))
    );
  };

  // handles moving to the DisplayOne page when a dog is selected 
  const getOneDog = (dog) => {
    setSelectedDog(dog)
    navigate('/display-one', {state: dog})
  }

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;

    if (event.target.checked) {
      // Add filter to the array if checkbox is checked
      setFilters((prevFilters) => [...prevFilters, filterValue]);
    } else {
      // Remove filter from the array if checkbox is unchecked
      setFilters((prevFilters) => prevFilters.filter((filter) => filter !== filterValue));
    }
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const displayChips = () => {
    return (
      <>
        {/* Filter Chips */}
        {filters.map((filter) => (
          <Chip
            key={filter}
            label={filterMapping[filter]}
            onDelete={() => handleFilterChange({ target: { checked: false, value: filter } })}
          />
        ))}
      </>
    );
  }

  const displayFilters = () => {
    return (
      <div>
        {/* Filter Dropdown */}
        <IconButton onClick={handleMenuClick}>
          <FilterListIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >

          {/* Gender: ------------------------------------------------ */}
          <MenuItem>
            <div className='attr-label'>Gender:</div>
            {/* Female */}
            <FormControlLabel
              control={<Checkbox checked={filters.includes('{"gender": "Female"}')} />}
              label="Female"
              value='{"gender": "Female"}'
              onChange={handleFilterChange}
            />
            {/* Male */}
            <FormControlLabel
              control={<Checkbox checked={filters.includes('{"gender": "Male"}')} />}
              label="Male"
              value='{"gender": "Male"}'
              onChange={handleFilterChange}
            />
          </MenuItem>

          {/* Age: ------------------------------------------------ */}
          <MenuItem>
            <div className='attr-label'>Age:</div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"minAge": 0, "maxAge": 0.9999}')}
                  onChange={handleFilterChange}
                  value='{"minAge": 0, "maxAge": 0.9999}'
                />
              }
              label="<1 yr"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"minAge": 1, "maxAge": 2}')}
                  onChange={handleFilterChange}
                  value='{"minAge": 1, "maxAge": 2}'
                />
              }
              label="1-2 yrs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"minAge": 3, "maxAge": 5}')}
                  onChange={handleFilterChange}
                  value='{"minAge": 3, "maxAge": 5}'
                />
              }
              label="3-5 yrs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"minAge": 6, "maxAge": 10}')}
                  onChange={handleFilterChange}
                  value='{"minAge": 6, "maxAge": 10}'
                />
              }
              label="6-10 yrs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"minAge": 11, "maxAge": 50}')}
                  onChange={handleFilterChange}
                  value='{"minAge": 11, "maxAge": 50}'
                />
              }
              label="11+ yrs"
            />
          </MenuItem>

          {/* Weight: ------------------------------------------------ */}
          <MenuItem>
            <div className='attr-label'>Weight:</div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"minWeight": 1, "maxWeight": 10}')}
                  onChange={handleFilterChange}
                  value='{"minWeight": 1, "maxWeight": 10}'
                />
              }
              label="1-10 lbs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"minWeight": 11, "maxWeight": 25}')}
                  onChange={handleFilterChange}
                  value='{"minWeight": 11, "maxWeight": 25}'
                />
              }
              label="11-25 lbs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"minWeight": 26, "maxWeight": 50}')}
                  onChange={handleFilterChange}
                  value='{"minWeight": 26, "maxWeight": 50}'
                />
              }
              label="26-50 lbs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"minWeight": 51, "maxWeight": 70}')}
                  onChange={handleFilterChange}
                  value='{"minWeight": 51, "maxWeight": 70}'
                />
              }
              label="51-70 lbs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"minWeight": 71, "maxWeight": 400}')}
                  onChange={handleFilterChange}
                  value='{"minWeight": 71, "maxWeight": 400}'
                />
              }
              label="70+ lbs"
            />
          </MenuItem>

          {/* Friendly With: ------------------------------------------------ */}
          <MenuItem>
            <div className='attr-label'>Friendly With:</div>
            <FormControlLabel
              control={<Checkbox checked={filters.includes('{"goodwCat": true}')} />}
              label="Cats"
              value='{"goodwCat": true}'
              onChange={handleFilterChange}
            />

            <FormControlLabel
              control={<Checkbox checked={filters.includes('{"goodwDog": true}')} />}
              label="Dogs"
              value='{"goodwDog": true}'
              onChange={handleFilterChange}
            />

            <FormControlLabel
              control={<Checkbox checked={filters.includes('{"goodwKid": true}')} />}
              label="Kids"
              value='{"goodwKid": true}'
              onChange={handleFilterChange}
            />
          </MenuItem>
        </Menu>
      </div>
    )
  }

  

  return (
    <>
      <div id='contain-home'>
        { <h1 id='welcome-msg'>Meet Our Dogs</h1>}
        { <div className='filter-label'>{displayFilters()} Filter</div>}
        <div id='chip-box'>
          { displayChips()}
        </div>
        <div id='dog-container'>
          {displayDogs()}
        </div>
      </div>

    </>
  );
>>>>>>> 1da8113f713b64bea86c967340e17caee972d7bd
}

export default Dog;
