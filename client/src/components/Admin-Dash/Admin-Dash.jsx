import React, { useState, useLayoutEffect } from "react";

function AdminDash() {
    const [applicants, setApplicants] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    // Function to find the dog by its ID
    const findDogById = (dogId) => {
        return dogs.find((dog) => dog._id === dogId);
    };

    useLayoutEffect(() => {
        // Fetch applications and dogs
        Promise.all([
            fetch("http://localhost:4000/form/applications"),
            fetch("http://localhost:4000/dog"),
        ])
            .then((responses) =>
                Promise.all(responses.map((response) => response.json()))
            )
            .then(([applicationsData, dogsData]) => {
                if (Array.isArray(applicationsData.applications)) {
                    setApplicants(applicationsData.applications);
                } else {
                    console.error(
                        "Invalid data format for applications: Expected an array but received:",
                        applicationsData
                    );
                }

                if (Array.isArray(dogsData)) {
                    setDogs(dogsData);
                } else {
                    console.error(
                        "Invalid data format for dogs: Expected an array but received:",
                        dogsData
                    );
                }

                // Set dataFetched to true
                setDataFetched(true);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useLayoutEffect(() => {
        // Match applicants to dogs once both data are available
        if (dataFetched && applicants.length > 0 && dogs.length > 0) {
            applicants.forEach((applicant) => {
                const dog = findDogById(applicant.petPreferences.dogId);
                if (dog) {
                    console.log(
                        `Applicant: ${applicant.personalInformation.fullName}, Dog Name: ${dog.name}`
                    );
                } else {
                    console.log(
                        `Applicant: ${applicant.personalInformation.fullName}, Dog not found.`
                    );
                }
            });
            console.log("Data fetching and matching completed!");
        }
    }, [dataFetched, applicants, dogs]);

    return (
        <div>
            <h2>List of Applicants:</h2>
            <ul>
                {applicants.map((applicant, index) => (
                    <li key={index}>
                        Applicant: {applicant.personalInformation.fullName} (ID:{" "}
                        {applicant.petPreferences.dogId})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDash;
