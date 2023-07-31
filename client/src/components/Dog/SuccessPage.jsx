import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // After a successful payment, update the dog's status immediately
    useEffect(() => {
        async function updateDogStatus() {
            try {
                const queryParams = new URLSearchParams(location.search);
                const dogId = queryParams.get('dogId');
                const isSponsorship = queryParams.get('isSponsorship') === 'true';

                if (!dogId) {
                    console.error('Error: No dogId found in the URL.');
                    navigate('/'); 
                    return;
                }

                await fetch('http://localhost:4000/payment/update-dog-status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ dogId: dogId }),
                });
                console.log(isSponsorship ? 'Sponsorship successful! Sponsorship status updated.' : 'Payment successful! Dog status updated.');
            } catch (error) {
                console.error('Error updating dog status:', error);
            }
        }

        updateDogStatus();
    }, [location.search, navigate]);

    // Redirect to the display page after updating the dog's status
    useEffect(() => {

        setTimeout(() => navigate(`/`), 5000);

    }, [location.search, navigate]);

    return (
        <div>
            <h1 style={{ marginBottom: "1em" }}>Order Placed Successfully!</h1>
            <p>Thank you for your payment. Your transaction was successful.</p>
            <p>You will be redirected to the main page shortly.</p>
        </div>
    );
}

export default SuccessPage;
