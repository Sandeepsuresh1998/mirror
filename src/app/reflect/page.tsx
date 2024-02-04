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
      //TODO: Call API
      console.log("Submitted this query:", query);
      try {
        const apiURL = 'https://mirror-ai.onrender.com/v1/queries/get';
        const params = {
          user_id: user?.sub,
          prompt: query
        };
        const response = await axios.get(apiURL, { params });

        console.log("Response from API:", response.data);

        // TODO: Catch errors with the API
      } catch (error) {
        console.error(error);
      }
    };
    
    return (
      <main className={`${styles.main} ${styles.theme}`}>
        <Navbar/>
        <div className={chatStyles.chat}>
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
          <div>
            {response && <p>{response}</p>}
          </div>
        </div>
      </main>
    )
  }
);
