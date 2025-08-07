'use client';
import { useState } from "react";
import { Box, VStack, Input, Heading, Button, Spinner } from '@chakra-ui/react'

export default function Home() {
  const [city, setCity] = useState("")
  const [advice, setAdvice] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const getAdvice = async () => {
    setLoading(true)
    const res = await fetch(`/api/weather-gemini?city=${city}`);
    const data = await res.json()
    console.log("data ", data)
    setAdvice(data.advice);
    setError(data.statusText)
    setLoading(false)
  }

  return (
    <Box p={6} minH="100vh">
        <VStack align="stretch" maxW="xl" mx="auto">
            <Heading size="lg">Weather Advice</Heading>
            <p style={{ fontStyle: 'italic'}}>Powered by Gemini</p>
            <Input value={city} onChange={e => setCity(e.target.value)} placeholder="Input city" />
            <Button onClick={getAdvice}>Get advice</Button>
            <Box h="400px" overflowY="scroll" p={4} display={"flex"} flexDirection={"column"}>
                { loading === true ? <Spinner /> :
                  (advice !== undefined ? <p>{advice}</p> : <p>{`Error: ${error}`}</p>)  
                }
            </Box>
        </VStack>
    </Box>
  );
}
