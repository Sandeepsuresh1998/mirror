'use client';
import React from "react";
import { useState } from "react";
import styles from "../page.module.css";
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Navbar from "../components/NavBar";
import chatStyles from "../components/styles/ChatInterface.module.css"
import {Textarea, Button} from "@nextui-org/react";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import axios from 'axios';

export default withPageAuthRequired(
  function Reflect() {
    const { user, error, isLoading } = useUser();
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleQuerySubmit = async (event: any) => {
      console.log("Submitted this query:", query);
      try {
        const apiURL = process.env.NEXT_PUBLIC_API_URL + '/v1/queries/get';
        const params = {
          user_id: user?.sub,
          prompt: query
        };
        const apiResponse = await axios.get(apiURL, { params });

        console.log("Response from API:", apiResponse.data);
        setResponse(apiResponse.data.response);

      } catch (error) {
        console.error(error);
      }
    };
    
    return (
      <main className={`${styles.main} ${styles.theme}`}>
        <Navbar/>
        <div className={chatStyles.chat}>
          <div>
            {response && <p>{response}</p>}
          </div>
          <Textarea
            size="lg"
            onValueChange={setQuery}
            value={query}
            placeholder="Ask yourself a question..."
            maxRows={1}
            fullWidth={true}
          >
          </Textarea>
          <Button 
            isIconOnly
            onPress={handleQuerySubmit}
            style={{
              position: 'absolute', 
              right: '5px', // Adjust as needed
              top: '4px' // Adjust as needed
            }}  
          >
            <SendRoundedIcon/>
          </Button>
        </div>
      </main>
    )
  }
);
