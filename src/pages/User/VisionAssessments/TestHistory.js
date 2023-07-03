import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VisionAssessmentResultsPage = () => {
    const baseURL = 'http://localhost:3000'

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVisionAssessmentResult = async () => {
      try {
        const accessToken = await localStorage.getItem('accessToken');
        const response = await axios.get(`${baseURL}/users/view_vision_assessment_result`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setResults(response.data.visionAssessments);
        setIsLoading(false);
      } catch (error) {
        console.error('Error while retrieving test results', error);
        setIsLoading(false);
      }
    };

    getVisionAssessmentResult();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {results.length > 0 ? (
            <div>
              <h2>Vision Assessment Results</h2>
              <ul>
                {results.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No vision assessment test results are present.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VisionAssessmentResultsPage;
